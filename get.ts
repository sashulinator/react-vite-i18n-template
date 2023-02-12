import { Key } from '../core'
import { BaseError } from '../error'
import { has } from './is/has'
import { Dictionary } from './types/dictionary'

export function get<D extends Dictionary<K>, K extends Key>(dictionary?: D, key?: K): Required<D>[K] {
  if (key === undefined || dictionary === undefined || !has(dictionary, key)) {
    throw new BaseError(`Cannot get a Dictionary item`, { key, dictionary })
  }

  return dictionary[key]
}
