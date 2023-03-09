import './callout.css'

import { clsx } from 'clsx'
import * as React from 'react'

import Popover, { PopoverProps } from '~/ui/popover'
import { setRefs } from '~/utils/react/set-refs'

// eslint-disable-next-line import/no-unused-modules
export interface CalloutProps extends Omit<PopoverProps, 'targetRef' | 'align'> {
  arrowProps?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  contentWrapperProps?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
}

const TooltipComponent: React.ForwardRefRenderFunction<HTMLDivElement, CalloutProps> = (props) => {
  const { arrowProps, contentWrapperProps, content, ...popoverProps } = props
  const arrowRef = React.useRef<HTMLDivElement | null>(null)
  const contentWrapperRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <Popover
      {...popoverProps}
      content={
        <div
          {...contentWrapperProps}
          className={clsx('ui-Callout_content_wrapper', contentWrapperProps?.className)}
          ref={setRefs(contentWrapperRef, contentWrapperProps?.ref)}
        >
          {content}
          <div
            {...arrowProps}
            className={clsx('ui-Callout_arrow', arrowProps?.className)}
            ref={setRefs(arrowRef, arrowProps?.ref)}
          />
        </div>
      }
    />
  )
}

const Tooltip = React.forwardRef(TooltipComponent)
export default Tooltip
