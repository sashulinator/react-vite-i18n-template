import { addToaster, getToaster } from '../model/store'
import { EventNames } from '../types/event-names'
import c from 'clsx'
import { useMemo } from 'react'

import { useForceUpdate, useOnMount } from '@/utils/hooks'
import { useOnUnmount } from '@/utils/hooks/on-unmount'

export interface TosterProps {
  className?: string
}

export default function Toster(props: TosterProps): JSX.Element {
  const id = useMemo(() => addToaster().id, [])
  const update = useForceUpdate()

  useOnMount(() => {
    getToaster(id).emitter.emit(EventNames.onMount)
    getToaster(id).emitter.on('*', (eventName) => {
      if (eventName !== EventNames.onUnmount) {
        setTimeout(update)
      }
    })
  })
  useOnUnmount(() => getToaster(id).emitter.emit(EventNames.onUnmount))

  return <aside className={c('Toster', props.className)}>Toster</aside>
}
