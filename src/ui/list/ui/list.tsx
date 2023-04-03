import c from 'clsx'
import React, { useMemo, useRef } from 'react'

import { useControlledState } from '~/utils/hooks/controlled-state'
import { useLatest } from '~/utils/hooks/latest'
import { setRefs } from '~/utils/react'

import { createMitt } from '../lib/create-mitt'
import { Key } from '../types/key'
import { ListProps } from '../types/list-props'
import { MapItem } from '../types/map-item'
import { ListState } from '../types/state-ref'

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

  const isDataChanged = useMemo(() => ({}), [props.data])
  const [checked, onCheck] = useControlledState<Key[]>([], checkedProp, onCheckProp)
  const [selected, onSelect] = useControlledState<Key[]>([], selectedProp, onSelectProp)
  const checkedKeyRef = useLatest(checked)
  const selectedKeyRef = useLatest(selected)
  const stateRef = useRef<ListState<T>>(null)

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
        data: props.data,
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

  React.useImperativeHandle(setRefs(stateRef, props.stateRef), () => ({ map, mitt, checkedKeyRef, selectedKeyRef }), [
    isDataChanged,
  ])

  return (
    <ul {...props.rootProps} className={c('ui-List', props.rootProps?.className)}>
      {props.data.map((item, index) => {
        const itemKey = props.getItemKey(item, props.data)
        const elementRef = { current: null }
        map.set(itemKey, { itemKey, index, item, elementRef })

        return React.createElement(props.renderItem, {
          key: itemKey,
          data: props.data,
          itemProps: props.itemProps,
          getItemKey: props.getItemKey,
          stateRef,
          mitt,
          elementRef,
          selected,
          checked,
          item,
          map,
          itemKey,
        })
      })}
    </ul>
  )
}
