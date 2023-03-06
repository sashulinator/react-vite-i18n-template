export function isScrollable(element: HTMLElement): boolean {
  try {
    const { overflow, overflowY, overflowX } = getComputedStyle(element)
    return /(auto|scroll)/.test(overflow + overflowX + overflowY)
  } catch (e) {
    return false
  }
}
