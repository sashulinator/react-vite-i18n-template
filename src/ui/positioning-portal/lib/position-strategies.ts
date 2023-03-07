import { PositionStrategyProps } from '../types/position-strategy'

/**
 * Calc top left corner of relativeElement
 */
export function calcStartingPosition(props: PositionStrategyProps) {
  const relativeLeftInContainer = props.targetRect.left - props.containerRect.left
  const relativeTopInContainer = props.targetRect.top - props.containerRect.top
  return {
    top: props.containerRect.top + relativeTopInContainer,
    left: props.containerRect.left + relativeLeftInContainer,
  }
}

export function bottom(props: PositionStrategyProps) {
  const startingPosition = calcStartingPosition(props)
  props.rootElement.style.top = `${startingPosition.top + props.targetRect.height}px`
  const relativeRootDiff = props.targetRect.width - props.rootRect.width
  props.rootElement.style.left = `${startingPosition.left + relativeRootDiff / 2}px`
}

export function top(props: PositionStrategyProps) {
  const startingPosition = calcStartingPosition(props)
  props.rootElement.style.top = `${startingPosition.top - props.rootRect.height}px`
  const relativeRootDiff = props.targetRect.width - props.rootRect.width
  props.rootElement.style.left = `${startingPosition.left + relativeRootDiff / 2}px`
}

export function left(props: PositionStrategyProps) {
  const startingPosition = calcStartingPosition(props)
  props.rootElement.style.top = `${startingPosition.top + props.targetRect.height / 2 - props.rootRect.height / 2}px`
  props.rootElement.style.left = `${startingPosition.left - props.rootRect.width}px`
}

export function right(props: PositionStrategyProps) {
  const startingPosition = calcStartingPosition(props)
  props.rootElement.style.top = `${startingPosition.top + props.targetRect.height / 2 - props.rootRect.height / 2}px`
  props.rootElement.style.left = `${startingPosition.left + props.targetRect.width}px`
}

export function bottomPrefered(props: PositionStrategyProps) {
  const startingPosition = calcStartingPosition(props)
  const isVisible = startingPosition.top + props.targetRect.height + props.rootRect.height < window.innerHeight
  if (isVisible) {
    bottom(props)
  } else {
    top(props)
  }
}

export function topPrefered(props: PositionStrategyProps) {
  const startingPosition = calcStartingPosition(props)
  const isVisible = startingPosition.top - props.rootRect.height > 0
  if (isVisible) {
    top(props)
  } else {
    bottom(props)
  }
}
