import { Dictionary } from './types/dictionary'

export interface WalkResult<T> {
  value: T
  key: string
  keyIndex: number
  dictionary: Dictionary<T>
  path: string[]
  parent?: Dictionary<T> | undefined
}

export function* walk<T>(
  dictionary: Dictionary<T>,
  key?: string,
  parent?: Dictionary<T> | undefined,
  path?: string[],
  keys?: string[],
  keyIndex?: number
): Generator<WalkResult<T>> {
  parent = parent ?? dictionary
  keys = keys ?? Object.keys(parent)
  keyIndex = keyIndex ?? 0
  key = key || (keys[keyIndex] as string)
  path = path ? path : [key]
  const value = dictionary[key] as T

  yield { key, value, parent, path, keyIndex, dictionary }

  const nextKeyIndex = keyIndex + 1
  const nextKey = keys[nextKeyIndex] as string
  const nextParent = parent ?? dictionary
  const nextPath = [nextKey]

  const result = walk(dictionary, nextKey, nextParent, nextPath, keys, nextKeyIndex)

  if (nextKeyIndex === keys.length) {
    return result
  }

  yield* result
}
