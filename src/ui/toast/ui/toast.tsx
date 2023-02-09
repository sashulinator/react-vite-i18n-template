import './toast.scss'

import { backgroundColors } from '../constants/background-colors'
import LandscapeAnimation from './landscape-animation'
import PortraitAnimation from './portrait-animation'

import { continueShowingTransition, get, stopShowingTransition } from '@/packages/toast/toast/actions'
import { ToastEventNames } from '@/packages/toast/toast/event-names'
import { Id } from '@/utils/any/id'
import { useForceUpdate, useOnMount } from '@/utils/hooks'

export default function Toast(props: { id: Id; isPortrait: boolean }): JSX.Element {
  const toast = get(props.id)
  const backgroundColor: string = backgroundColors[toast.type]
  const ToastAnimation = props.isPortrait ? PortraitAnimation : LandscapeAnimation
  const update = useForceUpdate()

  useOnMount(subscribeOnChanges)

  return (
    <ToastAnimation toast={toast}>
      {/*eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions*/}
      <div
        data-x='Toast'
        style={{ backgroundColor }}
        onMouseOver={() => stopShowingTransition(toast.id)}
        onMouseLeave={() => continueShowingTransition(toast.id)}
        onClick={() => toast.emitter.emit(ToastEventNames.setExiting)}
      >
        {toast.data as string}
      </div>
    </ToastAnimation>
  )

  // Private

  function subscribeOnChanges() {
    toast.emitter.on(ToastEventNames.setEntering, update)
    toast.emitter.on(ToastEventNames.setShowing, update)
    toast.emitter.on(ToastEventNames.setExiting, update)
  }
}
