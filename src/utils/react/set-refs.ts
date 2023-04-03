import type { ForwardedRef } from 'react'

/**
 * Useful when passing refs from outside, but want to handle internal ref.
 * Keeps passed refs in sync, by creating ref callback
 * @param refs
 * @example
 * <div ref={setRefs(ref, divRef)} />
 */
export function setRefs<T>(...refs: (ForwardedRef<T> | undefined)[]): (instance: T | null) => void {
  return (instance) => {
    refs.forEach((someRef) => setRef(instance, someRef))
  }
}

export function setRef<T>(instance: T | null, ref: ForwardedRef<T> | undefined) {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(instance)
  } else {
    ref.current = instance
  }
}
