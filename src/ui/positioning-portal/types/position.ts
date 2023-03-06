export interface PositionProps {
  relativeElement: Element
  rootElement: HTMLElement
  containerElement: HTMLElement
  containerRect: DOMRect
  relativeRect: DOMRect
  rootRect: DOMRect
  scrollLeft: number
  scrollTop: number
}

export type Position = (props: PositionProps) => void
