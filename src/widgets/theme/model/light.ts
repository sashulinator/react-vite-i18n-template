import { Theme } from '../types/theme'

// 🟢 See index.html
const bg = localStorage.getItem('--defaultBg')
const primary = localStorage.getItem('--defaultPrimary')
const color = localStorage.getItem('--defaultColor')

if (bg === null) {
  throw new Error('LocalStorage must contain "defaultBg" record')
}
if (primary === null) {
  throw new Error('LocalStorage must contain "defaultPrimary" record')
}
if (color === null) {
  throw new Error('LocalStorage must contain "color" record')
}

export const light: Theme = {
  bg,
  primary,
  color,
  linkColor: '#e85a4f',
  'gr-button-color': 'rgba(255, 255, 255, 0.9)',
}
