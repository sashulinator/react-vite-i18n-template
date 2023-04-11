import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { ToStringable } from '../../../utils/core'

// Input
const input_height = '36px'
const input_height__s = '28px'
const input_height__l = '42px'

// TextInputCSSVars

export const common: TextInputCSSVars & { button__height: ToStringable } = {
  textInput_fontSize: '14px',
  textInput_height: input_height,
  textInput_lineHeight: '23px',
  textInput_horizontalPadding: '12px',
  textInput_borderRadius: '8px',
  textInput_borderWidth: '1px',
  textInput_transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
  textInput_outlineWidth: '4px',
  textInput_height__s: input_height__s,
  textInput_height__l: input_height__l,
  // --focused
  textInput_outlineStyle__focused: `solid`,
  // Button

  button__height: input_height,
}
