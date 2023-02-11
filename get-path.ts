import { Any } from '../core'
import { Dictionary } from './types/dictionary'
import { Key } from './types/key'

export function getPath(dictionary: Dictionary<Any>, path: Key[]): Any {
  const result = path.reduce((prevObj, key) => prevObj && prevObj[key], dictionary)
  return result
}
