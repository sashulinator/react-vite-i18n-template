import { Key } from '../types/key'

export function isObject(input: unknown): input is Record<Key, unknown> {
  return typeof input === 'object' && !Array.isArray(input) && input !== null
}
