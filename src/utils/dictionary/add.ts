import { Dictionary } from './types/dictionary'
import { Key } from './types/key'

// TODO полностью переработать типы
export function add<T>(key: Key, value: T, object: Dictionary<T>): Dictionary<T> {
  return { ...object, [key]: value }
}

export { add as replace }
