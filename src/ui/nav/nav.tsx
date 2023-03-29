import { Link } from 'react-router-dom'

import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import { setCSSVar } from '~/utils/dom'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav style={{ paddingTop: '5rem' }}>
      <ul>
        <ol>
          <Link to={routes.callout.path}>Callout</Link>
        </ol>
        <ol>
          <Link to={routes.dropdown.path}>Dropdown</Link>
        </ol>
        <ol>
          <Link to={routes.textInput.path}>TextInput</Link>
        </ol>
        <ol>
          <Link to={routes.popover.path}>Popover</Link>
        </ol>
      </ul>
    </nav>
  )
}
