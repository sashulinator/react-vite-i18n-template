import './positioning-portal.css'

import cl from 'clsx'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { useWindowSize } from '~/utils/hooks/window-size'
import { setRefs } from '~/utils/react/set-refs'

import getScrollableParents from '../lib/get-scrollable-parents'
import { bottom } from '../lib/position-strategies'
import { PositionStrategy } from '../types/position-strategy'

export interface PositioningPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  targetRef: React.RefObject<HTMLElement>
  containerElement?: HTMLElement
  updatePositionDeps?: unknown[]
  positionStrategy?: PositionStrategy
}

const PositioningPortalComponent: React.ForwardRefRenderFunction<HTMLDivElement, PositioningPortalProps> = (
  props,
  ref
) => {
  const {
    targetRef,
    containerElement = document.body,
    positionStrategy = bottom,
    updatePositionDeps = [],
    ...rootProps
  } = props
  const rootRef = React.useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()
  const scrollableParents = React.useMemo(() => getScrollableParents(targetRef.current), [targetRef])
  const style = { ...props.style, display: rootRef.current ? props.style?.display : 'none' }

  const updatePosition = React.useCallback(_updatePosition, [
    positionStrategy,
    scrollableParents,
    targetRef.current,
    containerElement,
    ...updatePositionDeps,
  ])
  React.useLayoutEffect(listenScrollableParents, [updatePosition, targetRef])
  React.useLayoutEffect(updatePosition, [updatePosition, windowSize.width, windowSize.height])

  return createPortal(
    <div
      {...rootProps}
      ref={setRefs(rootRef, ref)}
      style={style}
      className={cl('ui-PositioningPortal', props.className)}
    />,
    containerElement
  )

  // Private

  function _updatePosition() {
    if (!rootRef.current || !targetRef.current) return
    rootRef.current.style.display = props.style?.display ?? 'block'
    positionStrategy({
      targetElement: targetRef.current,
      targetRect: targetRef.current.getBoundingClientRect(),
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
