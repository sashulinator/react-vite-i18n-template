import './speech-bubble.css'

import clsx from 'clsx'
import { Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
import React from 'react'

import Popover from '~/ui/popover'
import { Any } from '~/utils/core'
import { useWindowSize } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { calcArrowOffset } from '../lib/calc-arrow-offset'
import { SpeechBubbleProps } from '../types/speech-bubble-props'

export default function SpeechBubble(props: SpeechBubbleProps): JSX.Element {
  const [childrenEl, setChildrenEl] = React.useState<HTMLDivElement | null>(null)
  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null)
  const { placement = 'tc' } = props

  const rect = childrenEl?.getBoundingClientRect()
  useWindowSize()

  if (!React.isValidElement(props.children)) {
    throw new Error('Must have one child')
  }
  const clonedChildren = React.cloneElement<Any>(props.children, {
    ref: setRefs((props.children as Any).ref, setChildrenEl),
  })

  return (
    <div
      {...props.rootProps}
      ref={setRefs(setContentEl, props.contentProps?.ref)}
      style={{ height: rect?.height, width: rect?.width, ...props.rootProps?.style }}
      className={clsx('ui-SpeechBubble', props.rootProps?.className)}
    >
      <Popover
        content={
          <div
            {...props.arrowProps}
            className={clsx('ui-SpeechBubble_arrow', props.arrowProps?.className)}
            style={{ position: 'absolute', ...props.arrowProps?.style }}
          />
        }
        isOpen={true}
        containerElement={contentEl}
        points={toPoints(placement)}
        sourceOffset={calcArrowOffset(placement)}
        deps={[props.placement]}
      >
        <div
          {...props.contentProps}
          className={clsx('ui-SpeechBubble_content', props.contentProps?.className)}
          style={{ position: 'absolute', ...props.contentProps?.style }}
        >
          {clonedChildren}
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
