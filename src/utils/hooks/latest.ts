import { MutableRefObject, useRef } from 'react'

/**
 * Хук кеширования последнего значения
 * @param value
 */
export const useLatest = <T>(value: T): MutableRefObject<T | undefined> => {
  const ref = useRef<T>()
  ref.current = value

  return ref
}
