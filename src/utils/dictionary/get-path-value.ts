import { Any } from '../any'
import { AnyDictionary } from './types/any'
import { Key } from './types/key'

export function getPathValue(dictionary: AnyDictionary, path: Key[]): Any {
  const result = path.reduce((prevObj, key) => prevObj && prevObj[key], dictionary)
  return result
}
