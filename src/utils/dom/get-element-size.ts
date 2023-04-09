import { getBorder } from './get-border'
import { getMargin } from './get-margin'
import { getPadding } from './get-padding'
import { Side } from './types/side'

export function getElementSize(elem: HTMLElement, requestedBoxSizing: 'border-box' | 'content-box') {
  const horizontalSides: Side[] = ['Left', 'Right']
  const verticalSides: Side[] = ['Top', 'Bottom']

  const elRect = elem.getBoundingClientRect()
  const styles = getComputedStyle(elem)
  const elementBoxSizing = styles.boxSizing

  const width = Math.floor(elRect.width)
  const height = Math.floor(elRect.height)

  if (requestedBoxSizing === elementBoxSizing) {
    return { width, height }
  }

  if (requestedBoxSizing === 'content-box' && elementBoxSizing === 'border-box') {
    return {
      width: width - getBorder(styles, horizontalSides) - getPadding(styles, horizontalSides),
      height: height - getBorder(styles, verticalSides) - getPadding(styles, verticalSides),
    }
  }

  // requestedBoxSizing === 'border-box' && elementBoxSizing === 'content-box'
  return {
    width: width + getMargin(styles, horizontalSides),
    height: height + getMargin(styles, verticalSides),
  }
}
