import { forwardRef, useCallback, useState } from 'react'
import useMeasure from 'react-use-measure'

import List from '~/ui/list'
import Popover from '~/ui/popover'
// import PositioningPortal, { PositionStrategyProps, bottomPrefered } from '~/ui/positioning-portal'
import TextInput, { TextInputProps } from '~/ui/text-input'
import { isElement } from '~/utils/dom/is/element'
import { useBoolean } from '~/utils/hooks'
// import If from '~/utils/react/if'
import { setRefs } from '~/utils/react/set-refs'

export type DropdownProps = TextInputProps

const DropdownComponent: React.ForwardRefRenderFunction<HTMLInputElement, DropdownProps> = (props, ref) => {
  // const { portalProps } = props
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null)
  const [, open] = useBoolean(false)
  const [isFocused, setFocused, unsetFocused] = useBoolean(false)
  const [setInputMeasureEl, { width }] = useMeasure()
  const data = ['первоеСлово', 'второеСлово', 'третье', 'четвертое', 'шестое']
  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')
  const filteredData = !search && value ? [] : data.filter((item) => new RegExp(search, 'ig').test(item.toString()))
  const isListVisible = Boolean(filteredData.length) || (!value && !search)

  return (
    <>
      <Popover
        isOpen={isFocused && isListVisible}
        onClickOutside={handleClickOutside}
        offset={[0, 5]}
        content={
          <div
            style={{
              background: 'var(--bgSecondary)',
              borderRadius: '8px',
              padding: '8px 0',
              boxShadow: '0px 1.2px 18px rgba(0, 0, 0, 0.15), 0px 6.4px 29px rgba(0, 0, 0, 0.15)',
              position: 'fixed',
              width,
              maxHeight: '400px',
            }}
          >
            <List
              data={filteredData}
              onItemRender={(item) => {
                return (
                  <ol
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role={'button'}
                    data-selectable={typeof item === 'number'}
                    style={{ padding: '8px' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setValue(item)
                        setSearch('')
                      }
                    }}
                    onClick={() => {
                      setValue(item)
                      setSearch('')
                    }}
                  >
                    {item}
                  </ol>
                )
              }}
            />
          </div>
        }
      >
        <TextInput
          {...props}
          value={search || value}
          onChange={(e) => {
            setValue('')
            setSearch(e.target.value)
          }}
          ref={setRefs(setInputEl, ref, setInputMeasureEl)}
          onClick={open}
          onFocus={useCallback(handleOnFocus, [props.onFocus])}
        />
      </Popover>
    </>
  )

  // Private

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    setFocused()
    props.onFocus?.(e)
  }

  function handleClickOutside(event: MouseEvent) {
    if (isElement(event.target) && inputEl?.contains(event.target)) {
      return
    }
    unsetFocused()
  }
}

const Dropdown = forwardRef(DropdownComponent)
export default Dropdown
