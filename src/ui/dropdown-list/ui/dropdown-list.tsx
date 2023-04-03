import React, { ForwardedRef, useImperativeHandle, useRef, useState } from 'react'

import Align from '~/ui/align'
import List, { ListProps, ListState } from '~/ui/list'

interface DropdownListProps<T, P> extends ListProps<T, P> {
  isOpen?: boolean
  searchQuery?: string | undefined
  inputElement: HTMLInputElement | null
  actionsRef: ForwardedRef<{
    focus: () => void
  }>
  filter?: (item: T, searchQuery?: string) => boolean
}

export default function DropdownList<T, P>(props: DropdownListProps<T, P>): JSX.Element | null {
  const { isOpen, searchQuery, data, filter, actionsRef, ...listProps } = props

  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const stateRef = useRef<ListState<T>>(null)

  useImperativeHandle(
    actionsRef,
    () => {
      return {
        focus: () => {
          // stateRef.current?.mitt.emit(EventNames.selectFirst)
          // rootElement?.focus()
        },
      }
    },
    [rootElement, props.checked]
  )

  if (!isOpen || !props.inputElement) {
    return null
  }

  const filteredData = props.filter && searchQuery ? data?.filter((item) => filter?.(item, searchQuery)) : props.data
  const { width } = getComputedStyle(props.inputElement)

  return (
    <Align points={['tc', 'bc']} targetElement={props.inputElement}>
      <div
        ref={setRootElement}
        style={{
          display: filteredData?.length && isOpen ? 'block' : 'none',
          background: 'var(--bgSecondary)',
          borderRadius: '8px',
          padding: '8px 0',
          boxShadow: '0px 1.2px 18px rgba(0, 0, 0, 0.15), 0px 6.4px 29px rgba(0, 0, 0, 0.15)',
          width,
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        <List {...listProps} data={filteredData} stateRef={stateRef} />
      </div>
    </Align>
  )
}
