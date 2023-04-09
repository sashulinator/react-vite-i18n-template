import { Any } from '../types/any'
import { Has } from '../types/has'
import { Key } from '../types/key'

export function has<K extends Key>(object: Any, key: K): object is Has<K> {
  return object?.hasOwnProperty(key)
}
