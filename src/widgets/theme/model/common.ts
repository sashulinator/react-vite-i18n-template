import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { ToStringable } from '../../../utils/core/types/to-stringable'

// Input
const input_height = '36px'

// TextInputCSSVars

export const common: TextInputCSSVars & { button__height: ToStringable } = {
  'text-input__font-size': '14px',
  'text-input__height': input_height,
  'text-input__line-height': '23px',
  'text-input__horizontal-padding': '12px',
  'text-input__border-radius': '8px',
  'text-input__outline-width': `1px`,
  'text-input__border-width': '1px',
  // --focused
  'text-input__outline-style--focused': `solid`,
  // Button

  button__height: input_height,
}
