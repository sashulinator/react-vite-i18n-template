import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

import Align from '~/ui/align'
import List, { EventNames, ItemProps, Key, ListProps, ListState, getNext, getPrevious } from '~/ui/list'
// import DropdownList from '~/ui/dropdown-list/ui/dropdown-list'
// import { SelectableItemComponentProps } from '~/ui/list'
import Dropdown from '~/ui/new-dropdown'
import TextInput, { TextInputProps } from '~/ui/text-input/ui/text-input'
import { useLatest } from '~/utils/hooks/latest'

// import TextInput from '~/ui/text-input/ui/text-input'

interface DropdownItem {
  id: string
  username: string
  sex: string
}

const data: DropdownItem[] = [
  {
    id: '1',
    username: 'Vasya',
    sex: 'male',
  },
  {
    id: '2',
    username: 'Petya',
    sex: 'male',
  },
  {
    id: '3',
    username: 'Olya',
    sex: 'female',
  },
  {
    id: '4',
    username: 'Lena',
    sex: 'female',
  },
  {
    id: '5',
    username: 'Kira',
    sex: 'female',
  },
  {
    id: '6',
    username: 'Misha',
    sex: 'male',
  },
  {
    id: '7',
    username: 'John',
    sex: 'male',
  },
]

export default function DropdownPage(): JSX.Element {
  const [checked, setChecked] = useState<Key[]>([])
  const [selected, setSelected] = useState<Key[]>([])
  const listStateRef = useRef<ListState<DropdownItem>>(null)
  const value = checked[0] || ''
  const item = listStateRef.current?.map.get(value)?.[1]

  const selectedRef = useLatest(selected)
  const checkedRef = useLatest(checked)

  return (
    <main className='pt-5rem'>
      <div
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)' }}
      >
        <h2 className='mb-2rem'>Dropdown</h2>
        <div className='mt-1rem'>
          <label htmlFor='readonly' className='label ml-0.25rem'>
            Dropdown
          </label>
          <Dropdown<TextInputProps, ListProps<DropdownItem>>
            value={item?.username}
            renderInput={TextInput}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            listProps={{ data, renderItem: SingleSelectItem as any, getItemKey: (item) => item.username }}
            renderList={useCallback((dlProps) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useLayoutEffect(() => {
                if (dlProps.isFocused) {
                  const key = selectedRef.current.length ? selectedRef.current : [data[0].username]
                  stateRef.current?.mitt.emit(EventNames.focus, key[0])
                }
              }, [dlProps.isFocused])

              // eslint-disable-next-line react-hooks/rules-of-hooks
              useLayoutEffect(() => {
                if (dlProps.isFirstSelected) {
                  stateRef.current?.mitt.emit(EventNames.setSelected, [data[0].username])
                }
              }, [dlProps.isFirstSelected])

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const ref = useRef<HTMLDivElement>(null)
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const stateRef = useRef<ListState<DropdownItem>>(null)

              if (!dlProps.isOpen) {
                return null
              }
              return (
                <Align points={['tc', 'bc']} targetElement={dlProps.inputElement}>
                  <div ref={ref} style={{ width: getComputedStyle(dlProps.inputElement).width }}>
                    <List
                      data={data}
                      renderItem={dlProps.renderItem}
                      getItemKey={dlProps.getItemKey}
                      checked={checkedRef.current}
                      selected={selectedRef.current}
                      isSelectable={(item) => Boolean(item.id)}
                      onSelectOne={(key) => setSelected([key])}
                      onUnselectOne={() => setSelected([])}
                      stateRef={stateRef}
                      onCheckOne={(key) => {
                        dlProps.onChecked()
                        setChecked([key])
                      }}
                      onUncheckOne={() => setChecked([])}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    />
                  </div>
                </Align>
              )
            }, [])}
          />
        </div>
      </div>
    </main>
  )
}

function SingleSelectItem(props: ItemProps<DropdownItem, undefined>) {
  const selected = props.selected[0]
  const isSelected = props.itemKey === selected
  const isChecked = props.checked.includes(props.itemKey)

  function select() {
    console.log('selected', selected, isSelected)
    props.mitt.emit(EventNames.selectOne, props.itemKey)
  }
  function unselect() {
    props.mitt.emit(EventNames.unselectOne, props.itemKey)
  }
  function toggle() {
    if (isChecked) {
      props.mitt.emit(EventNames.uncheckOne, props.itemKey)
    } else {
      props.mitt.emit(EventNames.checkOne, props.itemKey)
    }
  }
  function selectNext() {
    const previous = getPrevious(selected, props.map)
    if (previous === null) return
    props.mitt.emit(EventNames.focus, previous.itemKey)
    props.mitt.emit(EventNames.setSelected, [previous.itemKey])
  }
  function selectPrevious() {
    const next = getNext(selected, props.map)
    if (next === null) return
    props.mitt.emit(EventNames.focus, next.itemKey)
    props.mitt.emit(EventNames.setSelected, [next.itemKey])
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      toggle()
    }
    if (e.key === 'ArrowUp') {
      selectNext()
    }
    if (e.key === 'ArrowDown') {
      selectPrevious()
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onClick={toggle}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={props.elementRef}
      onKeyDown={onKeyDown}
      onMouseEnter={select}
      onMouseLeave={unselect}
      onBlur={unselect}
      onFocus={select}
      style={{ backgroundColor: isSelected ? 'black' : isChecked ? 'green' : undefined }}
    >
      {props.item.username}
    </li>
  )
}
