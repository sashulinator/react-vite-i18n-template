import { ToStringable } from '../../../utils/core/types/to-stringable'

export interface Theme {
  bg: ToStringable
  bgSecondary: ToStringable
  color: ToStringable
  primary: ToStringable
  caretColor: ToStringable
  selectionColor: ToStringable
  selectionBg: ToStringable

  /* Misc */
  input_borderColor: ToStringable
  errorColor: ToStringable
}
