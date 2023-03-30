import { Config, alignElement } from 'dom-align-ts'
import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { listenParentScrolls, observeResize } from '~/utils/dom'
import { useEventListener } from '~/utils/hooks'
import { setRefs } from '~/utils/react/set-refs'

interface ChildProps {
  ref?: React.Ref<HTMLElement> | undefined
}

export interface AlignProps extends Omit<Config, 'source' | 'target'> {
  target: HTMLElement
  children: React.ReactElement<ChildProps>
  portalTo?: HTMLElement | null | undefined
  deps?: unknown[] | undefined
  onAligned?: (ret: ReturnType<typeof alignElement>) => void
}

export default function Align(props: AlignProps): JSX.Element {
  const { target, children, portalTo, deps = [], onAligned, ...config } = props
  const onAlignedRef = useRef(onAligned)
  onAlignedRef.current = onAligned

  if (!React.isValidElement(children)) {
    throw new Error('Must have one child')
  }

  const [sourceEl, setSourceEl] = React.useState<null | HTMLElement>(null)
  const align = useCallback(_align, [target, sourceEl, ...config.points, ...deps])

  useLayoutEffect(align, [align])
  useEventListener('resize', align, undefined, { passive: true })
  useLayoutEffect(() => listenParentScrolls(target, align, { passive: true }), [align])
  useLayoutEffect(() => listenParentScrolls(sourceEl, align, { passive: true }), [align])
  useLayoutEffect(() => observeResize(target, align), [align])
  useLayoutEffect(() => observeResize(sourceEl, align), [align])

  const clonedChildren = React.cloneElement(children, {
    ref: setRefs((children as ChildProps).ref, setSourceEl),
  })

  return <>{createPortal(clonedChildren, portalTo || document.body)}</>

  // Private

  function _align() {
    if (!target || !sourceEl) return
    const ret = alignElement(sourceEl, target, config)
    onAlignedRef.current?.(ret)
  }
}
