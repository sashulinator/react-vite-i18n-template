import c from 'clsx'
import { Emitter } from 'mitt'
import React, { ForwardedRef, useMemo } from 'react'

import { useControlledState } from '~/utils/hooks/controlled-state'
import { useLatest } from '~/utils/hooks/latest'

import { createMitt } from '../lib/create-mitt'
import { Events } from '../types/events'
import { Key } from '../types/key'

export interface ItemProps<T, P> extends ListProps<T, P> {
  item: T
  itemKey: Key
  map: Map<Key, T>
  mitt: Emitter<Events>
  checked: Key[]
  selected: Key | null
}

export interface ListProps<T, P> {
  rootProps?: React.HTMLAttributes<HTMLUListElement>
  data: T[]
  payload?: P | undefined
  checked?: Key[]
  selected?: Key | null
  stateRef?: ForwardedRef<{
    map: Map<Key, [number, T]>
    mitt: Emitter<Events>
  }>
  onChecked?: (checked: Key[]) => void
  onSelect?: (selected: Key | null) => void
  getKey: (item: T, data: T[], payload: P | undefined) => Key
  renderItem: (props: ItemProps<T, P>) => JSX.Element | null
}

export default function List<T, P>(props: ListProps<T, P>): JSX.Element {
  const {
    onChecked: onCheckedProp,
    onSelect: onSelectProp,
    checked: checkedProp,
    selected: selectedProp,
    ...restProps
  } = props

  const [checked, onChecked] = useControlledState<Key[]>([], checkedProp, onCheckedProp)
  const [selected, onSelect] = useControlledState<Key | null>(null, selectedProp, onSelectProp)
  const checkedRef = useLatest(checked)
  const selectedRef = useLatest(selected)
  const payloadRef = useLatest(props.payload)

  const map = useMemo(() => new Map(), [props.data])
  const mitt = useMemo(
    () => createMitt({ ...restProps, checkedRef, selectedRef, map, payloadRef, onChecked, onSelect }),
    [props.data]
  )

  React.useImperativeHandle(props.stateRef, () => ({ map, mitt }), [props.data])

  return (
    <ul {...props.rootProps} className={c('ui-List', props.rootProps?.className)}>
      {props.data.map((item, i) => {
        const key = props.getKey(item, props.data, props.payload)
        map.set(key, [i, item])

        return React.createElement(props.renderItem, {
          ...restProps,
          onChecked,
          onSelect,
          mitt,
          selected,
          checked,
          item,
          key,
          map,
          itemKey: key,
        })
      })}
    </ul>
  )
}
