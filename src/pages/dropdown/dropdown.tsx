import { useState } from 'react'

import Dropdown from '~/ui/dropdown'
import { SelectableItemComponentProps } from '~/ui/list'

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
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null)
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
            renderItem={Item}
            getKey={(item) => item.id}
            filter={(item, query) => new RegExp(query, 'ig').test(item.username)}
            payload={undefined}
            setSelected={(item) => setSelectedItem(item)}
            selectedKey={selectedItem?.id}
            data={data}
            inputValue={selectedItem?.username}
          />
        </div>
      </div>
    </main>
  )
}

function Item(props: SelectableItemComponentProps<DropdownItem, undefined>) {
  return (
    <li {...props.rootProps} key={props.itemKey} style={{ padding: '12px' }}>
      {props.item.username}
    </li>
  )
}
