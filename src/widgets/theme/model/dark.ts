import clr from 'color'

import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { Theme } from '../types/theme'
import { common } from './common'

/* Main */
const primary = clr('#027ffe')
const color = clr('#b2bac2')
const bg = clr('#0a1929')
const bgSecondary = clr('#011e3c')
const caretColor = clr('white')
const selectionColor = color
const selectionBg = clr('yellow')

/* Misc */
const input_borderColor = clr('#265d97')
const errorColor = clr('#d2302f')

/* TextInput */
const textInput_color = clr('#b2bac2')
const textInput_bg = clr('#122f4c')
const textInput_borderColor = input_borderColor

export const dark: Theme & TextInputCSSVars = {
  ...common,
  primary,
  color: color,
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
  'text-input__color': textInput_color,
  'text-input__outline-color': primary,
  // --hovered
  'text-input__bg--hovered': textInput_bg.lighten(0.05),
  'text-input__border-color--hovered': primary.lighten(0.3),
  'text-input__transition--hovered': 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
  // --focused
  'text-input__border-color--focused': primary,
  'text-input__outline-color--focused': primary,
  'text-input__transition--focused': 'border-color 0, background-color 0, box-shadow 0',
  // --error
  'text-input__bg--error': errorColor.darken(0.9),
  'text-input__outline-color--error': errorColor,
  'text-input__border-color--error': errorColor,
  // --disabled
  'text-input__bg--disabled': textInput_bg.darken(0.5),
  'text-input__border-color--disabled': textInput_bg.darken(0.5),
  'text-input__color--disabled': textInput_color.darken(0.4),
  // --readonly
  'text-input__bg--readonly': '#ffffff0a',
  'text-input__border-color--readonly': 'transparent',
  'text-input__outline-color--readonly': 'transparent',
  'text-input__color--readonly': color,
}
