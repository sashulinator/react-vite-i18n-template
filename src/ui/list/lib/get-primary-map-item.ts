import { MapItem } from '../types/map-item'
import { ListState } from '../types/state-ref'
import { getMapItem } from './get-map-item'

/**
 * Получить первый mapItem в массиве checked | selected | data
 *
 * Проблематика:
 * 1. Сфокусироваться на каком-то айтеме при фокусе на листе
 * 2. Подскрол к какому-то айтему
 * @param stateRef
 * @returns
 */
export function getPrimaryMapItem<T>(stateRef: ListState<T> | undefined | null): MapItem<T> {
  const key =
    stateRef?.checkedKeyRef.current?.[0] ||
    stateRef?.selectedKeyRef.current?.[0] ||
    stateRef?.getItemKey(stateRef.data[0], stateRef.data)

  return getMapItem(stateRef, key)
}
