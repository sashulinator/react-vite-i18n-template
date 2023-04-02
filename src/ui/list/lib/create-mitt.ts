import mitt, { Emitter } from 'mitt'
import { RefObject } from 'react'

import { isHTMLElement } from '~/utils/dom/is/is-htmlelement'
import { isDev } from '~/utils/is/dev'
import { remove } from '~/utils/key'

import { EventNames } from '../types/event-names'
import { Events } from '../types/events'
import { Key } from '../types/key'
import { MapItem } from '../types/map-item'

export interface CreateMittProps<T> {
  data: T[]
  checkedKeyRef: RefObject<Key[]>
  selectedKeyRef: RefObject<Key[]>
  map: Map<Key, MapItem<T>>
  onCheckRef: RefObject<((checked: Key[]) => void) | undefined>
  onCheckOneRef: RefObject<((checked: Key) => void) | undefined>
  onUncheckOneRef: RefObject<((checked: Key) => void) | undefined>
  onSelectRef: RefObject<((selected: Key[]) => void) | undefined>
  onSelectOneRef: RefObject<((selected: Key) => void) | undefined>
  onUnselectOneRef: RefObject<((selected: Key) => void) | undefined>
  onFocusRef: RefObject<((item: T, i: number, element: HTMLLIElement | undefined | null) => void) | undefined>
  onBlurRef: RefObject<(() => void) | undefined>
}

export function createMitt<T>(props: CreateMittProps<T>): Emitter<Events> {
  const m = mitt<Events>()

  m.on(EventNames.setChecked, (checked) => {
    props.onCheckRef.current?.(checked)
  })
  m.on(EventNames.checkOne, (key) => {
    if (props.checkedKeyRef.current === null) return
    m.emit(EventNames.setChecked, [...props.checkedKeyRef.current, key])
    props.onCheckOneRef.current?.(key)
  })
  m.on(EventNames.uncheckOne, (key) => {
    if (props.checkedKeyRef.current === null) return
    m.emit(EventNames.setChecked, remove(key, props.checkedKeyRef.current))
    props.onUncheckOneRef.current?.(key)
  })

  m.on(EventNames.setSelected, (selected) => {
    props.onSelectRef.current?.(selected)
  })
  m.on(EventNames.selectOne, (key) => {
    if (props.selectedKeyRef.current === null) return
    m.emit(EventNames.setSelected, [...props.selectedKeyRef.current, key])
    props.onSelectOneRef.current?.(key)
  })
  m.on(EventNames.unselectOne, (key) => {
    if (props.selectedKeyRef.current === null) return
    m.emit(EventNames.setSelected, remove(key, props.selectedKeyRef.current))
    props.onUnselectOneRef.current?.(key)
  })

  m.on(EventNames.focus, (key) => {
    if (!key) return
    const item = props.map.get(key)
    if (!item && isDev()) {
      throw new Error('MapItem not found')
    }
    if (!item) return
    item.elementRef.current?.focus()
    props.onFocusRef.current?.(item.item, item.index, item.elementRef.current)
  })

  m.on(EventNames.unfocus, () => {
    if (isHTMLElement(document.activeElement)) {
      document.activeElement.blur()
    }
    props.onBlurRef.current?.()
  })

  // m.on(EventNames.selectNext, () => {
  //   if (props.selectedKeyRef.current === null) return
  //   const mapItem = props.map.get(props.selectedKeyRef.current)
  //   if (mapItem === undefined) return
  //   const item = props.data[mapItem[0] + 1]
  //   if (item === undefined) return
  //   props.onSelect(props.getKey(item, props.data, props.payloadRef.current))
  // })

  // m.on(EventNames.selectPrevious, () => {
  //   if (props.selectedKeyRef.current === null) return
  //   const mapItem = props.map.get(props.selectedKeyRef.current)
  //   if (mapItem === undefined) return
  //   const item = props.data[mapItem[0] - 1]
  //   if (item === undefined) return
  //   props.onSelect(props.getKey(item, props.data, props.payloadRef.current))
  // })

  // m.on(EventNames.selectFirst, () => {
  //   const key = props.getKey(props.data[0], props.data, props.payloadRef.current)
  //   m.emit(EventNames.select, key)
  // })

  // m.on(EventNames.selectLast, () => {
  //   const last = props.data.at(-1)
  //   if (last === undefined) return
  //   const key = props.getKey(last, props.data, props.payloadRef.current)
  //   m.emit(EventNames.select, key)
  // })

  return m
}
