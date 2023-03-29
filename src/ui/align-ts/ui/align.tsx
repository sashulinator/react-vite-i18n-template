import { Config, alignElement } from 'dom-align-ts'
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect'
import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'

import { listenParentScrolls } from '~/utils/dom/listen-parent-scrolls'
import { observeResize } from '~/utils/dom/observe-resize'
import useEventListener from '~/utils/hooks/event-listener'
import { setRefs } from '~/utils/react/set-refs'

interface ChildProps {
  ref?: React.Ref<HTMLElement> | undefined
}

export interface AlignProps extends Omit<Config, 'source' | 'target'> {
  target: HTMLElement
  children: React.ReactElement<ChildProps>
  portalToEl?: HTMLElement | null
  deps?: unknown[] | undefined
  onAligned?: (ret: ReturnType<typeof alignElement>) => void
}

export default function Align(props: AlignProps): JSX.Element {
  const { target, children, portalToEl, deps = [], onAligned, ...config } = props

  if (!React.isValidElement(children)) {
    throw new Error('Must have one child')
  }

  const [sourceEl, setSourceEl] = React.useState<null | HTMLElement>(null)
  const align = useCallback(_align, [target, sourceEl, ...deps])

  useLayoutEffect(align, [align])
  useEventListener('resize', align, undefined, { passive: true })
  useLayoutEffect(() => listenParentScrolls(target, align, { passive: true }), [align])
  useLayoutEffect(() => listenParentScrolls(sourceEl, align, { passive: true }), [align])
  useLayoutEffect(() => observeResize(target, align), [align])
  useLayoutEffect(() => observeResize(sourceEl, align), [align])

  const clonedChildren = React.cloneElement(children, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: setRefs((children as any).ref, setSourceEl),
  })

  return <>{createPortal(clonedChildren, portalToEl || document.body)}</>

  // Private

  function _align() {
    if (!target || !sourceEl) return
    const ret = alignElement(sourceEl, target, config)
    onAligned?.(ret)
  }
}
