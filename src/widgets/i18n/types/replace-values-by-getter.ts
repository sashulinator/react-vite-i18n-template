import { AnyDictionary } from '@/utils/dictionary'

export type ReplaceValuesByGetter<T extends AnyDictionary> = {
  [K in keyof T]: T[K] extends AnyDictionary ? ReplaceValuesByGetter<T[K]> : (p?: AnyDictionary) => string
}
