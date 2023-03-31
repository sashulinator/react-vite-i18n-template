import { getSiblingElement } from './get-sibling-element'
import { isElementFocusable } from './is/is-element-focusable'

export function getFocusableSiblingElement(el: HTMLElement, which: 'next' | 'previous'): HTMLElement | null {
  let next: HTMLElement | null = el
  do {
    next = getSiblingElement(el, which)
  } while (next !== null && !isElementFocusable(next))
  return next
}
