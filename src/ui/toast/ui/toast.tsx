import { a, useSpring } from '@react-spring/web'

import {
  isEntering, // isExiting,
  isShowing,
} from '../model/store'
import { Toast } from '../types/toast'
import useMeasure from 'react-use-measure'

export default function ToastUI(props: Toast): JSX.Element {
  const asEntering = isEntering(props.toasterId, props.id)
  const asShowing = isShowing(props.toasterId, props.id)
  // const asExiting = isExiting(props.toasterId, props.id)
  const toastWidth = 450

  const isExpanded = asEntering || asShowing

  const [ref, measure] = useMeasure()
  const toastHeight = measure.height ?? 0

  const { height, x, y } = useSpring({
    config: { duration: asEntering ? props.enteringAnimationMs : props.exitingAnimationMs },
    from: { height: 0, opacity: 0, x: -toastWidth, y: 0 },
    to: {
      height: isExpanded ? toastHeight : 0,
      opacity: isExpanded ? 1 : 0,
      y: isExpanded ? 0 : toastHeight,
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
          paddingBottom: '1rem',
          paddingLeft: '1rem',
        }}
      >
        <div
          style={{
            padding: '2rem',
            backgroundColor: props.type === 'error' ? '#E84F57' : 'white',
            color: props.type === 'error' ? 'white' : 'black',
          }}
        >
          {props.data as string}
        </div>
      </a.div>
    </a.div>
  )
  //   return <Collapse isExpanded={asEntering || asShowing}>{props.data as string}</Collapse>
}
