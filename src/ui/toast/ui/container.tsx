import './container.css'

import ToastLandscape from './toast.landscape'
import ToastPortrait from './toast.portrait'
import { useEffect, useMemo } from 'react'

import { changeContainer } from '@/packages/toast'
import { add, get } from '@/packages/toast/container/actions'
import { ContainerEventNames } from '@/packages/toast/container/event-names'
import { ToastEventNames } from '@/packages/toast/toast/event-names'
import { useForceUpdate, useOnMount } from '@/utils/hooks'
import { useMediaQuery } from '@/utils/hooks/media-query'
import { useOnUnmount } from '@/utils/hooks/on-unmount'

export default function ToastContainer(): JSX.Element {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const id = useMemo(() => add({ max: isPortrait ? 1 : 3 }).id, [])
  const container = get(id)
  let toastIds = [...container.toastIds].reverse()
  toastIds = isPortrait ? toastIds.slice(0, 1) : toastIds
  const update = useForceUpdate()

  useOnMount(() => {
    container.emitter.on(ContainerEventNames.addedToast, update)
    container.emitter.on(ContainerEventNames.removedToast, update)
  })
  useOnUnmount(() => container.emitter.emit(ToastEventNames.unmount))

  useEffect(() => {
    changeContainer({ id, max: isPortrait ? 1 : 3 })
  }, [isPortrait])

  return (
    <aside
      className='ToastContainer'
      style={{
        position: 'fixed',
        zIndex: 500,
        bottom: isPortrait ? undefined : 0,
        top: isPortrait ? 0 : undefined,
        width: '100%',
      }}
    >
      {toastIds.map((id) => (isPortrait ? <ToastPortrait key={id} id={id} /> : <ToastLandscape key={id} id={id} />))}
    </aside>
  )
}
