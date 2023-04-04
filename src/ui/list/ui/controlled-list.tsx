import React, { useRef } from 'react'

import { setRefs } from '~/utils/react'

import { ListProps } from '../types/list-props'
import { ListState } from '../types/state-ref'
import List from './list'

type ControlledListProps<T, TItemProps> = ListProps<T, TItemProps>

export default function ControlledList<T, TItemProps>(props: ControlledListProps<T, TItemProps>): JSX.Element {
  const stateRef = useRef<ListState<T>>(null)

  function onKeyDown(e: React.KeyboardEvent) {
    if (!stateRef.current) return
    const { focus, getItemKey, checkedKeyRef, selectedKeyRef, data } = stateRef.current
    if (e.key === 'Enter' && stateRef.current) {
      const firstChecked = checkedKeyRef.current?.[0]
      const firstSelected = selectedKeyRef.current?.[0]
      const firstItem = getItemKey(data[0], data)
      const key = firstChecked ? firstChecked : firstSelected ? firstSelected : firstItem
      focus(key)
    }
  }

  return (
    <List
      {...props}
      stateRef={setRefs(stateRef, props.stateRef)}
      rootProps={{
        tabIndex: 0,
        onKeyDown,
        ...props.rootProps,
      }}
    />
  )
}
