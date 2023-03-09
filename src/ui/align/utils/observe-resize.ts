interface Size {
  height: number
  width: number
}

export function observeResize(element: HTMLElement | null | undefined, callback: (p: Size) => void) {
  let prevWidth: number | null = null
  let prevHeight: number | null = null

  function onResize([{ target }]: ResizeObserverEntry[]) {
    if (!document.documentElement.contains(target)) return
    const { width, height } = target.getBoundingClientRect()
    const fixedWidth = Math.floor(width)
    const fixedHeight = Math.floor(height)

    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      // https://webkit.org/blog/9997/resizeobserver-in-webkit/
      Promise.resolve().then(() => {
        callback({ width: fixedWidth, height: fixedHeight })
      })
    }

    prevWidth = fixedWidth
    prevHeight = fixedHeight
  }

  const resizeObserver = new ResizeObserver(onResize)
  if (element) {
    resizeObserver.observe(element)
  }

  return () => {
    resizeObserver.disconnect()
  }
}
