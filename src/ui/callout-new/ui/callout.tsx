import { createElement, useState } from 'react'

import Popover from '~/ui/popover'

import { adjustPlacement } from '../lib/adjust-placement'
import { CalloutProps } from '../types/callout-props'

/**
 * Компонент
 * @param props
 * @returns
 */
export default function Callout<IContainerProp>(props: CalloutProps<IContainerProp>): JSX.Element {
  const [isXAdjusted, setXAdjusted] = useState(false)
  const [isYAdjusted, setYAdjusted] = useState(false)
  const adjustedPlacement = adjustPlacement(props.placement, { x: isXAdjusted, y: isYAdjusted })

  const container = createElement(props.renderContainer, { ...props.containerProps, arrowPlacement: adjustedPlacement })

  return (
    <Popover
      isOpen={props.isOpen}
      placement={props.placement}
      content={container}
      onAligned={(ret) => {
        setXAdjusted(ret.isXAdjusted)
        setYAdjusted(ret.isYAdjusted)
      }}
    >
      {props.children}
    </Popover>
  )
}
