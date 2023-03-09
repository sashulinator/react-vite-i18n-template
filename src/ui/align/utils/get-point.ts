import { Target, TargetPoint } from '../types/target'

export function getPoint(point: Target): TargetPoint | null {
  if (typeof point !== 'object' || !point) return null
  return point
}
