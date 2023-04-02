// import List, { top } from '~/ui/List'
import { useState } from 'react'

import { User, userList } from '~/mocks/user-list'
import List, { EventNames, ItemProps } from '~/ui/list'
import { getNext, getPrevious } from '~/ui/list/lib/get-sibling'

export default function ListPage(): JSX.Element {
  const [checked, setChecked] = useState<(string | number)[]>([])
  const [selected, setSelected] = useState<(string | number)[]>([])

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
            <List
              onUncheckOne={(key) => {
                console.log('onUncheckOne', key)
                setChecked([])
              }}
              onCheckOne={(key) => {
                console.log('onCheckOne')
                setChecked([key])
              }}
              selected={selected}
              onSelectOne={(key) => setSelected([key])}
              onUnselectOne={() => setSelected([])}
              data={userList}
              checked={checked}
              payload={undefined}
              getItemKey={(item) => item.username}
              renderItem={Item}
            />
          </div>
        </div>
        <h2 className='mb-2rem'>List</h2>
        <label htmlFor='none'>Selected</label>
        <pre>{checked}</pre>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            SelectableList
          </label>
        </div>
      </div>
    </main>
  )
}

// interface Payload {
//   setSelected: SetterOrUpdater<string>
//   selected: string
// }

function Item(props: ItemProps<User, undefined>) {
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
      onMouseOver={select}
      onMouseLeave={unselect}
      onBlur={unselect}
      onFocus={select}
      style={{ backgroundColor: isSelected ? 'black' : isChecked ? 'green' : undefined }}
    >
      {props.item.username}
    </li>
  )
}
