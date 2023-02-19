import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { ToStringable } from '../../../utils/core/types/to-stringable'

// Input
const input_height = '36px'

// TextInputCSSVars

export const common: TextInputCSSVars & { button__height: ToStringable } = {
  textInput_fontSize: '14px',
  textInput_height: input_height,
  textInput_lineHeight: '23px',
  textInput_horizontalPadding: '12px',
  textInput_borderRadius: '8px',
  textInput_outlineWidth: `1px`,
  textInput_borderWidth: '1px',
  // --focused
  'textInput_outlineStyle--focused': `solid`,
  // Button

  button__height: input_height,
}
