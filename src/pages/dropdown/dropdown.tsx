import React, { useRef, useState } from 'react'

import DropdownList from '~/ui/dropdown-list'
import { Item } from '~/ui/dropdown-list/ui/item'
import { EventNames, ItemProps, Key, ListState } from '~/ui/list'
// import DropdownList from '~/ui/dropdown-list/ui/dropdown-list'
// import { SelectableItemComponentProps } from '~/ui/list'
import Dropdown from '~/ui/new-dropdown'
import TextInput from '~/ui/text-input/ui/text-input'
import { isElement } from '~/utils/dom'
import { isHTMLElement } from '~/utils/dom/is/is-htmlelement'

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
  const [checked, setChecked] = useState<Key>('')
  const listStateRef = useRef<ListState<DropdownItem>>(null)

  const item = listStateRef.current?.map.get(checked)?.[1]

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
          <Dropdown
            value={item?.username}
            renderInput={TextInput as any}
            renderList={(dlProps) => {
              const nChecked = checked ? [checked] : []

              return (
                <DropdownList
                  {...dlProps}
                  stateRef={listStateRef}
                  checked={nChecked}
                  onCheck={(newChecked) => {
                    const n = newChecked.filter((v) => v !== checked)
                    setChecked(n[0])
                    dlProps.onChecked()
                  }}
                  data={data}
                  getItemKey={(item) => item.id}
                  renderItem={(iProps) => {
                    return <Item {...iProps}>{iProps.item.username}</Item>
                  }}
                />
              )
            }}
          />
        </div>
      </div>
    </main>
  )
}
