import { Key } from '../types/key'
import { MapItem } from '../types/map-item'

export function getNext<T>(
  itemKey: Key,
  map: Map<Key, MapItem<T>>,
  isSelectable?: (item: T) => boolean
): MapItem<T> | null {
  const mapItem = map.get(itemKey)

  if (mapItem === undefined) {
    return null
  }

  let index = mapItem.index + 1
  const mapItemList = Array.from(map.values())

  while (index < map.size) {
    const nextMapItem = mapItemList[index]

    if (nextMapItem === undefined) {
      throw Error('undefined')
    }

    if (!isSelectable || isSelectable(nextMapItem.item)) {
      return nextMapItem
    }
    index++
  }

  return null
}

export function getPrevious<T>(
  itemKey: Key,
  map: Map<Key, MapItem<T>>,
  isSelectable?: (item: T) => boolean
): MapItem<T> | null {
  const mapItem = map.get(itemKey)

  if (mapItem === undefined) {
    return null
  }

  let index = mapItem.index - 1
  const mapItemList = Array.from(map.values())

  while (index >= 0) {
    const previousMapItem = mapItemList[index]

    if (previousMapItem === undefined) {
      throw Error('undefined')
    }
    if (!isSelectable || isSelectable(previousMapItem.item)) {
      return previousMapItem
    }
    index--
  }

  return null
}
