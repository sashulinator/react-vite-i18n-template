import { setPathValue } from './set-path-value'
import { AnyDictionary } from './types/any'

export function unflatten<TInput extends AnyDictionary, TOutput extends AnyDictionary>(obj: TInput): TOutput {
  return Object.entries(obj).reduce<AnyDictionary>((acc, [key, value]) => {
    const paths = key.split('.')
    return setPathValue(acc, paths, value)
  }, {}) as TOutput
}
