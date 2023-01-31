import { Toast } from './toast'
import { Emitter } from 'mitt'

import { Id } from '@/utils/any/id'
import { Dictionary } from '@/utils/dictionary'

export interface Toaster {
  id: Id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitter: Emitter<Dictionary<any>>
  data: Dictionary<Toast>
  entering: Id[]
  showing: Id[]
  exiting: Id[]
  archived: Id[]
}
