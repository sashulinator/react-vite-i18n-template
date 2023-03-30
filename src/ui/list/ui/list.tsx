import c from 'clsx'
import React, { Ref, useRef } from 'react'

import { setRefs } from '~/utils/react/set-refs'

export interface ListProps<T, P> {
  rootProps?: (React.HTMLAttributes<HTMLUListElement> & { ref?: Ref<HTMLUListElement> }) | undefined
  payload?: P | undefined
  data?: T[] | undefined
  onItemRender: (item: T, i: number, data: T[], payload: P | undefined) => JSX.Element
}

export default function List<T, P>(props: ListProps<T, P>): JSX.Element {
  const ref = useRef<HTMLUListElement>(null)

  return (
    <ul
      ref={setRefs(ref, props.rootProps?.ref)}
      {...props.rootProps}
      className={c('ui-List', props.rootProps?.className)}
    >
      {props.data?.map((...args) => props.onItemRender(...args, props?.payload))}
    </ul>
  )
}

List.displayName = 'List'
