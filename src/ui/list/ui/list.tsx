import c from 'clsx'
import React, { useMemo, useRef } from 'react'

import { useControlledState } from '~/utils/hooks/controlled-state'
import { useLatest } from '~/utils/hooks/latest'
import { setRefs } from '~/utils/react'

import { createMitt } from '../lib/create-mitt'
import { EventNames } from '../types/event-names'
import { ItemState } from '../types/item-state'
import { Key } from '../types/key'
import { ListProps } from '../types/list-props'
import { ListState } from '../types/list-state'

export default function List<T, TItemProps>(props: ListProps<T, TItemProps>): JSX.Element {
  const {
    checked: checkedProp,
    selected: selectedProp,
    onCheck: onCheckProp,
    onSelect: onSelectProp,
    onFocus,
    onBlur,
    onSelectOne,
    onCheckOne,
    onUncheckOne,
    onUnselectOne,
  } = props

  const [checked, onCheck] = useControlledState<Key[]>([], checkedProp, onCheckProp)
  const [selected, onSelect] = useControlledState<Key[]>([], selectedProp, onSelectProp)
  const checkedRef = useLatest(checked)
  const selectedRef = useLatest(selected)
  const elementRef = useRef<HTMLUListElement>(null)

  const onCheckRef = useLatest(onCheck)
  const onCheckOneRef = useLatest(onCheckOne)
  const onUncheckOneRef = useLatest(onUncheckOne)
  const onSelectRef = useLatest(onSelect)
  const onSelectOneRef = useLatest(onSelectOne)
  const onUnselectOneRef = useLatest(onUnselectOne)
  const onFocusRef = useLatest(onFocus)
  const onBlurRef = useLatest(onBlur)

  const map = useMemo(() => new Map<Key | HTMLLIElement, ItemState<T>>(), [props.data])
  const mitt = useMemo(
    () =>
      createMitt({
        data: props.data,
        checkedRef,
        selectedRef,
        map,
        onCheckRef,
        onCheckOneRef,
        onUncheckOneRef,
        onSelectRef,
        getItemKey: props.getItemKey,
        onSelectOneRef,
        onUnselectOneRef,
        onFocusRef,
        onBlurRef,
      }),
    [props.data]
  )

  function setSelected(selected: Key[]) {
    mitt.emit(EventNames.setSelected, selected)
  }
  function checkOne(key: Key) {
    mitt.emit(EventNames.checkOne, key)
  }
  function focus(key?: Key) {
    mitt.emit(EventNames.focus, key)
  }
  function selectOne(key: Key) {
    mitt.emit(EventNames.selectOne, key)
  }
  function setChecked(checked: Key[]) {
    mitt.emit(EventNames.setChecked, checked)
  }
  function uncheckOne(key: Key) {
    mitt.emit(EventNames.uncheckOne, key)
  }
  function unfocus() {
    mitt.emit(EventNames.unfocus)
  }
  function unselectOne(key: Key) {
    mitt.emit(EventNames.unselectOne, key)
  }

  const listState: ListState<T> = {
    data: props.data,
    map,
    mitt,
    checkedRef,
    selectedRef,
    elementRef,
    getItemKey: props.getItemKey,
    setSelected,
    checkOne,
    focus,
    selectOne,
    setChecked,
    uncheckOne,
    unfocus,
    unselectOne,
  }

  React.useImperativeHandle(setRefs(props.listStateRef), () => listState, [props.data])

  return (
    <ul
      {...props.rootProps}
      className={c('ui-List', props.rootProps?.className)}
      ref={setRefs(props.rootProps?.ref, elementRef)}
    >
      {props.data.map((item, index) => {
        const itemKey = props.getItemKey(item, props.data)
        const isSelected = selected.includes(itemKey)
        const isChecked = checked.includes(itemKey)
        const elementRef: { current: null | HTMLLIElement } = { current: null }
        const itemState: ItemState<T> = { itemKey, index, item, elementRef, map }
        map.set(itemKey, itemState)

        function setElementRef(instance: HTMLLIElement) {
          elementRef.current = instance
          map.set(instance, itemState)
        }

        return React.createElement(props.renderItem, {
          // react props
          key: itemKey,
          // item props
          item,
          itemKey,
          itemProps: props.itemProps,
          isSelected,
          isChecked,
          itemState,
          listState,
          getItemKey: props.getItemKey,
          setElementRef,
        })
      })}
    </ul>
  )
}
