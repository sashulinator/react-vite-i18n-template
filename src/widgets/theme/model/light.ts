import color from 'color'

import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { ToStringable } from '../../../utils/core/types/to-stringable'
import { Theme } from '../types/theme'
import { common } from './common'

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

/* Main */
const bgColor = color(bg)
primary = color(primary)
const bgSecondary = 'white'
const caretColor = 'black'

const errorColor = color('#d2302f')

// Input
const input_borderColor = color('#cdd2d6')

// TextInputCSSVars
const textInput_color = color('#2d3843')
const textInput_bg = color('#f4f6f9')
const textInput_borderColor = input_borderColor

export const light: Theme & TextInputCSSVars & Record<'input_border-color', ToStringable> = {
  ...common,
  caretColor,
  bg: bgColor.toString(),
  color: defaultColor,
  bgSecondary,
  'color-secondary': '#b2bac2',
  'selection-color': 'white',
  'selection-bg': primary,
  primary,

  // Input
  'input_border-color': input_borderColor,

  // TextInputCSSVars
  'text-input__bg': textInput_bg,
  'text-input__border-color': textInput_borderColor,
  'text-input__transition': 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
  'text-input__color': textInput_color,
  // --hovered
  'text-input__bg--hovered': textInput_bg.lighten(0.01),
  'text-input__border-color--hovered': primary.lighten(0.5),
  // --focused
  'text-input__outline-color--focused': `${primary.toString()}`,
  'text-input__border-color--focused': primary,
  // --error
  'text-input__bg--error': errorColor.lighten(0.9),
  'text-input__outline-color--error': errorColor,
  'text-input__border-color--error': errorColor,
  // --disabled
  'text-input__bg--disabled': textInput_bg.lighten(0.01),
  'text-input__border-color--disabled': textInput_bg.lighten(0.01),
  'text-input__color--disabled': textInput_color.lighten(1.5),
  // --readonly
  'text-input__border-color--readonly': 'transparent',
  'text-input__outline-color--readonly': 'transparent',
  // Button
}
