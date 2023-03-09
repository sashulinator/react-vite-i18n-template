export interface TargetPoint {
  clientX?: number
  clientY?: number
  pageX?: number
  pageY?: number
}

export type GetTargetElement = () => HTMLElement

export type Target = GetTargetElement | TargetPoint
