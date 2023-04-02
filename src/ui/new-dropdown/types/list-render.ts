import { RefObject } from 'react'

export type Actions = {
  focus: () => void
}

export interface ListProps {
  isOpen: boolean
  inputElement: HTMLInputElement
  actionsRef: RefObject<Actions> | null
  onChecked: () => void
}

export type OnListRender = (props: ListProps) => JSX.Element | null
