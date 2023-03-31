import { isElement } from './is/element'

export function getSiblingElement(el: HTMLElement, which: 'next' | 'previous'): HTMLElement | null {
  let next: ChildNode | null = el.nextSibling
  do {
    next = el[`${which}Sibling`]
  } while (next !== null && !isElement(next))
  return next as HTMLElement | null
}
