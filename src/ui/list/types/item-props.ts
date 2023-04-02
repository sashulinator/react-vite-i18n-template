import { Emitter } from 'mitt'
import { RefObject } from 'react'

import { Events } from './events'
import { Key } from './key'
import { ListProps } from './list-props'
import { MapItem } from './map-item'

export interface ItemProps<T, P = unknown> extends ListProps<T, P> {
  item: T
  itemKey: Key
  elementRef: RefObject<HTMLLIElement>
  map: Map<Key, MapItem<T>>
  mitt: Emitter<Events>
  checked: Key[]
  selected: Key[]
}
