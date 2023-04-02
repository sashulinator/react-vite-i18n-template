import { createElement, useRef, useState } from 'react'

import { ListActions } from '~/ui/list'

import { InputRenderProps, OnInputRender } from '../types/input-render'

export type DropdownProps<TOption, I extends InputRenderProps> = I & {
  onInputRender: OnInputRender<Omit<I, keyof DropdownProps<TOption, I>>> | 'input'
}

function Dropdown<TOption, I extends InputRenderProps>(props: DropdownProps<TOption, I>) {
  const { onInputRender, ...textInputProps } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen] = useState(true)
  const [search, setSearch] = useState('')
  const listActionsRef = useRef<ListActions>(null)
  const selectedElementRef = useRef<HTMLElement>(null)
  const firstElementRef = useRef<HTMLElement>(null)

  return (
    <>
      {createElement(onInputRender, {
        autoComplete: 'off',
        // readOnly: !listProps.filter,
        readOnly: false,
        ...textInputProps,
        value: props.value || search,
        ref: inputRef,
        onClick: onInputClick,
        onChange: onInputChange,
        onKeyDown: onInputKeyDown,
      })}
      {/* {createElement(onListRender, { ...listProps, inputRef, setOpen, isOpen })} */}
    </>
  )

  // Private

  // function handleClickOutside(event: MouseEvent | TouchEvent) {
  //   if (isElement(event.target) && inputRef?.current?.contains(event.target)) {
  //     return
  //   }
  //   close()
  // }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // listProps.setSelected(null)
    setSearch(e.target.value)
    open()
  }

  function onInputClick(e: React.MouseEvent<HTMLInputElement>) {
    isOpen ? close() : open()
    textInputProps?.onClick?.(e)
    setTimeout(() => {
      listActionsRef.current?.focusFirst?.()
      listActionsRef.current?.focusSelected?.()
    })
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      isOpen ? close() : open()
      listActionsRef.current?.focusFirst?.()
      listActionsRef.current?.focusSelected?.()
      setTimeout(() => {
        firstElementRef.current?.focus()
        selectedElementRef.current?.focus()
      })
    }
    if (e.key === 'Escape') {
      close()
    }
    if (e.key === 'ArrowDown' && isOpen) {
      firstElementRef.current?.focus()
      selectedElementRef.current?.focus()
    }
  }
}

export default Dropdown

// <>
//   <Popover
//     isOpen={true}
//     onClickOutside={handleClickOutside}
//     onEscKeyDown={() => {
//       close()
//       inputRef.current?.focus()
//     }}
//     sourceOffset={[0, 7]}
//     content={
//       <div
//         style={{
//           // display: filteredData?.length && isOpen ? 'block' : 'none',
//           background: 'var(--bgSecondary)',
//           borderRadius: '8px',
//           padding: '8px 0',
//           boxShadow: '0px 1.2px 18px rgba(0, 0, 0, 0.15), 0px 6.4px 29px rgba(0, 0, 0, 0.15)',
//           // width,
//           maxHeight: '150px',
//           overflowY: 'auto',
//         }}
//       >
//         <SelectableList
//           {...listProps}
//           actionRef={actionRef}
//           data={filteredData}
//           selectedElementRef={selectedElementRef}
//           firstElementRef={firstElementRef}
//           setSelected={(item) => {
//             listProps.setSelected(item)
//             setSearch('')
//             close()
//             inputRef.current?.focus()
//           }}
//         />
//       </div>
//     }
//   >
