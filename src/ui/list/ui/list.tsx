import './list.css'

import c from 'clsx'
import React, { Key, Ref } from 'react'

export type GetItemProps<T, P> = (props: {
  item: T
  index: number
  data: T[]
  payload: P
}) => React.HTMLAttributes<HTMLLIElement> & { key: Key }

export interface ListProps<T, P> {
  rootProps?: (React.HTMLAttributes<HTMLUListElement> & { ref?: Ref<HTMLUListElement> }) | undefined
  payload: P
  data?: T[] | undefined
  getItemProps: GetItemProps<T, P>
}

export default function List<T, P>(props: ListProps<T, P>): JSX.Element {
  const { payload } = props

  return (
    <ul {...props.rootProps} className={c('ui-List', props.rootProps?.className)}>
      {props.data?.map((item, index, data) => {
        const itemProps = props.getItemProps({ item, index, data, payload })
        // eslint-disable-next-line react/jsx-key
        return <li {...itemProps} className={c('ui-List_item', itemProps.className)} />
      })}
    </ul>
  )
}

List.displayName = 'List'
