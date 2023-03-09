import { Target } from '../types/target'

export function getElement(func: Target): HTMLElement | null {
  if (typeof func !== 'function') return null
  return func()
}
