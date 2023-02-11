import { ReplaceValuesByGetter } from '../types/replace-values-by-getter'
import { assertNoExcessiveTranslation } from './assertions/no-excessive-translations'
import { generateSchema } from './generate-schema'
import { translateError } from './translate-error'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { addToast } from '@/packages/toast'
import { i18n } from '@/shared/i18n'
import { AnyDictionary } from '@/utils/dictionary'
import { tryCatch } from '@/utils/error/try-catch'

export function useT<T extends AnyDictionary>(dictionary: T, ns: string): ReplaceValuesByGetter<T> {
  useTranslation([ns], { i18n })
  const currentTranslations = i18n.store.data[i18n.language]?.[ns] as AnyDictionary

  useEffect(() => {
    tryCatch(
      () => assertNoExcessiveTranslation(dictionary, currentTranslations),
      (e) => addToast({ type: 'warning', data: translateError(e) })
    )
  }, [currentTranslations])

  return useMemo(() => generateSchema(dictionary, ns), [i18n.language])
}
