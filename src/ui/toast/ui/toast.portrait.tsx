import { a, useSpring } from '@react-spring/web'

import './toast.portrait.css'

import cl from 'clsx'
import colorTransition from 'color-transitions'
import { useEffect } from 'react'
import useMeasure from 'react-use-measure'

import { continueTransition, get, stopTransition } from '@/packages/toast/toast/actions'
import { ToastEventNames } from '@/packages/toast/toast/event-names'
import { Id } from '@/utils/any/id'
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

export default function ToastPortrait(props: { id: Id }): JSX.Element {
  const toast = get(props.id)
  const isExpanded = !toast.isExiting

  const update = useForceUpdate()

  useOnMount(() => {
    toast.emitter.on(ToastEventNames.setEntering, update)
    toast.emitter.on(ToastEventNames.setShowing, update)
    toast.emitter.on(ToastEventNames.setExiting, update)
  })

  const [ref, measure] = useMeasure()
  const toastHeight = measure.height ?? 0
  const toastWidth = measure.width ?? 0

  const { height, x, y } = useSpring({
    config: { duration: isExpanded ? toast.enteringAnimationMs : toast.exitingAnimationMs },
    from: { height: toastHeight, x: 0, y: -toastHeight },
    to: {
      height: isExpanded ? toastHeight : 0,
      y: isExpanded ? 0 : -toastHeight,
      x: 0,
    },
  })

  useEffect(() => {
    const meta =
      (document.querySelector('head [name="theme-color"]') as HTMLMetaElement) || document.createElement('meta')
    const initColor = meta.content
    const color = getStyles(toast.type).backgroundColor
    meta.name = 'theme-color'
    colorTransition(initColor, color, { duration: 100 }, (newColor) => {
      meta.content = `rgb(${newColor[0] as number}, ${newColor[1] as number}, ${newColor[2] as number})`
    })
    document.querySelector('head')?.appendChild(meta)
    return () => {
      colorTransition(color, initColor, { duration: 100 }, (newColor) => {
        meta.content = `rgb(${newColor[0] as number}, ${newColor[1] as number}, ${newColor[2] as number})`
      })
    }
  }, [])

  return (
    <a.div
      role='alert'
      className={cl('Toast', toastWidth === 0 && 'hidden', `Toast--${toast.type}`)}
      style={{ height, y, display: 'flex', alignItems: 'end' }}
    >
      <a.div ref={ref} style={{ x }}>
        {/*eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions*/}
        <div
          className='content'
          onMouseOver={() => stopTransition(toast.id)}
          onMouseLeave={() => continueTransition(toast.id)}
          onClick={() => toast.emitter.emit(ToastEventNames.setExiting)}
          style={{ ...getStyles(toast.type) }}
        >
          {toast.data as string}
        </div>
      </a.div>
    </a.div>
  )
}
