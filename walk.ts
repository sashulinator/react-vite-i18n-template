

import { isDictionary } from './is/dictionary'
import { Dictionary } from './types/dictionary'
import { Key } from './types/key'

type Callback = (key: Key, value: unknown, path: string[], i: number, data: Dictionary<unknown>) => boolean | void

// TODO сделать постороже типы и убрать i из Callback
export function walk<T>(iterDictionary: Dictionary<T>, cb: Callback, path: string[] = [], dictionary?: Dictionary<T>) {
  const valueList = Object.entries(iterDictionary)

  for (let i = 0; i < valueList.length; i++) {
    const [key, value] = valueList[i] as [string, unknown]
    const newPath = [...path, key]

    if (cb(key, value, newPath, i, dictionary || iterDictionary)) {
      break
    }

    if (isDictionary(value)) {
      walk(value, cb, newPath, dictionary)
    }
  }
}
