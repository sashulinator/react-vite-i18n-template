import { Emitter } from 'mitt'

import { Id } from '@/utils/any/id'
import { Dictionary } from '@/utils/dictionary'

export interface Toast<D = unknown> {
  id: Id
  containerId: Id
  data: D
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitter: Emitter<Dictionary<any>>
  enteringAnimationMs: number
  exitingAnimationMs: number
  isEntering: boolean
  isShowing: boolean
  isExiting: boolean
  autocloseMs: number
  showingMs: number
  isTransitionStopped: boolean
  type: string
}
