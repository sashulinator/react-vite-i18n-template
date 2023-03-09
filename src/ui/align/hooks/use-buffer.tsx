import React from 'react'

export default function useBuffer(callback: () => void, buffer: number) {
  const calledRef = React.useRef<boolean>(false)
  const timeoutRef = React.useRef<number>(NaN)

  function cancelTrigger() {
    window.clearTimeout(timeoutRef.current)
  }

  function trigger(force?: boolean) {
    cancelTrigger()

    if (!calledRef.current || force === true) {
      callback()
      calledRef.current = true
      timeoutRef.current = window.setTimeout(() => {
        calledRef.current = false
      }, buffer)
    } else {
      timeoutRef.current = window.setTimeout(() => {
        calledRef.current = false
        trigger()
      }, buffer)
    }
  }

  return [
    trigger,
    () => {
      calledRef.current = false
      cancelTrigger()
    },
  ]
}
