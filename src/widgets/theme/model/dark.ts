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
const textInput_outlineColor = primary

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
  textInput_color,
  textInput_bg,
  textInput_borderColor,
  textInput_outlineColor,
  // --hovered
  'textInput_bg--hovered': textInput_bg.lighten(0.05),
  'textInput_borderColor--hovered': primary.lighten(0.3),
  'textInput_transition--hovered': 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
  // --focused
  'textInput_borderColor--focused': primary,
  'textInput_outlineColor--focused': primary,
  'textInput_transition--focused': 'border-color 0, background-color 0, box-shadow 0',
  // --error
  'textInput_bg--error': errorColor.darken(0.9),
  'textInput_outlineColor--error': errorColor,
  'textInput_borderColor--error': errorColor,
  // --disabled
  'textInput_bg--disabled': textInput_bg.darken(0.5),
  'textInput_borderColor--disabled': textInput_bg.darken(0.5),
  'textInput_color--disabled': textInput_color.darken(0.4),
  // --readonly
  'textInput_bg--readonly': '#ffffff0a',
  'textInput_borderColor--readonly': 'transparent',
  'textInput_outlineColor--readonly': 'transparent',
  'textInput_color--readonly': color,
}
