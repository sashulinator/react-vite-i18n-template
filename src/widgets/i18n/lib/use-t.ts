import { ReplaceValuesByGetter } from '../types/replace-values-by-getter'
import { assertBackendMatchFrontend } from './assertions/backend-match-frontend'
import { generateSchema } from './generate-schema'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { addToast } from '@/packages/toast'
import { i18n } from '@/shared/i18n'
import { AnyDictionary } from '@/utils/dictionary'
import { assertError } from '@/utils/error'

export function useT<T extends AnyDictionary>(dictionary: T, ns: string): ReplaceValuesByGetter<T> {
  useTranslation([ns], { i18n })
  const currentTranslations = i18n.store.data[i18n.language]?.[ns] as AnyDictionary

  useEffect(() => {
    try {
      assertBackendMatchFrontend(dictionary, currentTranslations)
    } catch (e) {
      assertError(e)
      addToast({ type: 'warning', data: (e as any).message })
    }
  }, [currentTranslations])

  return useMemo(() => generateSchema(dictionary, ns), [i18n.language])
}
