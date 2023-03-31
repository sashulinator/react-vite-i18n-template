import { alignElement } from 'dom-align-ts'
import type { Offset, Points } from 'dom-align-ts'

import type { ReactElementWithRef } from '~/utils/react'

/* Конфиг в случае overflow  */
export interface Overflow {
  /* Сдвигать Source в область видимости пользователя до тех пор пока Target видим */
  alwaysByViewport?: boolean

  /* Отрегулировать по оси X */
  adjustX?: boolean

  /* Отрегулировать по оси Y */
  adjustY?: boolean
}

/**
 * Пропсы Align компонента
 *
 * Оперирует понятиями:
 * Source: Элемент который будет портирован и спозиционирован относительно Target
 * Target: Элемент относительно которого будет позиционироваться Source
 * Container: Элемент в который будет портирован Source
 */
export interface AlignProps {
  /* Target Элемент */
  targetElement: HTMLElement

  /* Элемент внутрь которого будет портирован Source */
  containerElement?: HTMLElement | null | undefined

  /* Source Элемент */
  children: ReactElementWithRef

  /* Точки которыми будут соприкасаться Source и Target */
  points: Points

  /* Зависимости для перепозиционирования */
  deps?: unknown[] | undefined

  /* Сдвиг Source по оси x y */
  sourceOffset?: Offset | undefined

  /* Сдвиг Target по оси x y */
  targetOffset?: Offset | undefined

  /* Конфиг в случае overflow  */
  overflow?: Overflow | undefined

  /* Использовать css свойство right вместо left  */
  useCssRight?: boolean | undefined

  /* Использовать css свойство bottom вместо top  */
  useCssBottom?: boolean | undefined

  /* Использовать css свойство transform вместо left top  */
  useCssTransform?: boolean | undefined

  /* Использовать css свойство transform вместо left top  */
  ignoreShake?: boolean | undefined

  /* Событие после позиционирования */
  onAligned?: ((ret: ReturnType<typeof alignElement>) => void) | undefined
}
