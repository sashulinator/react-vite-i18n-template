import { Emitter } from 'mitt'
import { ForwardedRef, RefObject } from 'react'

import { Events } from './events'
import { Key } from './key'
import { MapItem } from './map-item'
import { ListState } from './state-ref'

export interface ItemProps<T> {
  data: T[]
  stateRef: ForwardedRef<ListState<T>>
  item: T
  itemKey: Key
  elementRef: RefObject<HTMLLIElement>
  map: Map<Key, MapItem<T>>
  mitt: Emitter<Events>
  checked: Key[]
  selected: Key[]
  getItemKey: (item: T, data: T[]) => Key
}
