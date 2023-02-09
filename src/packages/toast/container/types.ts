import { Toast } from '../toast/types'
import { Emitter } from 'mitt'

import { Id } from '@/utils/any/id'
import { Dictionary } from '@/utils/dictionary'

export interface Container {
  id: Id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitter: Emitter<Dictionary<any>>
  toastIds: Id[]
  max: number
  defaultToast: Omit<Toast<undefined>, 'id' | 'emitter'>
}
