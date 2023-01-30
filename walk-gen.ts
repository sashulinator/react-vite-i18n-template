import { Dictionary } from './types/dictionary'

export interface WalkResult<T> {
  key: string
  value: T
  path: string[]
  parent?: undefined | Dictionary<T>
  dictionary: Dictionary<T>
}

export function* walk<T>(dictionary: Dictionary<T>): Generator<WalkResult<T>> {
  function* _walk(dictionary: Dictionary<T>) {
    const keys = Object.keys(dictionary)
    for (const key of keys) {
      const value = dictionary[key] as T
      yield { key, value, parent: undefined, dictionary, keys, path: [key] }
    }
  }

  yield* _walk(dictionary)
}
