import { createElement, useRef, useState } from 'react'

import { Any } from '~/utils/core'
import { useEventListener, useOnClickOutside } from '~/utils/hooks'

import { InputRenderProps, OnInputRender } from '../types/input-render'
import { OnListRender } from '../types/list-render'

export type DropdownProps<
  I extends InputRenderProps,
  LP extends { filter?: ((...a: Any[]) => Any) | undefined }
> = I & {
  renderInput: OnInputRender<Omit<I, keyof DropdownProps<I, LP>>> | 'input'
  listProps: LP
  renderList: OnListRender<LP>
  clearValue: () => void
}

function Dropdown<I extends InputRenderProps, LP extends { filter?: ((...a: Any[]) => Any) | undefined }>(
  props: DropdownProps<I, LP>
) {
  const { renderInput, renderList, listProps, clearValue, ...textInputProps } = props
  const [inputElement, setInputElement] = useState<null | HTMLInputElement>(null)
  const [isOpen, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const listRef = useRef<HTMLElement>(null)

  useOnClickOutside(listRef, (e) => {
    if (!inputElement?.contains(e.target as HTMLElement)) {
      setOpen(false)
    }
  })

  useEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      (listRef.current?.contains(document.activeElement) || document.activeElement === inputElement)
    ) {
      setOpen(false)
      inputElement?.focus()
    }
  })

  return (
    <>
      {createElement(renderInput, {
        autoComplete: 'off',
        ...textInputProps,
        value: searchQuery || props.value,
        readOnly: !listProps.filter,
        ref: setInputElement,
        onClick: onInputClick,
        onChange: onInputChange,
        onKeyDown: onInputKeyDown,
      })}
      {inputElement &&
        createElement(renderList, {
          ...listProps,
          ref: listRef,
          inputElement,
          isOpen,
          searchQuery,
          setSearchQuery,
          setOpen,
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

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // listProps.setSelected(null)
    setSearchQuery(e.target.value)
    setOpen(true)
    props.onChange?.(e)
    clearValue()
  }

  function onInputClick(e: React.MouseEvent<HTMLInputElement>) {
    if (isOpen) {
      setOpen(false)
    } else {
      setOpen(true)
    }

    textInputProps?.onClick?.(e)
    props.onClick?.(e)
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (isOpen) {
        setOpen(false)
      } else {
        setOpen(true)
        setTimeout(() => {
          listRef.current?.focus()
        }, 0)
      }
    }

    if (e.key === 'ArrowDown') {
      // Для предотвращения нежелательного после фокуса, запускаем через таймаут
      setTimeout(() => listRef.current?.focus())
    }
    props.onKeyDown?.(e)
  }
}

export default Dropdown
