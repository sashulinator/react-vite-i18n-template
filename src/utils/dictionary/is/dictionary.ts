import { Dictionary } from "../types/dictionary";

export function isDictionary(input: unknown): input is Dictionary<unknown> {
  return typeof input === 'object' && !Array.isArray(input) && input !== null
}
