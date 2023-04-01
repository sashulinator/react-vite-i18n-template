import { EventNames } from './event-names'
import { Key } from './key'

export type Events = {
  [EventNames.select]: Key
  [EventNames.unselect]: void
  [EventNames.selectFirst]: void
  [EventNames.selectNext]: void
  [EventNames.selectPrevious]: void
  [EventNames.selectLast]: void
  [EventNames.check]: Key[]
  [EventNames.removeChecked]: Key
  [EventNames.addChecked]: Key
}
