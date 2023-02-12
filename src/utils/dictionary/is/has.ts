import { Dictionary } from '../types/dictionary'
import { Has } from '../types/has'
import { Key } from '../types/key'

import { Any } from '~/utils/core'

export function has<K extends Key>(dictionary: unknown, key: K): dictionary is Has<K> {
  return (dictionary as Dictionary<Any>)?.hasOwnProperty(key)
}
