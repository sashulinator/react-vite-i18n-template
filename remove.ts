import { Any } from '../core'
import { Dictionary } from './types/dictionary'

export function remove<D extends Dictionary<Any>, K extends keyof D>(key: K, object: D): Omit<D, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: removed, ...newObject } = object
  return newObject
}
