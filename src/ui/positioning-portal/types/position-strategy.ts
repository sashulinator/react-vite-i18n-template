export interface PositionStrategyProps {
  relativeElement: Element
  rootElement: HTMLElement
  containerElement: HTMLElement
  containerRect: DOMRect
  relativeRect: DOMRect
  rootRect: DOMRect
  scrollableParents: (HTMLElement | Window)[]
}

export type PositionStrategy = (props: PositionStrategyProps) => void
