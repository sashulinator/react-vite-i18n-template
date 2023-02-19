import { ToStringable } from '../../../utils/core/types/to-stringable'

export interface Theme {
  bg: ToStringable
  'bg-secondary': ToStringable
  color: ToStringable
  'color-secondary': ToStringable
  primary: ToStringable
  caretColor: ToStringable
  'selection-color': ToStringable
  'selection-bg': ToStringable
}
