// import List, { top } from '~/ui/List'
import { useState } from 'react'

import { ItemComponentProps, List, SelectableItemComponentProps, SelectableList } from '~/ui/list'

export default function ListPage(): JSX.Element {
  const [selectedKey, setSelectedKey] = useState<string | number>('none')
  const data = ['первоеСлово', 'второеСлово', 'третье', 'четвертое', 'шестое']

  return (
    <main className='pt-5rem'>
      <div
        // ref={setContainerEl}
        className='bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)', position: 'relative' }}
      >
        <h2 className='mb-2rem'>List</h2>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            List
          </label>
          <div>
            <List data={data} payload={undefined} getKey={(k) => k} renderItem={Item} />
          </div>
        </div>
        <h2 className='mb-2rem'>List</h2>
        <label htmlFor='none'>Selected</label>
        <pre>{selectedKey}</pre>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            SelectableList
          </label>
          <div>
            <SelectableList
              data={data}
              payload={undefined}
              getKey={(k) => k}
              renderItem={SelectableItem}
              selectedKey={selectedKey}
              setSelected={setSelectedKey}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

// interface Payload {
//   setSelected: SetterOrUpdater<string>
//   selected: string
// }

function Item(props: ItemComponentProps<string, undefined>) {
  return <li {...props.rootProps}>{props.item}</li>
}

function SelectableItem(props: SelectableItemComponentProps<string, undefined>) {
  return <li {...props.rootProps}>{props.item}</li>
}
