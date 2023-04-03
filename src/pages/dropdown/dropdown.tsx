import React, { useRef, useState } from 'react'

import DropdownList from '~/ui/dropdown-list/ui/dropdown-list'
import { EventNames, ItemProps, Key, ListProps, ListState, getNext, getPrevious } from '~/ui/list'
// import DropdownList from '~/ui/dropdown-list/ui/dropdown-list'
// import { SelectableItemComponentProps } from '~/ui/list'
import Dropdown from '~/ui/new-dropdown'
import TextInput, { TextInputProps } from '~/ui/text-input/ui/text-input'

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
  const item = listStateRef.current?.map.get(value)?.item

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
          <Dropdown<TextInputProps, ListProps<DropdownItem, undefined>>
            value={item?.username}
            renderInput={TextInput}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            renderList={DropdownList}
            listProps={{
              data,
              selected,
              checked,
              onSelectOne: (k) => setSelected([k]),
              onUnselectOne: () => setSelected([]),
              renderItem: SingleSelectItem,
              getItemKey: (item) => item.username,
              onCheckOne: (key) => setChecked(() => [key]),
            }}
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
    if (e.key === ' ') {
      toggle()
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
