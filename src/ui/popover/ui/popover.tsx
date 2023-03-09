import { composeRef } from 'rc-util/lib/ref'
import * as React from 'react'

import Align from '~/ui/align'
import { AlignProps } from '~/ui/align/ui/align'
import { useOnClickOutside } from '~/utils/hooks/click-outside'
import useEventListener from '~/utils/hooks/event-listener'
import If from '~/utils/react/if'

export interface PopoverProps extends Omit<AlignProps, 'target' | 'children' | 'align'> {
  children: React.ReactElement
  isOpen: boolean | undefined
  content: React.ReactElement
  // portalProps?: React.HTMLAttributes<HTMLSpanElement> & { ref?: React.ForwardedRef<HTMLDivElement> }
  onClose?: (() => void) | undefined
  onClickOutside?: ((e: MouseEvent) => void) | undefined
  onEscKeyDown?: ((e: KeyboardEvent) => void) | undefined
}

const PopoverComponent: React.ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (props) => {
  const { isOpen, content, ...restProps } = props
  let children = props.children
  const portalRef = React.useRef<null | HTMLDivElement>(null)
  const childrenRef = React.useRef<null | HTMLDivElement>(null)

  const onClickOutside = React.useCallback(_onClickOutside, [props.onClickOutside, props.onClose])
  const onEscKeyDown = React.useCallback(_onEscKeyDown, [props.onEscKeyDown, props.onClose])

  useOnClickOutside(portalRef, onClickOutside)
  useEventListener('keydown', onEscKeyDown)

  if (React.isValidElement(children)) {
    children = React.cloneElement<any>(children, {
      ref: composeRef((children as any).ref, childrenRef),
    })
  }

  return (
    <>
      {children}
      <If is={isOpen}>
        <Align {...restProps} target={() => childrenRef.current as HTMLElement} align={{ points: ['cc', 'cc'] }}>
          {content}
        </Align>
      </If>
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
