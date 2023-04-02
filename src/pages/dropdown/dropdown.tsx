import React, { useState } from 'react'

// import DropdownList from '~/ui/dropdown-list/ui/dropdown-list'
// import { SelectableItemComponentProps } from '~/ui/list'
import Dropdown from '~/ui/new-dropdown'

// import TextInput from '~/ui/text-input/ui/text-input'

interface DropdownItem {
  id: string
  username: string
  sex: string
}

const data: DropdownItem[] = [
  {
    id: '1',
    username: 'vasya',
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
]

export default function DropdownPage(): JSX.Element {
  const [selectedItem] = useState<DropdownItem | null>(null)
  console.log('data', data)

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
          <Dropdown value={selectedItem?.username} onInputRender={'input'} />
        </div>
      </div>
    </main>
  )
}

// function Item(props: SelectableItemComponentProps<DropdownItem, undefined>) {
//   return (
//     <li {...props.rootProps} key={props.itemKey} style={{ padding: '12px' }}>
//       {props.item.username}
//     </li>
//   )
// }
