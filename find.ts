import { Dictionary } from "./types/dictionary"
import { Key } from "./types/key"

// TODO типы можно построже сделать
export function find<T>(key: Key | undefined, object: undefined | Dictionary<T>): T | undefined {
  if (key !== undefined) {
    return object?.[key]
  }
  return undefined
}
