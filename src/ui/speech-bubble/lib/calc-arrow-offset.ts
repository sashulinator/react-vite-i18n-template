import { Offset, Point } from 'dom-align-ts'

export function calcArrowOffset(placement: Point): Offset {
  const isLeft = placement.charAt(1) === 'l'
  const isRight = placement.charAt(1) === 'r'
  const isTop = placement.charAt(0) === 't'
  const isBottom = placement.charAt(0) === 'b'

  if (placement.charAt(0) === 'c') {
    const offsetX = isLeft ? '-50%' : isRight ? '50%' : 0
    return [offsetX, 0]
  }

  const offsetX = isLeft ? '50%' : isRight ? '-50%' : 0
  const offsetY = isTop ? '-50%' : isBottom ? '50%' : 0
  return [offsetX, offsetY]
}
