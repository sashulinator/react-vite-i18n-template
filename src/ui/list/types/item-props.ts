import { Emitter } from 'mitt'
import { ForwardedRef } from 'react'

import { Events } from './events'
import { Key } from './key'
import { MapItem } from './map-item'
import { ListState } from './state-ref'

export interface ItemProps<T, TItemProps> {
  itemProps: TItemProps | undefined
  data: T[]
  stateRef: ForwardedRef<ListState<T>>
  item: T
  itemKey: Key
  setElementRef: (instance: HTMLLIElement) => void
  map: Map<Key | HTMLLIElement, MapItem<T>>
  mapItem: MapItem<T>
  mitt: Emitter<Events>
  checked: Key[]
  selected: Key[]
  getItemKey: (item: T, data: T[]) => Key
}
