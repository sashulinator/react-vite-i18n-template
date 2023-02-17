import color from 'color'

import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { ToStringable } from '../../../utils/core/types/to-stringable'
import { Theme } from '../types/theme'

// 🟢 See index.html
let primary: color | string | null = localStorage.getItem('--default-primary')
const defaultColor = localStorage.getItem('--default-color')
const bg = localStorage.getItem('--default-bg')

if (bg === null) {
  throw new Error('LocalStorage must contain "--default-bg" record')
}
if (primary === null) {
  throw new Error('LocalStorage must contain "--default-primary" record')
}
if (defaultColor === null) {
  throw new Error('LocalStorage must contain "--default-color" record')
}

primary = color(primary)

// const bgSecondary = '#fdfefe'
const bgColor = color(bg)
const errorColor = color('#d2302f')

// Input
const input_height = '36px'

// TextInputCSSVars
const textInput_bg = color('#f4f6f9')
const textInput_borderColor = color('#cdd2d6')

export const light: Theme & TextInputCSSVars & { button__height: ToStringable } = {
  'caret-color': 'white',
  bg: bgColor.toString(),
  color: defaultColor,
  'bg-secondary': 'white',
  'color-secondary': '#b2bac2',
  primary,

  // TextInputCSSVars
  'text-input__font-size': '14px',
  'text-input__height': input_height,
  'text-input__line-height': '23px',
  'text-input__horizontal-padding': '12px',
  'text-input__border-radius': '8px',
  'text-input__outline-width': `1px`,

  'text-input__border-width': '1px',
  'text-input__bg': textInput_bg,
  'text-input__border-color': textInput_borderColor,
  'text-input__transition': 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
  'text-input__color': '#2d3843',
  // --hovered
  'text-input__bg--hovered': textInput_bg.lighten(0.01),
  'text-input__border-color--hovered': primary.lighten(0.5),
  // --focused
  'text-input__outline-color--focused': `${primary.toString()}`,
  'text-input__outline-style--focused': `auto`,
  'text-input__border-color--focused': primary,
  // --error
  'text-input__bg--error': errorColor.lighten(0.9),
  'text-input__outline-color--error': errorColor,
  'text-input__border-color--error': errorColor,
  // Button

  button__height: input_height,
}
