import './positioning-portal.css'

import cl from 'clsx'
import * as React from 'react'
import { createPortal } from 'react-dom'

import useElementSize from '~/utils/hooks/element-size'
import { useWindowSize } from '~/utils/hooks/window-size'
import { setRefs } from '~/utils/react/set-refs'

import getScrollableParents from '../lib/get-scrollable-parents'
import { bottom } from '../lib/position'
import { Position } from '../types/position'

export interface PositioningProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  relativeElement: HTMLElement | null
  containerElement?: HTMLElement
  positionStrategy?: Position
}

const PositioningPortalComponent: React.ForwardRefRenderFunction<HTMLDivElement, PositioningProps> = (props, ref) => {
  const { relativeElement, containerElement = document.body, positionStrategy = bottom, ...rootProps } = props
  const rootRef = React.useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()
  const relativeSize = useElementSize(relativeElement)
  const containerSize = useElementSize(containerElement)
  const leftScrollMap = React.useMemo<Map<Node | Window, number>>(() => new Map(), [])
  const topScrollMap = React.useMemo<Map<Node | Window, number>>(() => new Map(), [])
  const scrollableParents = React.useMemo(() => getScrollableParents(relativeElement), [relativeElement])

  React.useEffect(listenScrollableParents)
  React.useLayoutEffect(initRootPosition, [])
  React.useLayoutEffect(updateRootPosition, [
    relativeElement,
    rootRef.current,
    containerElement,
    windowSize.width,
    windowSize.height,
    relativeSize.height,
    relativeSize.width,
    containerSize.width,
    containerSize.height,
  ])

  return createPortal(
    <div ref={setRefs(rootRef, ref)} {...rootProps} className={cl('ui-PositioningPortal', props.className)} />,
    containerElement
  )

  // Private

  function updateScrollMaps(elementOrWindow: Element | Window) {
    const isWindow = elementOrWindow instanceof Window
    const scrollLeft = isWindow ? elementOrWindow.scrollX : elementOrWindow.scrollLeft
    const scrollRight = isWindow ? elementOrWindow.scrollY : elementOrWindow.scrollTop
    leftScrollMap.set(elementOrWindow, scrollLeft || 0)
    topScrollMap.set(elementOrWindow, scrollRight || 0)
  }

  function calcScrollsOffset(scrolls: Map<Node | Window, number>): number {
    return Array.from(scrolls.values()).reduce((acc, num) => (acc += num), 0)
  }

  function updateRootPosition() {
    if (!rootRef.current || !relativeElement) return
    positionStrategy({
      relativeElement: relativeElement,
      relativeRect: relativeElement.getBoundingClientRect(),
      rootElement: rootRef.current,
      rootRect: rootRef.current.getBoundingClientRect(),
      containerElement,
      containerRect: containerElement.getBoundingClientRect(),
      scrollLeft: calcScrollsOffset(leftScrollMap),
      scrollTop: calcScrollsOffset(topScrollMap),
    })
  }

  function initRootPosition() {
    scrollableParents.forEach(updateScrollMaps)
    updateRootPosition()
  }

  function createScrollHandler(elementOrWindow: Element | Window) {
    return () => {
      updateScrollMaps(elementOrWindow)
      updateRootPosition()
    }
  }

  function listenScrollableParents() {
    const scrollHandlers = scrollableParents.map(createScrollHandler)
    scrollHandlers.forEach((scrollHandler, i) => scrollableParents[i]?.addEventListener('scroll', scrollHandler, false))
    return () => {
      scrollHandlers.forEach((scrollHandler, i) =>
        scrollableParents[i]?.removeEventListener('scroll', scrollHandler, false)
      )
    }
  }
}

const PositioningPortal = React.forwardRef(PositioningPortalComponent)
export default PositioningPortal
