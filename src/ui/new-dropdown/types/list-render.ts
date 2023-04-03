export type Actions = {
  focus: () => void
}

export interface ListProps {
  isOpen: boolean
  inputElement: HTMLInputElement
  isFocused: boolean
  isFirstSelected: boolean
  onChecked: () => void
}

export type OnListRender<P> = (props: ListProps & P) => JSX.Element | null
