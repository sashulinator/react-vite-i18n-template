import { SetterOrUpdater } from '~/utils/core'

export interface ListProps {
  isOpen: boolean
  inputElement: HTMLInputElement
  searchQuery: string
  filter?: (...args: unknown[]) => unknown
  setOpen: SetterOrUpdater<boolean>
}

export type OnListRender<P> = (props: ListProps & P) => JSX.Element | null
