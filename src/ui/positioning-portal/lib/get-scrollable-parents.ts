import { isScrollable } from './is-scrollable'

export default function getScrollableParents(
  element: HTMLElement | null | undefined,
  scrollableParents: (HTMLElement | Window)[] = []
): (HTMLElement | Window)[] {
  if (!element || element === document.body) {
    return [...scrollableParents, window]
  }

  const newScrollableParents = isScrollable(element) ? [...scrollableParents, element] : scrollableParents

  return getScrollableParents(element.parentElement, newScrollableParents)
}
