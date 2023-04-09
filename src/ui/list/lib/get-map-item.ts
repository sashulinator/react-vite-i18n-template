import { assertNotUndefined } from '~/utils/core'
import { assertNotNil } from '~/utils/core/assertions/not-nil'

import { ItemState } from '../types/item-state'
import { Key } from '../types/key'
import { ListState } from '../types/list-state'

/**
 * Получить mapItem
 * @param stateRef
 * @returns
 */
export function getMapItem<T>(
  stateRef: ListState<T> | undefined | null,
  key: Key | HTMLLIElement | undefined
): ItemState<T> {
  assertNotUndefined(key)
  assertNotNil(stateRef)
  const mapItem = stateRef.map.get(key)
  assertNotUndefined(mapItem)
  return mapItem
}
