import { useLayoutEffect, useRef } from 'react'

import Align from '~/ui/align'
import { EventNames, ListState } from '~/ui/list'
import ControlledList, { ControllableListProps } from '~/ui/list/ui/controlled-list'
import { ListProps as ListRenderProps } from '~/ui/new-dropdown'
import { setRefs } from '~/utils/react'

// Пропсы для дропдауна
export type DropdownListProps<T, P> = ControllableListProps<T, P> & Partial<ListRenderProps>

export default function DropdownList<T, P>(props: DropdownListProps<T, P>): JSX.Element | null {
  const { isFirstSelected, isFocused, searchQuery, inputElement, isOpen, setOpen, ...restProps } = props

  const renderProps = {
    isOpen,
    isFocused,
    isFirstSelected,
    searchQuery,
    inputElement,
    setOpen,
  } as ListRenderProps

  const width = getComputedStyle(renderProps.inputElement).width

  const stateRef = useRef<ListState<T>>(null)

  const listProps: ControllableListProps<T, P> = {
    ...restProps,
    rootProps: { style: { ...restProps.rootProps?.style, width } },
    stateRef: setRefs(stateRef, restProps.stateRef),
  }

  useLayoutEffect(() => {
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
      <ControlledList {...listProps} />
    </Align>
  )
}
