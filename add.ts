import { Key } from '../core/types/key'
import { Dictionary } from './types/dictionary'

// TODO полностью переработать типы
export function add<T>(key: Key, value: T, object: Dictionary<T>): Dictionary<T> {
  return { ...object, [key]: value }
}

export { add as replace }
