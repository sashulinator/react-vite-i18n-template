// import List, { top } from '~/ui/List'
import { useState } from 'react'

import { SelectableItemComponentProps, SelectableList } from '~/ui/list'
import List, { EventNames, ItemProps } from '~/ui/new-list'
import { isElement } from '~/utils/dom'
import { isHTMLElement } from '~/utils/dom/is/is-htmlelement'

export default function ListPage(): JSX.Element {
  const [selectedKey, setSelectedKey] = useState<string | number>('none')
  const data = ['первоеСлово', 'второеСлово', 'третье', 'четвертое', 'шестое']
  // const [selected, setSelected] = useState<(string | number)[]>([])
  // const [focused, setFocused] = useState<string | number | null>(null)

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
              // selected={selected}
              // focused={focused}
              // onSelect={setSelected}
              // onFocus={setFocused}
              data={data}
              payload={undefined}
              getKey={(k) => k}
              renderItem={Item}
            />
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

function Item(props: ItemProps<string, undefined>) {
  const isSelected = props.selected === props.itemKey
  const isChecked = props.checked.includes(props.itemKey)

  function select() {
    props.mitt.emit(EventNames.select, props.itemKey)
  }
  function unselect() {
    props.mitt.emit(EventNames.unselect)
  }
  function toggle() {
    if (isChecked) {
      props.mitt.emit(EventNames.removeChecked, props.itemKey)
    } else {
      props.mitt.emit(EventNames.addChecked, props.itemKey)
    }
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      toggle()
    }
    if (e.key === 'ArrowDown') {
      props.mitt.emit(EventNames.selectNext)
      if (isElement(e.target) && isHTMLElement(e.target.nextElementSibling)) {
        e.target.nextElementSibling?.focus()
      }
    }
    if (e.key === 'ArrowUp') {
      props.mitt.emit(EventNames.selectPrevious)
      if (isElement(e.target) && isHTMLElement(e.target.previousElementSibling)) {
        e.target.previousElementSibling?.focus()
      }
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onClick={toggle}
      onKeyDown={onKeyDown}
      onMouseOver={select}
      onMouseLeave={unselect}
      onBlur={unselect}
      onFocus={select}
      style={{ backgroundColor: isSelected ? 'black' : isChecked ? 'green' : undefined }}
    >
      {props.item}
    </li>
  )
}

function SelectableItem(props: SelectableItemComponentProps<string, undefined>) {
  return <li {...props.rootProps}>{props.item}</li>
}
