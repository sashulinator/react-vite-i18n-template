import { createElement, useState } from 'react'

import { InputRenderProps, OnInputRender } from '../types/input-render'
import { OnListRender } from '../types/list-render'

export type DropdownProps<I extends InputRenderProps, LP> = I & {
  renderInput: OnInputRender<Omit<I, keyof DropdownProps<I, LP>>> | 'input'
  renderList: OnListRender<LP>
  listProps: LP
}

function Dropdown<I extends InputRenderProps, LP>(props: DropdownProps<I, LP>) {
  const { renderInput, renderList, listProps, ...textInputProps } = props
  const [inputElement, setInputElement] = useState<null | HTMLInputElement>(null)
  const [isOpen, setOpen] = useState(false)
  const [isFirstSelected, setFirstSelected] = useState(false)
  const [search, setSearch] = useState('')
  const [isListFocused, setListFocused] = useState(false)

  return (
    <>
      {createElement(renderInput, {
        autoComplete: 'off',
        ...textInputProps,
        value: props.value || search,
        ref: setInputElement,
        onClick: onInputClick,
        onChange: onInputChange,
        onKeyDown: onInputKeyDown,
      })}
      {inputElement &&
        createElement(renderList, {
          ...listProps,
          key: 'list',
          inputElement,
          isOpen,
          isFocused: isListFocused,
          isFirstSelected,
          onChecked,
        })}
    </>
  )

  // Private

  // function handleClickOutside(event: MouseEvent | TouchEvent) {
  //   if (isElement(event.target) && inputRef?.current?.contains(event.target)) {
  //     return
  //   }
  //   close()
  // }
  function onChecked() {
    setOpen(false)
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // listProps.setSelected(null)
    setSearch(e.target.value)
    setOpen(true)
    setFirstSelected(true)
    props.onChange?.(e)
  }

  function onInputClick(e: React.MouseEvent<HTMLInputElement>) {
    if (isOpen) {
      setOpen(false)
      setListFocused(false)
    } else {
      setOpen(true)
      setListFocused(true)
    }

    textInputProps?.onClick?.(e)
    props.onClick?.(e)
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (isOpen) {
        setOpen(false)
        setListFocused(false)
      } else {
        setOpen(true)
      }
      // listActionsRef.current?.focusFirst?.()
      // listActionsRef.current?.focusSelected?.()
      // setTimeout(() => {
      //   firstElementRef.current?.focus()
      //   selectedElementRef.current?.focus()
      // })
    }
    if (e.key === 'Escape') {
      setOpen(false)
      setListFocused(false)
    }
    if (e.key === 'ArrowDown' && isOpen) {
      setListFocused(true)
    }
    props.onKeyDown?.(e)
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
