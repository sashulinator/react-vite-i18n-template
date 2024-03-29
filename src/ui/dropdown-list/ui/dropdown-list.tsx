import { Offset } from 'dom-align-ts'
import { forwardRef, useMemo, useRef } from 'react'

import Align from '~/ui/align'
import { ListState } from '~/ui/list'
import ControlledList, { ControllableListProps } from '~/ui/list/ui/controlled-list'
import { ListProps as ListRenderProps } from '~/ui/new-dropdown'
import { fns } from '~/utils/function/fns'
import { setRefs } from '~/utils/react'

// Пропсы для дропдауна
export type DropdownListProps<T, P> = ControllableListProps<T, P> &
  Partial<ListRenderProps> & {
    filter?: ((item: T, searchQuery: string, data: T[]) => boolean) | undefined
    offset?: Offset
  }

function DropdownList<T, P>(props: DropdownListProps<T, P>): JSX.Element | null {
  const { searchQuery = '', inputElement, isOpen, offset, filter, setSearchQuery, ...restProps } = props

  const renderProps = {
    isOpen,
    searchQuery,
    inputElement,
  } as ListRenderProps

  const width = getComputedStyle(renderProps.inputElement).width
  const filteredData = useMemo(
    () => (filter ? props.data.filter((item) => filter(item, searchQuery, props.data)) : props.data),
    [filter, searchQuery]
  )

  const stateRef = useRef<ListState<T>>(null)

  const listProps: ControllableListProps<T, P> = {
    ...restProps,
    data: filteredData,
    rootProps: {
      ...restProps.rootProps,
      style: { ...restProps.rootProps?.style, width },
      onFocus: fns(restProps.rootProps?.onFocus, onListFocus),
      onKeyDown: fns(restProps.rootProps?.onKeyDown, onListKeyDown),
      onClick: fns(restProps.rootProps?.onClick, onListClick),
    },
    listStateRef: setRefs(stateRef, restProps.listStateRef),
    onCheck: fns(restProps.onCheck, () => {
      // Делаем через таймаут чтобы лист не моргал
      setTimeout(() => setSearchQuery?.(''))
    }),
  }

  if (!renderProps.isOpen) {
    return null
  }

  return (
    <Align points={['tc', 'bc']} sourceOffset={offset} targetElement={renderProps.inputElement}>
      <ControlledList {...listProps} />
    </Align>
  )

  function onListFocus(e: React.FocusEvent<HTMLUListElement>) {
    if (e.target === e.currentTarget) {
      stateRef.current?.focus()
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.target === e.currentTarget) return
    if (e.key === 'Enter') {
      setTimeout(() => props.setOpen?.(false))
      props.inputElement?.focus()
    }
  }

  function onListClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) return
    // TODO isSelectable??
    setTimeout(() => props.setOpen?.(false))
    props.inputElement?.focus()
  }
}

const DropdownListForwardRef = forwardRef<HTMLUListElement, ControllableListProps<unknown, unknown>>(
  function DropdownListForwardRef(props, ref) {
    return <DropdownList {...props} rootProps={{ ...props.rootProps, ref: setRefs(ref, props.rootProps?.ref) }} />
  }
) as typeof DropdownList

export default DropdownListForwardRef
