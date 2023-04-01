import mitt, { Emitter } from 'mitt'
import { RefObject } from 'react'

import { Any } from '~/utils/core'

import { EventNames } from '../types/event-names'
import { Events } from '../types/events'
import { Key } from '../types/key'

export interface CreateMittProps<T, P> {
  data: T[]
  checkedRef: RefObject<Key[]>
  selectedRef: RefObject<Key | null>
  payloadRef: RefObject<P | undefined>
  map: Map<Key, [number, T]>
  onChecked: (checked: Key[]) => void
  onSelect: (selected: Key | null) => void
  getKey: (item: T, data: T[], payload: Any) => Key
}

export function createMitt<T, P>(props: CreateMittProps<T, P>): Emitter<Events> {
  const m = mitt<Events>()

  m.on(EventNames.select, (key) => {
    props.onSelect(key)
  })

  m.on(EventNames.unselect, () => {
    props.onSelect(null)
  })

  m.on(EventNames.selectNext, () => {
    console.log('1')

    if (props.selectedRef.current === null) return
    console.log('2', props.selectedRef)
    const mapItem = props.map.get(props.selectedRef.current)
    if (mapItem === undefined) return
    console.log('3', mapItem)
    const item = props.data[mapItem[0] + 1]
    if (item === undefined) return
    console.log('4')
    props.onSelect(props.getKey(item, props.data, props.payloadRef.current))
  })

  m.on(EventNames.selectPrevious, () => {
    if (props.selectedRef.current === null) return
    const mapItem = props.map.get(props.selectedRef.current)
    if (mapItem === undefined) return
    const item = props.data[mapItem[0] - 1]
    if (item === undefined) return
    props.onSelect(props.getKey(item, props.data, props.payloadRef.current))
  })

  m.on(EventNames.selectFirst, () => {
    const key = props.getKey(props.data[0], props.data, props.payloadRef.current)
    m.emit(EventNames.select, key)
  })

  m.on(EventNames.selectLast, () => {
    const last = props.data.at(-1)
    if (last === undefined) return
    const key = props.getKey(last, props.data, props.payloadRef.current)
    m.emit(EventNames.select, key)
  })

  m.on(EventNames.check, (checked) => {
    props.onChecked(checked)
  })

  m.on(EventNames.removeChecked, (key) => {
    if (props.checkedRef.current === null) return
    const index = props.checkedRef.current?.findIndex((arrKey) => arrKey === key)
    const checkedClone = [...props.checkedRef.current]
    checkedClone.splice(index, 1)
    m.emit(EventNames.check, checkedClone)
  })

  m.on(EventNames.addChecked, (key) => {
    if (props.checkedRef.current === null) return
    m.emit(EventNames.check, [...props.checkedRef.current, key])
  })

  return m
}
