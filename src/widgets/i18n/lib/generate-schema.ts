import { ReplaceValuesByGetter } from '../types/replace-values-by-getter'

import { i18n } from '@/shared/i18n'
import { AnyDictionary, isDictionary, setPathValue, walk } from '@/utils/dictionary'

/**
 * Transforms data "{ a: { b: '', c: '' }, d: '' }" to
 * "{ a: 'ns:a', { b: 'ns:a.b', c: 'ns:a.c' } d: 'ns:d' } }"
 */

export function generateSchema<T extends AnyDictionary>(structure: T, ns: string): ReplaceValuesByGetter<T> {
  let schema = {}
  walk(structure, (_, value, path) => {
    if (!isDictionary(value)) {
      const key = `${ns}:${path.join('.')}`
      schema = setPathValue(schema, path, (params) => i18n.t(key, params))
    }
  })
  return schema as unknown as T
}
