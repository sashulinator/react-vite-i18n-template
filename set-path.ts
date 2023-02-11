import { Dictionary } from './types/dictionary'
import { Key } from './types/key'

export function setPath(dictionary: Dictionary<unknown>, path: Key[], value: unknown): Dictionary<unknown> {
  let current = dictionary
  let keys = [...path]

  while (keys.length > 1) {
    const [head, ...tail] = keys as [string]
    keys = tail

    if (current[head] === undefined) {
      current[head] = {}
    }

    current = current[head] as Dictionary<unknown>
  }

  if (value) {
    const valuePath = keys[0] as string
    current[valuePath] = value
  }

  return dictionary
}
