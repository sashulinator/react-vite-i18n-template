import { addContainer, getContainer } from '../model/container-actions'
import { EventNames } from '../types/event-names'
import ToastUI from './toast'
import c from 'clsx'
import { useMemo } from 'react'

import { useForceUpdate, useOnMount } from '@/utils/hooks'
import { useOnUnmount } from '@/utils/hooks/on-unmount'

export interface TosterProps {
  className?: string
}

export default function ToasterUI(props: TosterProps): JSX.Element {
  const id = useMemo(() => addContainer().id, [])
  const toaster = getContainer(id)
  const update = useForceUpdate()

  useOnMount(() => {
    getContainer(id).emitter.emit(EventNames.mount)
    getContainer(id).emitter.on(EventNames.addToast, () => setTimeout(update))
    getContainer(id).emitter.on(EventNames.removeToast, () => setTimeout(update))
  })
  useOnUnmount(() => getContainer(id).emitter.emit(EventNames.unmount))

  return (
    <aside className={c('Toster', props.className)} style={{ position: 'fixed', zIndex: 500, bottom: 0 }}>
      {toaster.order
        .map((id) => toaster.data[id])
        .reverse()
        .map((toast) => {
          return <ToastUI key={toast.id} {...toast} />
        })}
    </aside>
  )
}
