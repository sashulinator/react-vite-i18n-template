import { RefObject } from 'react'

import { Key } from '../types/key'

export function getNext<T>(
  itemKey: Key,
  map: Map<Key, [number, T, RefObject<HTMLOListElement | HTMLUListElement>]>,
  isSelectable?: (item: T) => boolean
): [Key, number, T, RefObject<HTMLOListElement | HTMLUListElement>] | null {
  const mapItem = map.get(itemKey)

  if (mapItem === undefined) {
    return null
  }

  let index = mapItem[0] + 1
  const itemList = Array.from(map.entries())

  while (index < map.size) {
    const entry = itemList[index]
    if (entry === undefined) {
      throw Error('undefined')
    }
    const [key, value] = entry
    if (!isSelectable) {
      return [key, ...value]
    }
    index++
  }

  return null
}

export function getPrevious<T>(
  itemKey: Key,
  map: Map<Key, [number, T, RefObject<HTMLOListElement | HTMLUListElement>]>,
  isSelectable?: (item: T) => boolean
): [Key, number, T, RefObject<HTMLOListElement | HTMLUListElement>] | null {
  const mapItem = map.get(itemKey)

  if (mapItem === undefined) {
    return null
  }

  let index = mapItem[0] - 1
  const itemList = Array.from(map.entries())

  while (index >= 0) {
    const entry = itemList[index]
    if (entry === undefined) {
      throw Error('undefined')
    }
    const [key, value] = entry
    if (!isSelectable) {
      return [key, ...value]
    }
    index--
  }

  return null
}
