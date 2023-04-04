import './item.css'

import clsx from 'clsx'

import { ItemProps, MapItem } from '~/ui/list'

export interface DropdownItemProps<T> {
  onKeyDown?: (mapItem: MapItem<T>) => (e: React.KeyboardEvent) => void
  children: React.ReactNode
}

export function DropdownListItem<T>(props: ItemProps<T, DropdownItemProps<T>>) {
  const isChecked = props.checked.includes(props.itemKey)
  const isSelected = props.selected.includes(props.itemKey)

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={-1}
      className={clsx('ui-DropdownListItem')}
      data-selected={isSelected}
      data-checked={isChecked}
      ref={props.setElementRef}
      // onKeyDown={props.itemProps?.onKeyDown?.(props.map)}
      // onClick={toggle}
      // onKeyDown={onKeyDown}
      // onMouseOver={select}
      // onMouseLeave={unselect}
      // onBlur={unselect}
      // onFocus={select}
    >
      {props.itemProps?.children}
    </li>
  )
}
