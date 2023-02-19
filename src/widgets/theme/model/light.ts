import clr from 'color'

import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { Theme } from '../types/theme'
import { common } from './common'

// 🟢 See index.html
const defaultPrimary = localStorage.getItem('--default-primary')
const defaultColor = localStorage.getItem('--default-color')
const defaultBg = localStorage.getItem('--default-bg')

if (defaultBg === null) {
  throw new Error('LocalStorage must contain "--default-bg" record')
}
if (defaultPrimary === null) {
  throw new Error('LocalStorage must contain "--default-primary" record')
}
if (defaultColor === null) {
  throw new Error('LocalStorage must contain "--default-color" record')
}

/* Main */
const primary = clr(defaultPrimary)
const color = clr(defaultColor)
const bg = clr(defaultBg)
const bgSecondary = clr('white')
const caretColor = clr('black')
const selectionColor = clr('white')
const selectionBg = primary
/* Misc */
const input_borderColor = clr('#cdd2d6')
const errorColor = clr('#d2302f')

/* TextInput */
const textInput_color = clr('#2d3843')
const textInput_bg = clr('#f4f6f9')
const textInput_borderColor = input_borderColor

export const light: Theme & TextInputCSSVars = {
  ...common,
  primary,
  color,
  bg,
  bgSecondary,
  caretColor,
  selectionColor,
  selectionBg,

  errorColor,
  input_borderColor,

  // TextInputCSSVars
  'text-input__bg': textInput_bg,
  'text-input__border-color': textInput_borderColor,
  'text-input__transition': 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
  'text-input__color': textInput_color,
  // --hovered
  'text-input__bg--hovered': textInput_bg.lighten(0.01),
  'text-input__border-color--hovered': primary.lighten(0.5),
  // --focused
  'text-input__outline-color--focused': `${defaultPrimary.toString()}`,
  'text-input__border-color--focused': defaultPrimary,
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
