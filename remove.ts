import { AnyDictionary } from './types/any'

export function remove<D extends AnyDictionary, K extends keyof D>(key: K, object: D): Omit<D, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: removed, ...newObject } = object
  return newObject
}
