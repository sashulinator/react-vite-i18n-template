import { a, useSpring } from '@react-spring/web'

import { hideToast } from '../api/toast'
import { getContainer } from '../model/container-actions'
import { continueToastTransition, stopToastTransition } from '../model/toast-actions'
import { EventNames } from '../types/event-names'
import { Toast } from '../types/toast'
import useMeasure from 'react-use-measure'

import CloseIcon from '@/ui/icon/close'
import { useForceUpdate, useOnMount } from '@/utils/hooks'

function getStyles(type) {
  if (type === 'error') {
    return {
      backgroundColor: '#ff8080',
      color: 'white',
    }
  } else if (type === 'warning') {
    return {
      backgroundColor: '#e79c38',
      color: 'white',
    }
  } else if (type === 'success') {
    return {
      backgroundColor: '#3da638',
      color: 'white',
    }
  }
  return {
    backgroundColor: 'white',
    color: 'black',
  }
}

export default function ToastUI(props: Toast): JSX.Element {
  const container = getContainer(props.toasterId)
  const isExpanded = !container.exiting.includes(props.id)
  const toastWidth = 450
  const update = useForceUpdate()

  function updateOnEvent(toast) {
    if (toast?.id === props.id) {
      setTimeout(update)
    }
  }

  useOnMount(() => {
    getContainer(props.toasterId).emitter.on(EventNames.showToast, updateOnEvent)
    getContainer(props.toasterId).emitter.on(EventNames.hideToast, updateOnEvent)
  })

  const [ref, measure] = useMeasure()
  const toastHeight = measure.height ?? 0

  const { height, x, y } = useSpring({
    config: { duration: isExpanded ? props.enteringAnimationMs : props.exitingAnimationMs },
    from: { height: toastHeight, x: -toastWidth, y: 0 },
    to: {
      height: isExpanded ? toastHeight : 0,
      y: isExpanded ? 0 : toastHeight * 3,
      x: 0,
    },
  })

  return (
    <a.div style={{ height, y, display: 'flex', alignItems: 'end' }}>
      <a.div
        ref={ref}
        style={{
          x,
          width: toastWidth,
          paddingBottom: '0.8rem',
          paddingLeft: '0.8rem',
        }}
      >
        {/*eslint-disable-next-line jsx-a11y/mouse-events-have-key-events*/}
        <div
          role='alert'
          onMouseOver={() => stopToastTransition(props)}
          onMouseLeave={() => continueToastTransition(props)}
          style={{
            padding: '1.3rem',
            borderRadius: '4px',
            position: 'relative',
            ...getStyles(props.type),
          }}
        >
          {props.data as string}
          <CloseIcon
            onClick={() => hideToast(props)}
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              fill: 'white',
              cursor: 'pointer',
            }}
          />
        </div>
      </a.div>
    </a.div>
  )
}
