import { clsx } from 'clsx'
import * as React from 'react'

import PositioningPortal, { PositioningPortalProps } from '~/ui/positioning-portal'
import { useOnClickOutside } from '~/utils/hooks/click-outside'
import useEventListener from '~/utils/hooks/event-listener'
import If from '~/utils/react/if'
import { setRefs } from '~/utils/react/set-refs'

export interface TooltipProps extends Omit<PositioningPortalProps, 'targetRef' | 'children'> {
  children: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((props: { ref: React.ForwardedRef<HTMLElement & any> | undefined }) => React.ReactNode) | React.ReactNode
  isOpen: boolean | undefined
  content: React.ReactNode
  wrapperProps?: React.HTMLAttributes<HTMLSpanElement> & { ref?: React.ForwardedRef<HTMLSpanElement> }
  onClose?: (() => void) | undefined
  onClickOutside?: ((e: MouseEvent) => void) | undefined
  onEscKeyDown?: ((e: KeyboardEvent) => void) | undefined
}

const PopoverComponent: React.ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = (props, ref) => {
  const { isOpen, wrapperProps, children, content, ...restProps } = props
  const portalRef = React.useRef<null | HTMLDivElement>(null)
  const wrapperRef = React.useRef<HTMLSpanElement | null>(null)

  const onClickOutside = React.useCallback(_onClickOutside, [props.onClickOutside, props.onClose])
  const onEscKeyDown = React.useCallback(_onEscKeyDown, [props.onEscKeyDown, props.onClose])

  useOnClickOutside(portalRef, onClickOutside)
  useEventListener('keydown', onEscKeyDown)

  return (
    <>
      <If is={isOpen}>
        <PositioningPortal
          {...restProps}
          className={clsx('ui-Popover', restProps?.className)}
          ref={setRefs(portalRef, ref)}
          targetRef={wrapperRef}
        >
          {content}
        </PositioningPortal>
      </If>
      {typeof children === 'function' ? (
        children({ ref: setRefs(wrapperRef, wrapperProps?.ref) })
      ) : (
        <span
          {...wrapperProps}
          className={clsx('ui-Popover_wrapper', wrapperProps?.className)}
          ref={setRefs(wrapperRef, wrapperProps?.ref)}
        >
          {children}
        </span>
      )}
    </>
  )

  // Private

  function _onClickOutside(e: MouseEvent) {
    props.onClickOutside?.(e)
    props.onClose?.()
  }

  function _onEscKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      props.onEscKeyDown?.(e)
      props.onClose?.()
    }
  }
}

const Popover = React.forwardRef(PopoverComponent)
export default Popover
