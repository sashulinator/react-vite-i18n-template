export interface ListProps {
  isOpen: boolean
  inputElement: HTMLInputElement
  isFocused: boolean
  isFirstSelected: boolean
  searchQuery: string
  setOpen: (b: boolean) => void
}

export type OnListRender<P> = (props: ListProps & P) => JSX.Element | null
