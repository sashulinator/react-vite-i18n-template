import clsx from 'clsx'
import { Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
import React from 'react'

import Popover from '~/ui/popover'
import { setRefs } from '~/utils/react'

import { calcArrowOffset } from '../lib/calc-arrow-offset'
import { SpeechBubbleProps } from '../types/speech-bubble-props'

export default function SpeechBubble(props: SpeechBubbleProps): JSX.Element {
  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null)

  return (
    <div {...props.rootProps} className={clsx('ui-SpeechBubble', props.rootProps?.className)}>
      <Popover
        content={<div {...props.arrowProps} className={clsx('ui-SpeechBubble_arrow', props.arrowProps?.className)} />}
        containerElement={contentEl}
        isOpen={true}
        points={toPoints(props.placement)}
        sourceOffset={calcArrowOffset(props.placement)}
        deps={[props.placement]}
      >
        <div
          {...props.contentProps}
          className={clsx('ui-SpeechBubble_content', props.contentProps?.className)}
          ref={setRefs(setContentEl, props.contentProps?.ref)}
        >
          {props.content}
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
