import { Any } from '../core'
import { Key } from '../core/types/key'
import { Dictionary } from './types/dictionary'

export function getPath(dictionary: Dictionary<Any>, path: Key[]): Any {
  const result = path.reduce((prevObj, key) => prevObj && prevObj[key], dictionary)
  return result
}
