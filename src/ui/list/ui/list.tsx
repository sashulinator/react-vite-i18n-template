import c from 'clsx'
import { Emitter } from 'mitt'
import React, { ForwardedRef, RefObject, useMemo, useRef } from 'react'

import { useControlledState } from '~/utils/hooks/controlled-state'
import { useLatest } from '~/utils/hooks/latest'

import { createMitt } from '../lib/create-mitt'
import { Events } from '../types/events'
import { Key } from '../types/key'

export interface ListState<T> {
  map: Map<Key, [number, T, RefObject<HTMLOListElement | HTMLUListElement>]>
  mitt: Emitter<Events>
}

export interface ItemProps<T, P> extends ListProps<T, P> {
  item: T
  itemKey: Key
  itemRef: RefObject<HTMLOListElement | HTMLUListElement>
  map: Map<Key, [number, T, RefObject<HTMLOListElement | HTMLUListElement>]>
  mitt: Emitter<Events>
  checked: Key[]
  selected: Key[]
}

export interface ListProps<T, P> {
  rootProps?: React.HTMLAttributes<HTMLUListElement>
  data: T[]
  payload?: P | undefined
  checked?: Key[]
  selected?: Key[]
  stateRef?: ForwardedRef<ListState<T>>
  isSelectable?: (item: T) => boolean
  onCheck?: ((checked: Key[]) => void) | undefined
  onCheckOne?: ((checked: Key) => void) | undefined
  onUncheckOne?: ((checked: Key) => void) | undefined
  onSelect?: ((selected: Key[]) => void) | undefined
  onSelectOne?: ((selected: Key) => void) | undefined
  onUnselectOne?: ((selected: Key) => void) | undefined
  onFocus?: ((item: T, i: number, element: HTMLOListElement | HTMLUListElement | undefined | null) => void) | undefined
  onBlur?: (() => void) | undefined
  getItemKey: (item: T, data: T[], payload: P | undefined) => Key
  renderItem: (props: ItemProps<T, P>) => JSX.Element | null
}

export default function List<T, P>(props: ListProps<T, P>): JSX.Element {
  const {
    onCheck: onCheckProp,
    onSelect: onSelectProp,
    onFocus,
    onBlur,
    onSelectOne,
    onCheckOne,
    onUncheckOne,
    onUnselectOne,
    checked: checkedProp,
    selected: selectedProp,
    ...restProps
  } = props

  const [checked, onCheck] = useControlledState<Key[]>([], checkedProp, onCheckProp)
  const [selected, onSelect] = useControlledState<Key[]>([], selectedProp, onSelectProp)
  const checkedKeyRef = useLatest(checked)
  const selectedKeyRef = useLatest(selected)

  const map = useMemo(() => new Map<Key, [number, T, RefObject<HTMLOListElement | HTMLUListElement>]>(), [props.data])
  const mitt = useMemo(
    () =>
      createMitt({
        ...restProps,
        checkedKeyRef,
        selectedKeyRef,
        map,
        onUnselectOne,
        onCheck,
        onUncheckOne,
        onSelectOne,
        onFocus,
        onCheckOne,
        onBlur,
        onSelect,
      }),
    [props.data]
  )

  React.useImperativeHandle(props.stateRef, () => ({ map, mitt }), [props.data])

  return (
    <ul {...props.rootProps} className={c('ui-List', props.rootProps?.className)}>
      {props.data.map((item, i) => {
        const key = props.getItemKey(item, props.data, props.payload)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const itemRef = useRef<HTMLOListElement | HTMLUListElement>(null)
        map.set(key, [i, item, itemRef])

        return React.createElement(props.renderItem, {
          ...restProps,
          onCheck,
          onSelect,
          mitt,
          itemRef,
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
