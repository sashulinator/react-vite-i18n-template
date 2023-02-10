import { ReplaceValuesByGetter } from '../types/replace-values-by-getter'
import { generateSchema } from './generate-schema'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from '@/shared/i18n'
import { AnyDictionary } from '@/utils/dictionary'

export function useT<T extends AnyDictionary>(dictionary: T, ns: string): ReplaceValuesByGetter<T> {
  useTranslation([ns], { i18n })
  return useMemo(() => generateSchema(dictionary, ns), [i18n.language])
}
