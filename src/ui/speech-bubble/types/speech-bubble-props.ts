import { Point } from 'dom-align-ts'
import { RefAttributes } from 'react'

export interface SpeechBubbleProps {
  /* Пропсы для Корневого компонента */
  rootProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /* Пропсы для Контент компонента */
  contentProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /* Пропсы для Стрелка компонента */
  arrowProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /* Позиция сообщения. На эснове этого пропса Стрелка вычисляет свое положение */
  placement?: Point

  /* Дети Контента */
  children: React.ReactNode
}
