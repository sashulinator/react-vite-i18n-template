import { useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

import Popover from '~/ui/popover'
// import PositioningPortal, { PositionStrategyProps, bottomPrefered } from '~/ui/positioning-portal'
import TextInput, { TextInputProps } from '~/ui/text-input'
import { isElement } from '~/utils/dom/is/element'
import { useBoolean } from '~/utils/hooks'
// import If from '~/utils/react/if'
import { setRefs } from '~/utils/react/set-refs'

export interface DropdownProps<T, P> extends Omit<any, 'setSelected'> {
  textInputProps?: TextInputProps
  id?: string
  name?: string
  inputValue: string | undefined
  filter?: (item: T, searchQuery: string) => boolean
  setSelected: (item: T | null) => void
}

function Dropdown<T, P>(props: DropdownProps<T, P>) {
  const { textInputProps, id, name, filter, inputValue = '', ...listProps } = props
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null)
  const [isOpen, open, close] = useBoolean(false)
  const listWrapperRef = useRef<HTMLDivElement>(null)
  const [setInputMeasureEl, { width }] = useMeasure()
  const [search, setSearch] = useState('')
  const actionRef = useRef<any>(null)
  const selectedElementRef = useRef<HTMLElement>(null)
  const firstElementRef = useRef<HTMLElement>(null)
  const filteredData = filter ? listProps.data?.filter((item) => filter(item, search)) : listProps.data

  return (
    <>
      <Popover
        isOpen={true}
        onClickOutside={handleClickOutside}
        onEscKeyDown={() => {
          close()
          inputEl?.focus()
        }}
        sourceOffset={[0, 7]}
        content={
          <div
            ref={listWrapperRef}
            style={{
              display: filteredData?.length && isOpen ? 'block' : 'none',
              background: 'var(--bgSecondary)',
              borderRadius: '8px',
              padding: '8px 0',
              boxShadow: '0px 1.2px 18px rgba(0, 0, 0, 0.15), 0px 6.4px 29px rgba(0, 0, 0, 0.15)',
              width,
              maxHeight: '150px',
              overflowY: 'auto',
            }}
          >
            {/* <SelectableList
              {...listProps}
              actionRef={actionRef}
              data={filteredData}
              selectedElementRef={selectedElementRef}
              firstElementRef={firstElementRef}
              setSelected={(item) => {
                listProps.setSelected(item)
                setSearch('')
                close()
                inputEl?.focus()
              }}
            /> */}
          </div>
        }
      >
        <TextInput
          autoComplete='off'
          id={id}
          readOnly={!filter}
          name={name}
          {...textInputProps}
          value={search || inputValue}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          ref={setRefs(setInputEl as any, setInputMeasureEl)}
          onClick={onInputClick}
        />
      </Popover>
    </>
  )

  // Private

  function handleClickOutside(event: MouseEvent | TouchEvent) {
    if (isElement(event.target) && inputEl?.contains(event.target)) {
      return
    }
    close()
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    listProps.setSelected(null)
    setSearch(e.target.value)
    open()
  }

  function onInputClick(e: React.MouseEvent<HTMLInputElement>) {
    isOpen ? close() : open()
    textInputProps?.onClick?.(e)
    setTimeout(() => {
      actionRef.current?.focusFirst?.()
      actionRef.current?.focusSelected?.()
    })
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      isOpen ? close() : open()
      actionRef.current?.focusFirst?.()
      actionRef.current?.focusSelected?.()
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
