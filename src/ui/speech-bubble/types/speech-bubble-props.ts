import { Point } from 'dom-align-ts'

export interface SpeechBubbleProps {
  rootProps: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  contentProps: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  arrowProps: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
  // Позиция сообщения
  placement: Point
  content: React.ReactNode
}
