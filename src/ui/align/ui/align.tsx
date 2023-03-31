import { alignElement } from 'dom-align-ts'
import React, { FC, useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

import { listenParentScrolls, observeResize } from '~/utils/dom'
import { useEventListener } from '~/utils/hooks'
import { useLatest } from '~/utils/hooks/latest'
import { setRefs } from '~/utils/react'

import { AlignProps } from '../types/align-props'

/**
 * Компонет для позиционирования Sourcе
 * относительно Target, а так же порталинга Sourcе
 * В указанный Элемент (по умолчанию body)
 *
 * Оперирует понятиями:
 * Source: Элемент который будет портирован и спозиционирован относительно Target
 * Target: Элемент относительно которого будет позиционироваться Source
 * Container: Элемент в который будет портирован Source
 */
const Align: FC<AlignProps> = (props) => {
  const { targetElement, children, containerElement, deps = [], onAligned, sourceOffset, ...config } = props
  // Реф элемента который будет спозиционирован
  const [sourceElement, setSourceEl] = React.useState<null | HTMLElement>(null)
  // Реф события запускаемого после того как елемент будет спозиционирован
  const onAlignedRef = useLatest(onAligned)

  if (!React.isValidElement(children)) {
    throw new Error('Must have one child')
  }

  const align = useCallback(_align, [targetElement, sourceElement, containerElement, ...config.points, ...deps])

  useLayoutEffect(align, [align])
  useEventListener('resize', align, undefined, { passive: true })
  useLayoutEffect(() => listenParentScrolls(targetElement, align, { passive: true }), [align])
  useLayoutEffect(() => listenParentScrolls(sourceElement, align, { passive: true }), [align])
  useLayoutEffect(() => observeResize(targetElement, align), [align])
  useLayoutEffect(() => observeResize(sourceElement, align), [align])

  const clonedChildren = React.cloneElement(children, { ref: setRefs(children.ref, setSourceEl) })

  return <>{createPortal(clonedChildren, containerElement || targetElement.ownerDocument.body)}</>

  // Private

  function _align() {
    if (!targetElement || !sourceElement) return
    const ret = alignElement(sourceElement, targetElement, { ...config, offset: sourceOffset })
    onAlignedRef.current?.(ret)
  }
}

Align.displayName = 'Align'
export default Align
