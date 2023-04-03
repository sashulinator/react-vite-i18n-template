import './item.css'

import clsx from 'clsx'

import { EventNames, ItemProps } from '~/ui/list'
import { getNext } from '~/ui/list/lib/get-sibling'

export function Item<T>(props: ItemProps<T> & { children: React.ReactNode }) {
  const isChecked = props.checked.includes(props.itemKey)
  const isSelected = props.selected.includes(props.itemKey)

  function select() {
    props.mitt.emit(EventNames.setSelected, [props.itemKey])
  }
  function unselect() {
    // props.mitt.emit(EventNames.unselect)
  }
  function toggle() {
    // if (isChecked) {
    //   props.mitt.emit(EventNames.uncheckOne, props.itemKey)
    // } else {
    //   props.mitt.emit(EventNames.addChecked, props.itemKey)
    // }
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      toggle()
    }
    if (e.key === 'ArrowDown') {
      const next = getNext(props.itemKey, props.map)
      if (next === null) return
      props.mitt.emit(EventNames.setSelected, [next[0]])
    }
    // if (e.key === 'ArrowUp') {
    //   props.mitt.emit(EventNames.selectPrevious)
    //   if (isElement(e.target) && isHTMLElement(e.target.previousElementSibling)) {
    //     e.target.previousElementSibling?.focus()
    //   }
    // }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={clsx('ui-DropdownListItem')}
      data-selected={isSelected}
      data-checked={isChecked}
      onClick={toggle}
      onKeyDown={onKeyDown}
      onMouseOver={select}
      onMouseLeave={unselect}
      onBlur={unselect}
      onFocus={select}
    >
      {props.children}
    </li>
  )
}
