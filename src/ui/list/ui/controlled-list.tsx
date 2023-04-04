import React, { forwardRef, useLayoutEffect, useRef } from 'react'

import { assertNotNull } from '~/utils/core/assertions/assert-not-null'
import { isNull } from '~/utils/core/is/is-null'
import { fns } from '~/utils/function/fns'
import { setRefs } from '~/utils/react'

import { getNext, getPrevious } from '../lib/get-sibling'
import { ListProps } from '../types/list-props'
import { ListState } from '../types/state-ref'
import List from './list'

export interface ControllableItemProps {
  controlProps?: {
    tabIndex: number
    onKeyDown: (e: React.KeyboardEvent) => void
    onMouseOver: (e: React.MouseEvent) => void
    onMouseLeave: (e: React.MouseEvent) => void
    onClick: (e: React.MouseEvent) => void
    onBlur: (e: React.FocusEvent) => void
    onFocus: (e: React.FocusEvent) => void
  }
}

export type ControllableListProps<T, TItemProps> = ListProps<T, TItemProps & ControllableItemProps>

function ControllableList<T, TItemProps>(props: ControllableListProps<T, TItemProps>): JSX.Element {
  const stateRef = useRef<ListState<T>>(null)
  const controlProps: ControllableItemProps['controlProps'] = {
    tabIndex: -1,
    onKeyDown: onItemKeyDown,
    onMouseOver: onItemMouseOver,
    onMouseLeave: onItemMouseLeave,
    onClick: onItemMouseClick,
    onBlur: onItemBlur,
    onFocus: onItemFocus,
  }

  useLayoutEffect(() => {
    if (!stateRef.current?.listRef.current) return
    stateRef.current.listRef.current.style.visibility = 'hidden'
    const key =
      stateRef.current?.checkedKeyRef.current?.[0] ||
      stateRef.current?.selectedKeyRef.current?.[0] ||
      stateRef.current?.getItemKey(props.data[0], props.data)
    setTimeout(() => {
      if (key === undefined) return
      const offsetTop = stateRef.current?.map.get(key)?.elementRef.current?.offsetTop
      if (offsetTop === undefined) return
      if (!stateRef.current?.listRef.current) return
      stateRef.current.listRef.current.scrollTo({ top: offsetTop })
      stateRef.current.listRef.current.style.visibility = 'visible'
    }, 10)
  }, [])

  const itemProps = {
    controlProps,
    ...props.itemProps,
  } as TItemProps & ControllableItemProps

  return (
    <List
      {...props}
      stateRef={setRefs(stateRef, props.stateRef)}
      itemProps={itemProps}
      rootProps={{
        tabIndex: props.rootProps?.tabIndex ?? 0,
        onKeyDown: fns(onListKeyDown, props.rootProps?.onKeyDown),
        ...props.rootProps,
      }}
    />
  )

  // Private

  function onItemFocus(e: React.FocusEvent) {
    assertNotNull(stateRef.current)
    const mapItem = stateRef.current.map.get(e.target as HTMLLIElement)
    if (mapItem === undefined) return
    stateRef.current.selectOne(mapItem.itemKey)
  }

  function onItemBlur(e: React.FocusEvent) {
    assertNotNull(stateRef.current)
    const mapItem = stateRef.current.map.get(e.target as HTMLLIElement)
    if (mapItem === undefined) return
    stateRef.current.unselectOne(mapItem.itemKey)
  }

  function onItemMouseLeave(e: React.MouseEvent) {
    assertNotNull(stateRef.current)
    const mapItem = stateRef.current.map.get(e.target as HTMLLIElement)
    if (mapItem === undefined) return
    stateRef.current.unselectOne(mapItem.itemKey)
  }

  function onItemMouseOver(e: React.MouseEvent) {
    assertNotNull(stateRef.current)
    const mapItem = stateRef.current.map.get(e.target as HTMLLIElement)
    if (mapItem === undefined) return
    stateRef.current.selectOne(mapItem.itemKey)
  }

  function onItemMouseClick(e: React.MouseEvent) {
    assertNotNull(stateRef.current)
    const mapItem = stateRef.current.map.get(e.target as HTMLLIElement)
    if (mapItem === undefined) return
    if (stateRef.current.checkedKeyRef.current?.includes(mapItem.itemKey)) {
      stateRef.current.uncheckOne(mapItem.itemKey)
    } else {
      stateRef.current.checkOne(mapItem.itemKey)
    }
  }

  function onItemKeyDown(e: React.KeyboardEvent) {
    assertNotNull(stateRef.current)
    const mapItem = stateRef.current.map.get(e.target as HTMLLIElement)
    if (mapItem === undefined) return

    if (e.key === 'Enter') {
      if (stateRef.current.checkedKeyRef.current?.includes(mapItem.itemKey)) {
        stateRef.current.uncheckOne(mapItem.itemKey)
      } else {
        stateRef.current.checkOne(mapItem.itemKey)
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = getNext(mapItem.itemKey, mapItem.map)
      if (isNull(next)) return
      stateRef?.current?.focus(next.itemKey)
      stateRef.current.listRef?.current?.scroll({
        top: next.elementRef?.current?.offsetTop as number,
      })
    }
    if (e.key === 'ArrowUp') {
      // Отменить скролл
      e.preventDefault()
      const previous = getPrevious(mapItem.itemKey, stateRef.current?.map)
      if (isNull(previous)) return
      stateRef.current?.focus(previous.itemKey)
      stateRef.current.listRef?.current?.scroll({
        top: previous.elementRef?.current?.offsetTop as number,
      })
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.target === e.currentTarget) {
      if (!stateRef.current) return
      const { focus } = stateRef.current
      if (e.key === 'Enter' && stateRef.current) {
        focus()
      }
    }
  }
}

const ControlledListForwardRef = forwardRef<HTMLUListElement, ControllableListProps<unknown, unknown>>(
  function ControlledListForwardRef(props, ref) {
    return <ControllableList {...props} rootProps={{ ...props.rootProps, ref: setRefs(ref, props.rootProps?.ref) }} />
  }
) as typeof ControllableList

export default ControlledListForwardRef
