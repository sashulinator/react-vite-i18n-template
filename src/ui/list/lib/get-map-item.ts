import { assertNotUndefined } from '~/utils/core'
import { assertNotNil } from '~/utils/core/assertions/assert-not-nil'

import { Key } from '../types/key'
import { MapItem } from '../types/map-item'
import { ListState } from '../types/state-ref'

/**
 * Получить mapItem
 * @param stateRef
 * @returns
 */
export function getMapItem<T>(
  stateRef: ListState<T> | undefined | null,
  key: Key | HTMLLIElement | undefined
): MapItem<T> {
  assertNotUndefined(key)
  assertNotNil(stateRef)
  const mapItem = stateRef.map.get(key)
  assertNotUndefined(mapItem)
  return mapItem
}
