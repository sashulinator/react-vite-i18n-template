import { useLayoutEffect, useRef } from 'react'

import Align from '~/ui/align'
import List, { EventNames, ListProps, ListState, MapItem, getNext } from '~/ui/list'
import { ListProps as ListRenderProps } from '~/ui/new-dropdown'
import { assertNotNull } from '~/utils/core/assertions/assert-not-null'
import { isNull } from '~/utils/core/is/is-null'
import { setRefs } from '~/utils/react'

// Пропсы которые передают в этом компоненте
export interface OptionalItemProps<T> {
  onKeyDown?: (mapItem: MapItem<T>, e: React.KeyboardEvent) => void
}
// Пропсы которые ожидаются
export interface RequiredItemProps {
  children: React.ReactNode
}

// Пропсы для дропдауна
type DropdownListProps<T, P> = ListRenderProps & ListProps<T, P>

export default function DropdownList<T, P>(
  props: DropdownListProps<T, P & OptionalItemProps<T> & RequiredItemProps>
): JSX.Element | null {
  const { isFirstSelected, isFocused, searchQuery, inputElement, isOpen, setOpen, ...listProps } = props
  const renderProps: ListRenderProps = {
    isOpen,
    isFocused,
    isFirstSelected,
    searchQuery,
    inputElement,
    setOpen,
  }

  const itemProps = listProps.itemProps
  listProps['onKeyDown'] = closureMapItem(onKeyDown)

  const width = getComputedStyle(props.inputElement).width

  const ref = useRef<HTMLDivElement>(null)
  const stateRef = useRef<ListState<T>>(null)

  useLayoutEffect(() => {
    console.log('stateRef', stateRef)

    if (renderProps.isFocused) {
      const key = listProps.checked?.length
        ? listProps.checked[0]
        : listProps.getItemKey(listProps.data[0], listProps.data)
      stateRef.current?.mitt.emit(EventNames.focus, key)
    }
  }, [renderProps.isFocused])

  useLayoutEffect(() => {
    if (renderProps.isFirstSelected) {
      stateRef.current?.mitt.emit(EventNames.setSelected, [props.getItemKey(listProps.data[0], listProps.data)])
    }
  }, [renderProps.isFirstSelected])

  if (!renderProps.isOpen) {
    return null
  }

  return (
    <Align points={['tc', 'bc']} targetElement={renderProps.inputElement}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions*/}
      <div ref={ref} style={{ width }}>
        <List {...listProps} stateRef={setRefs(stateRef, listProps.stateRef)} itemProps={itemProps} />
      </div>
    </Align>
  )

  // Private

  function closureMapItem<M extends MapItem<T>, A extends unknown[]>(fn: (m: M, ...args: A) => void) {
    return (mapItem: M) => {
      return (...args: A) => fn(mapItem, ...args)
    }
  }

  function onKeyDown(mapItem: MapItem<T>, e: React.KeyboardEvent) {
    if (e.key === 'Enter' && ref.current?.contains(document.activeElement)) {
      renderProps.setOpen(false)
      renderProps.inputElement.focus()
    }
    assertNotNull(stateRef.current)
    if (e.key === 'ArrowDown') {
      const next = getNext(mapItem.itemKey, mapItem.map)
      if (isNull(next)) return
      stateRef.current.setSelected([next.itemKey])
    }
    if (e.key === 'ArrowUp') {
      const previous = getNext(mapItem.itemKey, stateRef.current?.map)
      if (isNull(previous)) return
      stateRef.current.setSelected([previous.itemKey])
    }
    listProps.itemProps?.onKeyDown?.(mapItem, e)
  }
}
