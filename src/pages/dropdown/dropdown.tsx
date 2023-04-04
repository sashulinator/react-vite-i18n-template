import { useRef, useState } from 'react'

import { DropdownItem, DropdownItemProps } from '~/ui/dropdown-list'
import DropdownList, { DropdownListProps } from '~/ui/dropdown-list/ui/dropdown-list'
import { Key, ListState } from '~/ui/list'
// import DropdownList from '~/ui/dropdown-list/ui/dropdown-list'
// import { SelectableItemComponentProps } from '~/ui/list'
import Dropdown from '~/ui/new-dropdown'
import TextInput, { TextInputProps } from '~/ui/text-input/ui/text-input'

// import TextInput from '~/ui/text-input/ui/text-input'

interface User {
  id: string
  username: string
  sex: string
}

const data: User[] = [
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
  const listStateRef = useRef<ListState<User>>(null)
  const value = checked[0] || ''
  const item = listStateRef.current?.map.get(value)?.item

  console.log('checked', item)
  console.log('value', value)

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
          <Dropdown<TextInputProps, DropdownListProps<User, DropdownItemProps<User, unknown>>>
            value={item?.username}
            renderInput={TextInput}
            renderList={DropdownList}
            listProps={{
              getItemKey: (item) => item.username,
              data,
              selected,
              checked,
              stateRef: listStateRef,
              renderItem: DropdownItem,
              onSelectOne: (k) => setSelected([k]),
              onUnselectOne: () => setSelected([]),
              onCheckOne: (key) => setChecked(() => [key]),
            }}
          />
        </div>
      </div>
    </main>
  )
}
