import { Dictionary } from './types/dictionary'

export function remove<D extends Dictionary<unknown>, K extends keyof D>(dictionary: D, key: K): Omit<D, K> {
  const { [key]: removed, ...newObject } = dictionary
  return newObject
}
