// import List, { top } from '~/ui/List'
import { useMemo, useState } from 'react'

import { User, groupedUserList, userList } from '~/mocks/user-list'
import List, { EventNames, ItemProps } from '~/ui/list'
import { getNext, getPrevious } from '~/ui/list/lib/get-sibling'

export default function ListPage(): JSX.Element {
  const [singleChecked, setSingleChecked] = useState<(string | number)[]>([])
  const [singleSelected, setSingleSelected] = useState<(string | number)[]>([])
  const [multiChecked, setMultiChecked] = useState<(string | number)[]>([])
  const [multiSelected, setMultiSelected] = useState<(string | number)[]>([])
  const [groupedSelected, setGroupedSelected] = useState<(string | number)[]>([])
  const [groupedChecked, setGroupedChecked] = useState<(string | number)[]>([])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredUserList = useMemo(
    () =>
      userList.filter((u) => {
        return new RegExp(searchQuery, 'gi').test(u.username)
      }),
    [searchQuery]
  )
  const filteredGroupedUserList = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => groupedUserList.filter((u) => new RegExp(searchQuery, 'gi').test((u as any).username)),
    [searchQuery]
  )

  return (
    <main className='pt-5rem'>
      <div
        // ref={setContainerEl}
        className='bg-secondary p-2.5em mt-2.5rem mr-2rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)', position: 'relative' }}
      >
        <h2 className='mb-2rem'>List</h2>

        <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />

        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Single check/select list
          </label>
          <div>
            <List
              data={filteredUserList}
              selected={singleSelected}
              checked={singleChecked}
              onUncheckOne={() => setSingleChecked([])}
              onCheckOne={(key) => setSingleChecked([key])}
              onSelectOne={(key) => setSingleSelected([key])}
              onUnselectOne={() => setSingleSelected([])}
              getItemKey={(item) => item.username}
              renderItem={SingleSelectItem}
            />
          </div>
        </div>

        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Multi check/select list
          </label>
          <div>
            <List
              data={filteredUserList}
              selected={multiSelected}
              checked={multiChecked}
              onCheck={setMultiChecked}
              onSelect={setMultiSelected}
              getItemKey={(item) => item.username}
              renderItem={MultiSelectItem}
            />
          </div>
        </div>

        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Grouped list
          </label>
          <div>
            <List
              data={filteredGroupedUserList as User[]}
              selected={groupedSelected}
              checked={groupedChecked}
              isSelectable={(item) => Boolean(item.id)}
              onUncheckOne={() => setGroupedChecked([])}
              onCheckOne={(key) => setGroupedChecked([key])}
              onSelectOne={(key) => setGroupedSelected([key])}
              onUnselectOne={() => setGroupedSelected([])}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getItemKey={(item) => item.username || (item as any).group}
              renderItem={GroupedItem}
            />
          </div>
        </div>
        {/** */}
      </div>
    </main>
  )
}

function GroupedItem(props: ItemProps<User, undefined>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((props.item as any).group) {
    return (
      <div style={{ padding: '8px' }}>
        <b>
          {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <pre>Group: {(props.item as any).group}</pre>
        </b>
      </div>
    )
  }
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
    const next = getNext(selected, props.map, props.isSelectable)
    if (next === null) return
    props.mitt.emit(EventNames.focus, next.itemKey)
    props.mitt.emit(EventNames.setSelected, [next.itemKey])
  }
  function selectPrevious() {
    const previous = getPrevious(selected, props.map, props.isSelectable)
    if (previous === null) return
    props.mitt.emit(EventNames.focus, previous.itemKey)
    props.mitt.emit(EventNames.setSelected, [previous.itemKey])
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      toggle()
    }

    if (e.key === 'ArrowUp') {
      selectPrevious()
    }
    if (e.key === 'ArrowDown') {
      selectNext()
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

function SingleSelectItem(props: ItemProps<User, undefined>) {
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

function MultiSelectItem(props: ItemProps<User, undefined>) {
  const isSelected = props.selected.includes(props.itemKey)
  const isChecked = props.checked.includes(props.itemKey)

  function select() {
    props.mitt.emit(EventNames.selectOne, props.itemKey)
  }
  function unselect() {
    // props.mitt.emit(EventNames.unselectOne, props.itemKey)
  }
  function toggle() {
    if (isChecked) {
      props.mitt.emit(EventNames.uncheckOne, props.itemKey)
    } else {
      props.mitt.emit(EventNames.checkOne, props.itemKey)
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
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
      onMouseOver={select}
      onMouseLeave={unselect}
      onBlur={unselect}
      onFocus={select}
      style={{ backgroundColor: isChecked ? 'black' : isSelected ? 'green' : undefined }}
    >
      {props.item.username}
    </li>
  )
}
