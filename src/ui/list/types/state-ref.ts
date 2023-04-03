import { Emitter } from 'mitt'
import { RefObject } from 'react'

import { Events } from './events'
import { Key } from './key'
import { MapItem } from './map-item'

export interface ListState<T> {
  map: Map<Key | HTMLLIElement, MapItem<T>>
  mitt: Emitter<Events>
  checkedKeyRef: RefObject<Key[]>
  selectedKeyRef: RefObject<Key[]>
  focus: (key: Key) => void
  unfocus: () => void
  selectOne: (key: Key) => void
  setChecked: (checked: Key[]) => void
  setSelected: (selected: Key[]) => void
  checkOne: (key: Key) => void
  unselectOne: (key: Key) => void
  uncheckOne: (key: Key) => void
}
