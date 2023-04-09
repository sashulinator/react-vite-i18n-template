import { Any } from '~/utils/core'

import { Key } from '../../core/key'
import { Dictionary } from '../types/dictionary'
import { Has } from '../types/has'

export function has<K extends Key>(dictionary: unknown, key: K): dictionary is Has<K> {
  return (dictionary as Dictionary<Any>)?.hasOwnProperty(key)
}
