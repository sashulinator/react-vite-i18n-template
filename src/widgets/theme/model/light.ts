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
const textInput_outlineColor = primary
const textInput_transition = 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s'
// --hovered
const textInput_bg__hovered = textInput_bg.lighten(0.01)
const textInput_borderColor__hovered = primary.lighten(0.5)
// --focused
const textInput_borderColor__focused = defaultPrimary
// --error
const textInput_bg__error = errorColor.lighten(0.9)
const textInput_outlineColor__error = errorColor
const textInput_borderColor__error = errorColor
// --disabled
const textInput_bg__disabled = textInput_bg.lighten(0.01)
const textInput_borderColor__disabled = textInput_bg.lighten(0.01)
const textInput_color__disabled = textInput_color.lighten(1.5)
// --readonly
const textInput_borderColor__readonly = 'transparent'
const textInput_outlineColor__readonly = 'transparent'

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
  textInput_color,
  textInput_bg,
  textInput_borderColor,
  textInput_outlineColor,
  textInput_transition,
  textInput_bg__hovered,
  textInput_borderColor__hovered,
  textInput_borderColor__focused,
  textInput_bg__error,
  textInput_outlineColor__error,
  textInput_borderColor__error,
  textInput_bg__disabled,
  textInput_borderColor__disabled,
  textInput_color__disabled,
  textInput_borderColor__readonly,
  textInput_outlineColor__readonly,
  // Button
}
