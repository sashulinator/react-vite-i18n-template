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
}

export default function Align(props: AlignProps): JSX.Element {
  const { target, children, ...config } = props

  if (!React.isValidElement(children)) {
    throw new Error('Must have one child')
  }

  const [sourceEl, setSourceEl] = React.useState<null | HTMLElement>(null)
  const align = useCallback(_align, [target, sourceEl])

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

  return <>{createPortal(clonedChildren, document.body)}</>

  // Private

  function _align() {
    if (!target || !sourceEl) return
    alignElement(sourceEl, target, config)
  }
}
