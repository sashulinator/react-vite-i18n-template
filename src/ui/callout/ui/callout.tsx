import './callout.css'

import { clsx } from 'clsx'
import { Offset, Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
import * as React from 'react'

import Popover, { PopoverProps } from '~/ui/popover'
import { setRefs } from '~/utils/react/set-refs'

export interface CalloutProps extends Omit<PopoverProps, 'points'> {
  contentWrapperProps?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  contentProps?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  arrowProps?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
}

const CalloutComponent: React.ForwardRefRenderFunction<HTMLDivElement, CalloutProps> = (props) => {
  const { arrowProps, contentWrapperProps, contentProps, content, placement = 'tc', ...popoverProps } = props

  const [contentEl, setContentEl] = React.useState<HTMLDivElement | null>(null)

  const [isXAdjusted, setXAdjusted] = React.useState(false)
  const [isYAdjusted, setYAdjusted] = React.useState(false)
  const adjustedPlacement = getAdjustedPlacement()

  return (
    <Popover
      {...popoverProps}
      placement={placement}
      onAligned={(ret) => {
        setXAdjusted(ret.isXAdjusted)
        setYAdjusted(ret.isYAdjusted)
      }}
      content={
        <div
          {...contentWrapperProps}
          className={clsx(
            'ui-Callout_content-wrapper',
            `--${adjustedPlacement.charAt(0)}`,
            `--${adjustedPlacement.charAt(1)}`,
            contentWrapperProps?.className
          )}
        >
          <Popover
            content={<div {...arrowProps} className={clsx('ui-Callout_arrow', arrowProps?.className)} />}
            containerElement={contentEl}
            isOpen={true}
            points={toPoints(adjustedPlacement)}
            sourceOffset={calcArrowOffset(adjustedPlacement)}
            deps={[adjustedPlacement]}
          >
            <div
              {...contentProps}
              className={clsx('ui-Callout_content', contentProps?.className)}
              ref={setRefs(setContentEl, contentProps?.ref)}
            >
              {content}
            </div>
          </Popover>
        </div>
      }
    />
  )

  // Private

  function calcArrowOffset(placement: Point): Offset {
    if (!contentEl) return [0, 0]
    const isLeft = placement.charAt(1) === 'l'
    const isRight = placement.charAt(1) === 'r'
    const isTop = placement.charAt(0) === 't'
    const isBottom = placement.charAt(0) === 'b'

    if (placement.charAt(0) === 'c') {
      const offsetX = isLeft ? '-50%' : isRight ? '50%' : 0
      return [offsetX, 0]
    }

    const offsetX = isLeft ? '50%' : isRight ? '-50%' : 0
    const offsetY = isTop ? '-50%' : isBottom ? '50%' : 0
    return [offsetX, offsetY]
  }

  function toPoints(placement: Point): Points {
    if (placement.charAt(0) === 'c') {
      return [placement, flipPointHorizontally(placement)]
    }
    return [placement, flipPointVertically(placement)]
  }

  function getAdjustedPlacement(): Point {
    const horizontalPlacement = isXAdjusted ? flipPointHorizontally(placement) : placement
    return isYAdjusted ? flipPointVertically(horizontalPlacement) : horizontalPlacement
  }
}

const Callout = React.forwardRef(CalloutComponent)
export default Callout
