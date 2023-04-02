import c from 'clsx'
import { Emitter } from 'mitt'
import React, { ForwardedRef, RefObject, useMemo, useRef } from 'react'

import { useControlledState } from '~/utils/hooks/controlled-state'
import { useLatest } from '~/utils/hooks/latest'

import { createMitt } from '../lib/create-mitt'
import { Events } from '../types/events'
import { Key } from '../types/key'
import { MapItem } from '../types/map-item'

export interface ListState<T> {
  map: Map<Key, MapItem<T>>
  mitt: Emitter<Events>
  checkedKeyRef: RefObject<Key[]>
  selectedKeyRef: RefObject<Key[]>
}

export interface ItemProps<T, P> extends ListProps<T, P> {
  item: T
  itemKey: Key
  elementRef: RefObject<HTMLLIElement>
  map: Map<Key, MapItem<T>>
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
  onFocus?: ((item: T, i: number, element: HTMLLIElement | undefined | null) => void) | undefined
  onBlur?: (() => void) | undefined
  getItemKey: (item: T, data: T[], payload: P | undefined) => Key
  renderItem: (props: ItemProps<T, P>) => JSX.Element | null
}

export default function List<T, P>(props: ListProps<T, P>): JSX.Element {
  const {
    onCheck: onCheckProp,
    onSelect: onSelectProp,
    checked: checkedProp,
    selected: selectedProp,
    onFocus,
    onBlur,
    onSelectOne,
    onCheckOne,
    onUncheckOne,
    onUnselectOne,
    ...restProps
  } = props

  const isDataChanged = useMemo(() => ({}), [...props.data])
  const [checked, onCheck] = useControlledState<Key[]>([], checkedProp, onCheckProp)
  const [selected, onSelect] = useControlledState<Key[]>([], selectedProp, onSelectProp)
  const checkedKeyRef = useLatest(checked)
  const selectedKeyRef = useLatest(selected)

  const onCheckRef = useLatest(onCheck)
  const onCheckOneRef = useLatest(onCheckOne)
  const onUncheckOneRef = useLatest(onUncheckOne)
  const onSelectRef = useLatest(onSelect)
  const onSelectOneRef = useLatest(onSelectOne)
  const onUnselectOneRef = useLatest(onUnselectOne)
  const onFocusRef = useLatest(onFocus)
  const onBlurRef = useLatest(onBlur)

  const map = useMemo(() => new Map<Key, MapItem<T>>(), [isDataChanged])
  const mitt = useMemo(
    () =>
      createMitt({
        ...restProps,
        checkedKeyRef,
        selectedKeyRef,
        map,
        onCheckRef,
        onCheckOneRef,
        onUncheckOneRef,
        onSelectRef,
        onSelectOneRef,
        onUnselectOneRef,
        onFocusRef,
        onBlurRef,
      }),
    [isDataChanged]
  )

  React.useImperativeHandle(props.stateRef, () => ({ map, mitt, checkedKeyRef, selectedKeyRef }), [isDataChanged])

  return (
    <ul {...props.rootProps} className={c('ui-List', props.rootProps?.className)}>
      {props.data.map((item, index) => {
        const itemKey = props.getItemKey(item, props.data, props.payload)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const elementRef = useRef<HTMLLIElement>(null)
        map.set(itemKey, { itemKey, index, item, elementRef })

        return React.createElement(props.renderItem, {
          ...restProps,
          mitt,
          elementRef,
          selected,
          checked,
          item,
          key: itemKey,
          map,
          itemKey,
        })
      })}
    </ul>
  )
}
