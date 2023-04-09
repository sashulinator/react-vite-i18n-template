import { Key } from '../../core/key'

export interface Dictionary<T> {
  [key: Key]: T
}
