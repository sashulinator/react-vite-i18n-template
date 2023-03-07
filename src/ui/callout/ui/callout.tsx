import './callout.css'

import { clsx } from 'clsx'
import * as React from 'react'

import PositioningPortal, { PositioningPortalProps } from '~/ui/positioning-portal'
import * as strategies from '~/ui/positioning-portal/lib/position-strategies'
import If from '~/utils/react/if'
import { setRefs } from '~/utils/react/set-refs'

// eslint-disable-next-line import/no-unused-modules
export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
  defaultOpen?: boolean
  isOpen?: boolean
  placement?: 'top' | 'left' | 'right' | 'left'
  positioningPortalProps?: Omit<PositioningPortalProps, 'relativeElement'>
  wrapperProps?: React.HTMLAttributes<HTMLSpanElement> & { ref: React.RefObject<null | HTMLSpanElement> }
  arrowProps?: React.HTMLAttributes<HTMLSpanElement> & { ref: React.RefObject<null | HTMLSpanElement> }
}

const TooltipComponent: React.ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (props, ref) => {
  const {
    defaultOpen = false,
    isOpen: isControlledOpen,
    content,
    className,
    children,
    positioningPortalProps,
    wrapperProps,
    arrowProps,
    placement = 'bottom',
    ...rootProps
  } = props
  const wrapperRef = React.useRef<HTMLSpanElement | null>(null)
  const [isMouseOverWrapper, setIsMouseOverWrapper] = React.useState(defaultOpen)
  const [isMouseOverTooltip, setIsMouseOverTooltip] = React.useState(defaultOpen)
  const isInnerOpen = isMouseOverTooltip || isMouseOverWrapper
  const isOpen = isControlledOpen === undefined ? isInnerOpen : isControlledOpen

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <span
        {...wrapperProps}
        ref={setRefs(wrapperRef, wrapperProps?.ref)}
        onMouseEnter={openOnMouseEnterWrapper}
        onMouseLeave={closeOnMouseLeaveWrapper}
      >
        {children}
      </span>
      <If is={isOpen}>
        <PositioningPortal
          {...positioningPortalProps}
          positionStrategy={strategies[placement]}
          className={clsx('ui-Tooltip', `--${placement}`, positioningPortalProps?.className)}
          onMouseEnter={openOnMouseEnterTooltip}
          onMouseLeave={closeOnMouseLeaveTooltip}
          targetRef={wrapperRef}
        >
          <div {...rootProps} className={clsx('content', className)} ref={ref}>
            {content}
            <div {...arrowProps} className={clsx('arrow')} ref={setRefs(arrowProps?.ref)} />
          </div>
        </PositioningPortal>
      </If>
    </>
  )
  // Private

  function openOnMouseEnterWrapper(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    setIsMouseOverWrapper(true)
    props.wrapperProps?.onMouseOver?.(e)
  }

  function closeOnMouseLeaveWrapper(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    setIsMouseOverWrapper(false)
    props.wrapperProps?.onMouseLeave?.(e)
  }

  function openOnMouseEnterTooltip(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsMouseOverTooltip(true)
    props.positioningPortalProps?.onMouseOver?.(e)
  }

  function closeOnMouseLeaveTooltip(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsMouseOverTooltip(false)
    props.positioningPortalProps?.onMouseLeave?.(e)
  }
}

const Tooltip = React.forwardRef(TooltipComponent)
export default Tooltip
