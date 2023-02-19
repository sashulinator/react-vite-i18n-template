import { ToStringable } from '../../../utils/core/types/to-stringable'

export interface Theme {
  bg: ToStringable
  bgSecondary: ToStringable
  color: ToStringable
  'color-secondary': ToStringable
  primary: ToStringable
  caretColor: ToStringable
  'selection-color': ToStringable
  'selection-bg': ToStringable
}
