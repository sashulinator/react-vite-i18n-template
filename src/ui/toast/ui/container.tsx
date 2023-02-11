import './container.scss'

import { backgroundColors } from '../constants/background-colors'
import { getDefaultThemeColor } from '../lib/get-default-theme-color'
import { useColorifyBrowser } from '../lib/use-colorify-browser'
import Toast from './toast'
import { useEffect, useMemo } from 'react'

import { findToast } from '@/packages/toast'
import { add, get } from '@/packages/toast/container/actions'
import { ContainerEventNames } from '@/packages/toast/container/event-names'
import { ToastEventNames } from '@/packages/toast/toast/event-names'
import { useForceUpdate, useOnMount } from '@/utils/hooks'
import { useMediaQuery } from '@/utils/hooks/media-query'
import { useOnUnmount } from '@/utils/hooks/on-unmount'

export default function ToastContainer(): JSX.Element {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const id = useMemo(() => add({ id: 1 }).id, [])
  const container = get(id)
  const toastIds = [...container.toastIds].reverse()
  const update = useForceUpdate()

  useColorifyBrowser(
    backgroundColors[findToast(toastIds[0])?.type] || getDefaultThemeColor(),
    backgroundColors[findToast(toastIds[1])?.type]
  )
  useOnMount(() => {
    container.emitter.on(ContainerEventNames.addedToast, update)
    container.emitter.on(ContainerEventNames.removedToast, update)
  })
  useOnUnmount(() => container.emitter.emit(ToastEventNames.unmount))

  useEffect(() => container.emitter.emit(ContainerEventNames.change, { id, max: isPortrait ? 1 : 3 }), [isPortrait])

  return (
    <aside
      data-x='ToastContainer'
      style={{
        position: 'fixed',
        zIndex: 500,
        bottom: isPortrait ? undefined : 0,
        top: isPortrait ? 0 : undefined,
        width: '100%',
      }}
    >
      {toastIds.map((id) => (
        <Toast key={id} id={id} isPortrait={isPortrait} />
      ))}
    </aside>
  )
}
