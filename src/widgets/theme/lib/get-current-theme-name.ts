import { DEFAULT_THEME } from '../constants/default-theme'

export function getCurrentThemeName(): string {
  // TODO такая схема вообще есть? может пользователь вбил что-то свое?
  return localStorage.getItem('theme') || DEFAULT_THEME
}
