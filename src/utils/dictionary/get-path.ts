import { Any, Key } from '../core'

export function getPath<D, P extends Key[]>(dictionary: D, path: P): Any {
  const result = path.reduce((prevObj, key) => prevObj && prevObj[key], dictionary)
  return result as Any
}
