import { Point } from 'dom-align-ts'
import { RefAttributes } from 'react'

export interface BaloonProps {
  /* Пропсы для Корневого компонента */
  rootProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /* Пропсы для Контент компонента */
  contentProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /* Пропсы для Стрелка компонента */
  arrowProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /*
    Позиция Ballon относительно Таргет. 
    На основе этого пропса Стрелка вычисляет свое положение
    Пример: Если сообщение снизу от Таргета (bc), то Стрелка будет сверху (tc)
  */
  placement?: Point

  /* Ребенок Контента */
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
}
