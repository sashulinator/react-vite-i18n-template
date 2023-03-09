import { alignElement, alignPoint } from 'dom-align'
import contains from 'rc-util/lib/Dom/contains'
import isVisible from 'rc-util/lib/Dom/isVisible'

import { DOMAlign } from '../types/dom-align'
import { DOMAlignResult } from '../types/dom-align-result'
import { TargetPoint } from '../types/target'

export function align(
  childEl: HTMLElement,
  targetElement: HTMLElement | null,
  targetPoint: TargetPoint | null,
  align: DOMAlign
): DOMAlignResult | undefined {
  // IE lose focus after element realign
  // We should record activeElement and restore later
  const { activeElement } = document

  let ret: DOMAlignResult | undefined
  // We only align when element is visible
  if (targetElement && isVisible(targetElement)) {
    ret = alignElement(childEl, targetElement, align)
  } else if (targetPoint) {
    ret = alignPoint(childEl, targetPoint, align)
  }

  if (activeElement !== document.activeElement && contains(activeElement, childEl)) {
    ;(activeElement as any).focus?.()
  }

  return ret
}
