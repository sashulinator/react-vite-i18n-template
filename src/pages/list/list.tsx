// import List, { top } from '~/ui/List'
import { useState } from 'react'

import List, { GetItemProps } from '~/ui/list'
import { SetterOrUpdater } from '~/utils/core'

export default function ListPage(): JSX.Element {
  const [selected, setSelected] = useState<string>('none')
  const data = ['первоеСлово', 'второеСлово', 'третье', 'четвертое', 'шестое']

  return (
    <main className='pt-5rem'>
      <div
        // ref={setContainerEl}
        className='bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)', position: 'relative' }}
      >
        <h2 className='mb-2rem'>List</h2>
        <label htmlFor='none'>Selected</label>
        <pre>{selected}</pre>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Default
          </label>
          <div>
            <List
              data={data}
              getItemProps={getItemProps}
              payload={{
                setSelected,
                selected,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

interface Payload {
  setSelected: SetterOrUpdater<string>
  selected: string
}

const getItemProps: GetItemProps<string, Payload> = (props) => {
  return {
    key: props.item,
    // 'aria-disabled': true,
    role: 'button',
    style: { padding: '8px' },
    onKeyDown: (e) => {
      if (e.key === 'Enter') {
        props.payload.setSelected(props.item)
      }
    },
    onClick: () => {
      props.payload.setSelected(props.item)
    },
    children: props.item,
  }
}
