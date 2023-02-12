import { Any, Key, List, Path } from '../core'

export function getPath<D, P extends List<Key>>(dictionary: D, path: P): Path<D, P> {
  const result = path.reduce((prevObj, key) => prevObj && prevObj[key], dictionary)
  return result as Any
}
