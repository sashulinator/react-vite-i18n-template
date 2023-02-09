import { BaseError } from '../error/base'
import { Dictionary } from './types/dictionary'
import { Key } from './types/key'

export function get<T>(key?: Key, dictionary?: Dictionary<T>): T {
  if (key === undefined || dictionary === undefined || !(key in dictionary)) {
    throw new BaseError(`Cannot get a Dictionary item`, { key, dictionary })
  }

  return dictionary[key]
}
