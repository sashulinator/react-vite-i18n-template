import color from 'color'

import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'
import { ToStringable } from '~/utils/core/types/to-stringable'

import { Theme } from '../types/theme'
import { common } from './common'

/* Main */
const caret_color = 'white'
const bgSecondary = '#011e3c'
const dcolor = '#b2bac2'
const primary = color('#027ffe')
const errorColor = color('#d2302f')
// Input
const input_borderColor = color('#265d97')

// TextInput
const textInput_bg = color('#122f4c')
const textInput_borderColor = input_borderColor
const textInput_color = color('#b2bac2')

export const dark: Theme & TextInputCSSVars & Record<'input_border-color', ToStringable> = {
  ...common,
  caretColor: caret_color,
  bg: '#0a1929',
  bgSecondary,
  color: dcolor,
  'color-secondary': '#b2bac2',
  primary,
  'selection-color': dcolor,
  'selection-bg': 'yellow',

  // InputBorder
  'input_border-color': input_borderColor,

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
  'text-input__color--readonly': dcolor,
}
