import { a, useSpring } from '@react-spring/web'

import React from 'react'
import useMeasure from 'react-use-measure'

type CollapseProps = {
  children: React.ReactNode
  isExpanded: boolean
}

export const Collapse = (props: CollapseProps) => {
  const [ref, measure] = useMeasure()
  const viewHeight = measure.height ?? 0

  const { height, x } = useSpring({
    config: { duration: 200 },
    from: { height: 0, opacity: 0, x: -100 },
    to: {
      height: props.isExpanded ? viewHeight : 0,
      opacity: props.isExpanded ? 1 : 0,
      // y: props.isExpanded ? 0 : '100vh',
      x: props.isExpanded ? 0 : -100,
    },
  })

  return (
    <a.div style={{ height }}>
      <a.div
        ref={ref}
        style={{ x, height: '100px', border: '1px solid black', padding: '10px', width: '300px', marginTop: '10px' }}
      >
        {props.children}
      </a.div>
    </a.div>
  )
}

export default Collapse
