import { Key } from '../core'

/**
 * Why? Because TS force you to write `dictionary?.[key || '']` if they both undefined
 */
export function find<D extends Partial<Record<K, unknown>>, K extends Key>(
  dictionary: undefined | D,
  key: K | undefined
): D[K] | undefined {
  if (key === undefined) return undefined
  return dictionary?.[key]
}
