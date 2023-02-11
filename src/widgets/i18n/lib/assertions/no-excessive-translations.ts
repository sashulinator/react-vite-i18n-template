import { AnyDictionary, isDictionary, walk } from '@/utils/dictionary'
import { getPathValue } from '@/utils/dictionary/get-path-value'
import { BaseError } from '@/utils/error'

export function assertNoExcessiveTranslation(
  dictionary: AnyDictionary,
  currentTranslations: undefined | AnyDictionary
) {
  if (currentTranslations === undefined) {
    return
  }

  walk(currentTranslations, (_, value, path) => {
    if (!isDictionary(value)) {
      const value = getPathValue(dictionary, path)
      if (value === undefined) {
        throw new BaseError('Received excessive Translation from backend, it does not exist on your front', {
          code: 'assertClientHasNoExcessiveTranslation',
          path,
        })
      }
    }
  })
  walk(dictionary, (_, value, path) => {
    if (!isDictionary(value)) {
      const value = getPathValue(currentTranslations, path)
      if (value === undefined) {
        throw new BaseError('You have excessive Translation on your front, it does not exist on backend', {
          code: 'assertServerHasNoExcessiveTranslation',
          path,
        })
      }
    }
  })
  //
}
