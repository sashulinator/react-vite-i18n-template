import { Link } from 'react-router-dom'

import { routes } from '~/shared/routes'

// import Dropdown from '~/ui/dropdown'
// import Popover from '~/ui/popover'
// import TextInput from '~/ui/text-input'
// import { useBoolean } from '~/utils/hooks'
// import { ThemeDropdown } from '~/widgets/theme'

export default function MainPage(): JSX.Element {
  return (
    <main className='pt-5rem flex flex-col'>
      <Link to={routes.textInput.path}>TextInput</Link>
      <Link to={routes.dropdown.path}>Dropdown</Link>
      <Link to={routes.callout.path}>Callout</Link>
    </main>
  )
}
