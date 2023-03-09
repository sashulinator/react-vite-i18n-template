import addEventListener from 'rc-util/lib/Dom/addEventListener'
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect'
import isEqual from 'rc-util/lib/isEqual'
import { composeRef } from 'rc-util/lib/ref'
import React from 'react'

import useBuffer from '../hooks/use-buffer'
import { DOMAlign } from '../types/dom-align'
import { DOMAlignResult } from '../types/dom-align-result'
import { Target, TargetPoint } from '../types/target'
import { align } from '../utils/align'
import { getElement } from '../utils/get-element'
import { getPoint } from '../utils/get-point'
import { isSamePoint } from '../utils/is-same-point'
import { observeResize } from '../utils/observe-resize'

export interface RefAlign {
  forceAlign: () => void
}

export interface AlignProps {
  align: DOMAlign
  target: Target
  updateAlignMs?: number
  disableAlign?: boolean
  children: React.ReactElement
  onAlign?: (source: HTMLElement, result: DOMAlignResult) => void
}

const AlignComponent: React.ForwardRefRenderFunction<RefAlign, AlignProps> = (props, ref) => {
  const [forceUpdateAlign, cancelAlignUpdating] = useBuffer(updateAlign, props.updateAlignMs || 0)

  // We save the props here to avoid closure makes props old
  const propsRef = React.useRef(props)
  propsRef.current = props

  const cacheEl = React.useRef<HTMLElement | null>(null)
  const cacheAlign = React.useRef<DOMAlign | undefined>()
  const cachePoint = React.useRef<TargetPoint | null>(null)

  const childRef = React.useRef<HTMLElement | null>(null)
  let childReactEl = React.Children.only(props.children)

  const [targetElement, setElement] = React.useState<HTMLElement | null>(null)
  const [point, setPoint] = React.useState<TargetPoint | null>(null)

  // ? Maybe we should replace updateOnChange to forceUpdateAlign and element to cacheEl ?
  React.useEffect(updateOnChange)
  React.useEffect(onDisableAlignChange, [props.disableAlign])
  React.useEffect(() => observeResize(childRef.current, () => forceUpdateAlign()), [childRef.current])
  React.useEffect(() => observeResize(targetElement, () => forceUpdateAlign()), [targetElement])
  React.useEffect(listenWindowResize, [])
  React.useEffect(() => cancelAlignUpdating, [])
  useLayoutEffect(() => {
    setElement(getElement(props.target))
    setPoint(getPoint(props.target))
  })

  React.useImperativeHandle(ref, () => ({
    forceAlign: () => forceUpdateAlign(true),
  }))

  if (React.isValidElement(childReactEl)) {
    childReactEl = React.cloneElement<any>(childReactEl, {
      ref: composeRef((childReactEl as any).ref, childRef),
    })
  }

  return childReactEl

  // Private

  function listenWindowResize() {
    const cb = () => forceUpdateAlign()
    addEventListener('resize', cb)
    return () => removeEventListener('resize', cb)
  }

  function onDisableAlignChange() {
    if (props.disableAlign) {
      cancelAlignUpdating()
      return
    }
    forceUpdateAlign()
  }

  function updateOnChange() {
    const isElementChanged = cacheEl.current !== targetElement
    const isPointChanged = !isSamePoint(cachePoint.current, point)
    const isAlignChanged = !isEqual(cacheAlign.current, props.align)

    if (isElementChanged || isPointChanged || isAlignChanged) {
      forceUpdateAlign()
    }
  }

  function updateAlign() {
    if (propsRef.current.disableAlign || !propsRef.current.target || !childRef.current) {
      cancelAlignUpdating()
      return
    }

    const element = getElement(propsRef.current.target)
    const point = getPoint(propsRef.current.target)

    cacheEl.current = element
    cachePoint.current = point
    cacheAlign.current = propsRef.current.align

    const ret = align(childRef.current, element, point, propsRef.current.align)

    if (propsRef.current.onAlign && ret) {
      propsRef.current.onAlign(childRef.current, ret)
    }
  }
}

const Align = React.forwardRef(AlignComponent)

Align.displayName = 'Align'

export default Align
