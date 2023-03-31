import './selectable-list.css'

import c from 'clsx'
import { ForwardedRef, Ref, createElement, useEffect, useRef } from 'react'

import { getFocusableSiblingElement } from '~/utils/dom/get-focusable-sibling-element'
import { setRef, setRefs } from '~/utils/react'

import List, { ListProps } from '../../list/ui/list'

// import getItemPropsInterceptor from './get-item-interceptor'

export interface ListActions {
  focusFirst?: () => void
  focusLast?: () => void
  focusSelected?: (() => void) | null
}

export interface SelectableItemComponentProps<T, P> {
  item: T
  index: number
  data: T[]
  payload: P
  itemKey: string | number
  listProps: SelectableListProps<T, P> & { originRenderItem: SelectableItemComponent<T, P> }
  rootProps: {
    className: string
    role: 'button'
    tabIndex: 0
    'aria-selected': boolean
    'data-selectable': true
    onClick: (e: React.MouseEvent) => void
    onKeyDown: (e: React.KeyboardEvent) => void
    onMouseOver: (e: React.MouseEvent) => void
    ref: Ref<any>
  }
}

export type SelectableItemComponent<T, P> = (props: SelectableItemComponentProps<T, P>) => JSX.Element | null

export interface SelectableListProps<T, P> extends Omit<ListProps<T, P>, 'renderItem'> {
  selectedKey: string | number | undefined
  actionRef?: { current: ListActions | null }
  selectedElementRef?: ForwardedRef<HTMLElement | null>
  firstElementRef?: ForwardedRef<HTMLElement | null>
  lastElementRef?: ForwardedRef<HTMLElement | null>
  setSelected: (item: T) => void
  renderItem: SelectableItemComponent<T, P>
}

export default function SelectableList<T, P>(props: SelectableListProps<T, P>): JSX.Element {
  const newProps = { originRenderItem: props.renderItem, ...props }

  useEffect(() => {
    if (props.selectedKey === undefined && props.selectedElementRef) {
      setRef(props.selectedElementRef, null)
    }
  }, [props.selectedKey])

  return (
    <List
      {...newProps}
      rootProps={{ ...props.rootProps, className: c('ui-SelectableList', props.rootProps?.className) }}
      renderItem={Item as any}
    />
  )
}

function Item<T, P>(props: SelectableItemComponentProps<T, P>) {
  const isSelected = props.itemKey === props.listProps.selectedKey
  const isFirst = props.index === 0
  const isLast = props.index === props.data.length - 1
  const ref = useRef<HTMLElement>(null)

  return createElement(props?.listProps.originRenderItem, {
    ...props,
    key: props.itemKey,
    rootProps: {
      ref: setRefs(
        ref,
        isSelected ? props.listProps.selectedElementRef : undefined,
        isFirst ? props.listProps.firstElementRef : undefined,
        isLast ? props.listProps.lastElementRef : undefined
      ),
      'data-selectable': true,
      role: 'button',
      tabIndex: 0,
      className: c('ui-SelectableList_item', props.rootProps.className),
      'aria-selected': isSelected,
      onClick: () => props.listProps.setSelected(props.item),
      onMouseOver: () => ref.current?.focus(),
      onKeyDown: (e) => {
        if (e.key === 'Enter') {
          props.listProps.setSelected(props.item)
        }
        if (ref.current && e.key === 'ArrowDown') {
          getFocusableSiblingElement(ref.current, 'next')?.focus()
        }
        if (ref.current && e.key === 'ArrowUp') {
          getFocusableSiblingElement(ref.current, 'previous')?.focus()
        }
      },
    },
  })
}

// function getItemInterceptor<T, P>(props: GetItemInterceptorProps<T, P>): JSX.Element {
//   const { getItem, ...restProps } = props
//   const isSelected = props.key === props.selectedKey
//   const ref: { current: HTMLLIElement | null } = { current: null }

//   const itemProps = getItem(restProps)

//   if (props.actionRef) {
//     props.actionRef.current = props.actionRef.current === null ? {} : props.actionRef.current

//     if (props.index === 0) {
//       props.actionRef.current.focusFirst = () => ref.current?.focus()
//     }
//     if (props.index === props.data.length - 1) {
//       props.actionRef.current.focusLast = () => ref.current?.focus()
//     }
//     if (isSelected) {
//       props.actionRef.current.focusSelected = () => ref.current?.focus()
//     }
//     if (!props.selectedKey) {
//       props.actionRef.current.focusSelected = null
//     }
//   }

//   return {
//     ref,
//     role: 'button',
//     tabIndex: 0,
//     'aria-selected': isSelected,
//     onClick: () => props.setSelected(props.item),
//     onKeyDown: (e) => {
//       if (e.key === 'Enter') {
//         props.setSelected(props.item)
//       }
//       if (ref.current && e.key === 'ArrowDown') {
//         console.log(ref.current.nextSibling)

//         getFocusableSiblingElement(ref.current, 'next')?.focus()
//       }
//       if (ref.current && e.key === 'ArrowUp') {
//         console.log(ref.current.previousSibling)

//         getFocusableSiblingElement(ref.current, 'previous')?.focus()
//       }
//     },
//     ...itemProps,
//     className: c('ui-SelectableList_item', itemProps.className),
//   }
// }
