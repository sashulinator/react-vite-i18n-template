import { PositionProps } from '../types/position'

/**
 * Calc top left corner of relativeElement
 */
export function calcStartingPosition(props: PositionProps) {
  const relativeLeftInContainer = props.relativeRect.left - props.containerRect.left
  const relativeTopInContainer = props.relativeRect.top - props.containerRect.top
  return {
    top: props.containerRect.top + relativeTopInContainer,
    left: props.containerRect.left + relativeLeftInContainer,
  }
}

export function bottom(props: PositionProps) {
  const { top, left } = calcStartingPosition(props)
  props.rootElement.style.top = `${top + props.relativeRect.height}px`
  props.rootElement.style.left = `${left}px`
}

export function top(props: PositionProps) {
  const { top, left } = calcStartingPosition(props)
  props.rootElement.style.top = `${top - props.rootRect.height}px`
  props.rootElement.style.left = `${left}px`
}

export function left(props: PositionProps) {
  const { top, left } = calcStartingPosition(props)
  props.rootElement.style.top = `${top + props.relativeRect.height / 2 - props.rootRect.height / 2}px`
  props.rootElement.style.left = `${left - props.rootRect.width}px`
}

export function right(props: PositionProps) {
  const { top, left } = calcStartingPosition(props)
  props.rootElement.style.top = `${top + props.relativeRect.height / 2 - props.rootRect.height / 2}px`
  props.rootElement.style.left = `${left + props.relativeRect.width}px`
}

export function bottomPrefered(props: PositionProps) {
  const startingPosition = calcStartingPosition(props)
  const isVisible = startingPosition.top + props.relativeRect.height + props.rootRect.height < window.innerHeight
  if (isVisible) {
    bottom(props)
  } else {
    top(props)
  }
}

export function topPrefered(props: PositionProps) {
  const startingPosition = calcStartingPosition(props)
  console.log(startingPosition.top - props.rootRect.height)

  const isVisible = startingPosition.top - props.rootRect.height > 0
  if (isVisible) {
    top(props)
  } else {
    bottom(props)
  }
}
