import * as themes from '../model/index'

import { setCSSVars } from '@/utils/dom'
import { BaseError } from '@/utils/error'

export function setTheme(name: string): void {
  const theme = themes[name]

  if (theme === undefined) {
    throw new BaseError('Theme does not exist', { name })
  }

  localStorage.setItem('theme', name)
  localStorage.setItem('--bg', theme.bg)
  localStorage.setItem('--color', theme.color)
  localStorage.setItem('--primary', theme.primary)

  setCSSVars(theme)
}
