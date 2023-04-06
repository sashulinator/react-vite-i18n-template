import './speech-bubble.css'

import clsx from 'clsx'
import { Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
import React from 'react'

import Popover from '~/ui/popover'
import { getStyle } from '~/utils/dom/get-style'
import { setRefs } from '~/utils/react'

import { calcArrowOffset } from '../lib/calc-arrow-offset'
import { SpeechBubbleProps } from '../types/speech-bubble-props'

export default function SpeechBubble(props: SpeechBubbleProps): JSX.Element {
  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null)
  const [rootEl, setRootEl] = React.useState<HTMLDivElement | null>(null)
  const { placement = 'tc' } = props
  const height = getStyle(contentEl)?.height
  const width = getStyle(rootEl)?.width

  return (
    <div
      {...props.rootProps}
      style={{ height, ...props.rootProps?.style }}
      className={clsx('ui-SpeechBubble', props.rootProps?.className)}
      ref={setRefs(setRootEl, props.rootProps?.ref)}
    >
      <Popover
        content={<div {...props.arrowProps} className={clsx('ui-SpeechBubble_arrow', props.arrowProps?.className)} />}
        containerElement={rootEl}
        isOpen={true}
        points={toPoints(placement)}
        sourceOffset={calcArrowOffset(placement)}
        deps={[props.placement]}
      >
        <div
          {...props.contentProps}
          style={{ width, ...props.contentProps?.style }}
          className={clsx('ui-SpeechBubble_content', props.contentProps?.className)}
          ref={setRefs(setContentEl, props.contentProps?.ref)}
        >
          {props.children}
        </div>
      </Popover>
    </div>
  )

  // Private

  function toPoints(placement: Point): Points {
    if (placement.charAt(0) === 'c') {
      return [placement, flipPointHorizontally(placement)]
    }
    return [placement, flipPointVertically(placement)]
  }
}
