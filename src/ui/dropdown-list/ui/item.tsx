import './item.css'

import { ItemProps } from '~/ui/list'
import { ControllableItemProps } from '~/ui/list/ui/controlled-list'

export type DropdownItemProps<T, P> = ItemProps<T, P & ControllableItemProps>

export default function DropdownListItem<T, P>(props: ItemProps<T, P & ControllableItemProps>) {
  const selected = props.selected[0]
  const isSelected = props.itemKey === selected
  const isChecked = props.checked.includes(props.itemKey)

  return (
    <li
      ref={props.setElementRef}
      {...props.itemProps?.controlProps}
      style={{ backgroundColor: isSelected ? 'black' : isChecked ? 'green' : undefined }}
    >
      {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
      {(props.item as any).username}
    </li>
  )
}
