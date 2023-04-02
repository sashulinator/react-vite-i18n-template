import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useControlledState<T>(
  defaulValue: T,
  incomingValue: T | undefined,
  setIncomingValue: ((v: T) => void) | undefined
): [T, Dispatch<SetStateAction<T>>] {
  const isUncontrolled = incomingValue === undefined

  const [value, setValue] = useState(incomingValue ?? defaulValue)

  useEffect(() => {
    if (value !== incomingValue) {
      if (incomingValue) {
        setValue(incomingValue)
      } else {
        setValue(value)
      }
    }
  })

  return isUncontrolled ? [value, setValue] : ([incomingValue, setIncomingValue] as [T, Dispatch<SetStateAction<T>>])
}
