import { useLayoutEffect, useRef } from 'react'

import Align from '~/ui/align'
import List, { EventNames, ListProps, ListState } from '~/ui/list'
import { ListProps as ListRenderProps } from '~/ui/new-dropdown'
import { setRefs } from '~/utils/react'

type DropdownListProps<T, P> = ListRenderProps & ListProps<T, P>

export default function DropdownList<T, P>(props: DropdownListProps<T, P>): JSX.Element | null {
  const { isFirstSelected, isFocused, searchQuery, inputElement, isOpen, setOpen, ...listProps } = props
  const renderProps: ListRenderProps = {
    isOpen,
    isFocused,
    isFirstSelected,
    searchQuery,
    inputElement,
    setOpen,
  }

  const width = getComputedStyle(props.inputElement).width

  const ref = useRef<HTMLDivElement>(null)
  const stateRef = useRef<ListState<T>>(null)

  useLayoutEffect(() => {
    if (renderProps.isFocused) {
      const key = listProps.checked?.length
        ? listProps.checked[0]
        : listProps.getItemKey(listProps.data[0], listProps.data, listProps.payload)
      stateRef.current?.mitt.emit(EventNames.focus, key)
    }
  }, [renderProps.isFocused])

  useLayoutEffect(() => {
    if (renderProps.isFirstSelected) {
      stateRef.current?.mitt.emit(EventNames.setSelected, [
        props.getItemKey(listProps.data[0], listProps.data, listProps.payload),
      ])
    }
  }, [renderProps.isFirstSelected])

  if (!renderProps.isOpen) {
    return null
  }

  return (
    <Align points={['tc', 'bc']} targetElement={renderProps.inputElement}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions*/}
      <div ref={ref} style={{ width }} onKeyDown={onKeyDown}>
        <List {...listProps} stateRef={setRefs(stateRef, listProps.stateRef)} />
      </div>
    </Align>
  )

  // Private

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && ref.current?.contains(document.activeElement)) {
      renderProps.setOpen(false)
      renderProps.inputElement.focus()
    }
  }
}
