export interface DOMAlignResult {
  points: string[]
  offset: number[]
  targetOffset: number[]
  overflow: {
    adjustX: boolean | number
    adjustY: boolean | number
  }
}
