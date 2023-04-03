import { isNull } from '../is/is-null'

export function assertNotNull<T>(input: T | null): asserts input is T {
  if (isNull(input)) {
    throw new Error('Cannot be null')
  }
}
