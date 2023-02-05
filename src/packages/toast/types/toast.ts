import { Id } from '@/utils/any/id'

export interface Toast<D = unknown> {
  id: Id
  toasterId: Id
  data: D
  enteringAnimationMs: number
  exitingAnimationMs: number
  autocloseMs: number
  exitTransitionMs: number
  isTransitionCounterStopped: boolean
  type: string
}
