export interface PositionStrategyProps {
  targetElement: Element
  targetRect: DOMRect
  rootElement: HTMLElement
  rootRect: DOMRect
  containerElement: HTMLElement
  containerRect: DOMRect
  scrollableParents: (HTMLElement | Window)[]
}

export type PositionStrategy = (props: PositionStrategyProps) => void
