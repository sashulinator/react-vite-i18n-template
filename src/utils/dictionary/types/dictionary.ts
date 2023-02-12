import { Key } from '../../core/types/key'

export interface Dictionary<T> {
  [key: Key]: T
}
