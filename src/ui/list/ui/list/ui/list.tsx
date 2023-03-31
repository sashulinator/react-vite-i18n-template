import './list.css'

import c from 'clsx'
import React, { Ref } from 'react'

export interface ItemComponentProps<T, P> {
  item: T
  index: number
  data: T[]
  payload: P
  itemKey: string | number
  listProps: ListProps<T, P>
  rootProps: {
    className: string
  }
}

export type ItemComponent<T, P> = (props: ItemComponentProps<T, P>) => JSX.Element | null

export interface ListProps<T, P> {
  rootProps?: (React.HTMLAttributes<HTMLUListElement> & { ref?: Ref<HTMLUListElement> }) | undefined
  payload: P
  data?: T[] | undefined
  getKey: (item: T) => string | number
  renderItem: ItemComponent<T, P>
}

export default function List<T, P>(props: ListProps<T, P>): JSX.Element {
  const { payload } = props

  return (
    <ul {...props.rootProps} className={c('ui-List', props.rootProps?.className)}>
      {props.data?.map((item, index, data) => {
        const itemKey = props.getKey(item)
        const itemElement = React.createElement(props.renderItem, {
          key: itemKey,
          item,
          itemKey,
          index,
          data,
          payload,
          listProps: props,
          rootProps: {
            className: 'ui-List_item',
          },
        })

        if (itemElement === null) {
          return null
        }

        return itemElement
      })}
    </ul>
  )
}

List.displayName = 'List'
