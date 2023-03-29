import { Point, Points, flipPointsHorizontally, flipPointsVertically } from 'dom-align-ts'

export function toPoints(placement: Point): Points {
  // example: we want sourceElement to be left from targetElement
  // we receive "cl", it means we need to connect points ["cr", "cl"]
  if (placement.charAt(0) === 'c') {
    return [flipPointsHorizontally(placement), placement]
  }

  return [flipPointsVertically(placement), placement]
}
