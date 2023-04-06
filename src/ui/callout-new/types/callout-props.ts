import { Point, Points } from 'dom-align-ts'

export interface ContainerProp {
  arrowPlacement: Point
}

export interface CalloutProps<IContainerProp> {
  /** Дети  */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
  /** Пропсы для контента  */
  containerProps: IContainerProp
  /**  */
  isOpen: boolean
  /**  */
  placement: Point
  /**  */
  point: Points
  /**  */
  renderContainer: (props: ContainerProp & IContainerProp) => JSX.Element | null
}
