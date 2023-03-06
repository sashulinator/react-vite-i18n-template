import './positioning-portal.css'

import cl from 'clsx'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { useWindowSize } from '~/utils/hooks/window-size'
import { setRefs } from '~/utils/react/set-refs'

import getScrollableParents from '../lib/get-scrollable-parents'
import { bottom } from '../lib/position-strategies'
import { PositionStrategy } from '../types/position-strategy'

export interface PositioningProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  relativeElement: HTMLElement | null
  containerElement?: HTMLElement
  updatePositionDeps?: unknown[]
  positionStrategy?: PositionStrategy
}

const PositioningPortalComponent: React.ForwardRefRenderFunction<HTMLDivElement, PositioningProps> = (props, ref) => {
  const {
    relativeElement,
    containerElement = document.body,
    positionStrategy = bottom,
    updatePositionDeps = [],
    ...rootProps
  } = props
  const rootRef = React.useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()
  const scrollableParents = React.useMemo(() => getScrollableParents(relativeElement), [relativeElement])

  const updatePosition = React.useCallback(_updatePosition, [
    positionStrategy,
    scrollableParents,
    relativeElement,
    containerElement,
    ...updatePositionDeps,
  ])
  React.useLayoutEffect(listenScrollableParents, [updatePosition])
  React.useLayoutEffect(updatePosition, [updatePosition, windowSize.width, windowSize.height])

  return createPortal(
    <div ref={setRefs(rootRef, ref)} {...rootProps} className={cl('ui-PositioningPortal', props.className)} />,
    containerElement
  )

  // Private

  function _updatePosition() {
    if (!rootRef.current || !relativeElement) return
    positionStrategy({
      relativeElement: relativeElement,
      relativeRect: relativeElement.getBoundingClientRect(),
      rootElement: rootRef.current,
      rootRect: rootRef.current.getBoundingClientRect(),
      containerElement,
      containerRect: containerElement.getBoundingClientRect(),
      scrollableParents,
    })
  }

  function listenScrollableParents() {
    scrollableParents.forEach((el) => el.addEventListener('scroll', updatePosition, false))
    return () => {
      scrollableParents.forEach((el) => el.removeEventListener('scroll', updatePosition, false))
    }
  }
}

const PositioningPortal = React.forwardRef(PositioningPortalComponent)
export default PositioningPortal
