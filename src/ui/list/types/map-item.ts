import { RefObject } from 'react'

import { Key } from './key'
import { ListState } from './state-ref'

export interface MapItem<T> {
  index: number
  item: T
  elementRef: RefObject<HTMLLIElement>
  stateRef: RefObject<ListState<T>>
  itemKey: Key
  map: Map<Key | HTMLLIElement, MapItem<T>>
}
