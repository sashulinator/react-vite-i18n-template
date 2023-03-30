import { Point, Points } from 'dom-align-ts'
import { composeRef } from 'rc-util/lib/ref'
import * as React from 'react'

import Align, { AlignProps } from '~/ui/align'
import { Any } from '~/utils/core'
import { useOnClickOutside } from '~/utils/hooks/click-outside'
import useEventListener from '~/utils/hooks/event-listener'

import { toPoints } from '../lib/to-points'

export interface PopoverProps extends Omit<AlignProps, 'target' | 'children' | 'align' | 'points'> {
  children: React.ReactElement
  isOpen: boolean | undefined
  content: React.ReactElement
  points?: Points | undefined
  placement?: Point | undefined
  onClose?: (() => void) | undefined
  onClickOutside?: ((e: MouseEvent) => void) | undefined
  onEscKeyDown?: ((e: KeyboardEvent) => void) | undefined
}

const PopoverComponent: React.ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (props) => {
  const { isOpen, content, placement = 'bc', onClose, onClickOutside, onEscKeyDown, ...alignProps } = props
  const points = props.placement ? toPoints(placement) : props.points ?? ['tc', 'bc']
  const sourceRef = React.useRef<null | HTMLDivElement>(null)
  const [childrenEl, setChildrenEl] = React.useState<null | HTMLDivElement>(null)

  const handleClickOutside = React.useCallback(_handleClickOutside, [onClickOutside, onClose])
  const handleEscKeyDown = React.useCallback(_handleEscKeyDown, [onEscKeyDown, onClose])

  useOnClickOutside(sourceRef, handleClickOutside)
  useEventListener('keydown', handleEscKeyDown)

  if (!React.isValidElement(props.children)) {
    throw new Error('Must have one child')
  }
  if (!React.isValidElement(content)) {
    throw new Error('Param "content" Must have one child')
  }

  const clonedChildren = React.cloneElement<Any>(props.children, {
    ref: composeRef((props.children as Any).ref, setChildrenEl),
  })
  const clonedContent = React.cloneElement<Any>(content, {
    ref: composeRef((content as Any).ref, sourceRef),
  })

  return (
    <>
      {clonedChildren}
      {isOpen && childrenEl && (
        <Align {...alignProps} target={childrenEl} points={points}>
          {clonedContent}
        </Align>
      )}
    </>
  )

  // Private

  function _handleClickOutside(e: MouseEvent) {
    props.onClickOutside?.(e)
    props.onClose?.()
  }

  function _handleEscKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      props.onEscKeyDown?.(e)
      props.onClose?.()
    }
  }
}

const Popover = React.forwardRef(PopoverComponent)
export default Popover
