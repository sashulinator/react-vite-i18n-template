import { TargetPoint } from '../types/target'

export function isSamePoint(prev: TargetPoint | null, next: TargetPoint | null): boolean {
  if (prev === next) return true
  if (!prev || !next) return false

  if ('pageX' in next && 'pageY' in next) {
    return prev.pageX === next.pageX && prev.pageY === next.pageY
  }

  if ('clientX' in next && 'clientY' in next) {
    return prev.clientX === next.clientX && prev.clientY === next.clientY
  }

  return false
}
