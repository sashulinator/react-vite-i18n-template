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
    const mapItem = mapItemList[index]
    if (mapItem === undefined) {
      throw Error('undefined')
    }
    // TODO!
    if (!isSelectable) {
      return mapItem
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

  let index = mapItem[0] - 1
  const mapItemList = Array.from(map.values())

  while (index >= 0) {
    const mapItem = mapItemList[index]
    if (mapItem === undefined) {
      throw Error('undefined')
    }
    if (!isSelectable) {
      return mapItem
    }
    index--
  }

  return null
}
