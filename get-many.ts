import { get } from './get'
import { Dictionary } from './types/dictionary'
import { Key } from './types/key'

export function getMany<T>(keys: Key[], object: Dictionary<T>): Dictionary<T> {
  return keys.reduce<Dictionary<T>>((acc, key) => {
    acc[key] = get(key, object)
    return acc
  }, {})
}
