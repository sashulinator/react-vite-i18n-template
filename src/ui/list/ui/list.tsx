import c from 'clsx'
import React, { useMemo } from 'react'

import { useControlledState } from '~/utils/hooks/controlled-state'
import { useLatest } from '~/utils/hooks/latest'

import { createMitt } from '../lib/create-mitt'
import { Key } from '../types/key'
import { ListProps } from '../types/list-props'
import { MapItem } from '../types/map-item'

export default function List<T, P>(props: ListProps<T, P>): JSX.Element {
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
    ...restProps
  } = props

  const isDataChanged = useMemo(() => ({}), [props.data])
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
        const elementRef = { current: null }
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
