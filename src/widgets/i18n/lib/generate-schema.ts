import { ReplaceValuesByGetter } from '../types/replace-values-by-getter'

import { i18n } from '@/shared/i18n'
import { Any } from '@/utils/core'
import { Dictionary, isDictionary, setPath, walk } from '@/utils/dictionary'

/**
 * Transforms data "{ a: { b: '', c: '' }, d: '' }" to
 * "{ a: 'ns:a', { b: 'ns:a.b', c: 'ns:a.c' } d: 'ns:d' } }"
 */

export function generateSchema<T extends Dictionary<Any>>(structure: T, ns: string): ReplaceValuesByGetter<T> {
  let schema = {}
  walk(structure, ({ value, path }) => {
    if (!isDictionary(value)) {
      const key = `${ns}:${path.join('.')}`
      schema = setPath(schema, path, (params) => i18n.t(key, params))
    }
  })
  return schema as unknown as T
}
