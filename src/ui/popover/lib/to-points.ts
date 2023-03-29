import { Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'

export function toPoints(placement: Point): Points {
  // example: we want sourceElement to be left from targetElement
  // we receive "cl", it means we need to connect points ["cr", "cl"]
  if (placement.charAt(0) === 'c') {
    return [flipPointHorizontally(placement), placement]
  }

  return [flipPointVertically(placement), placement]
}
