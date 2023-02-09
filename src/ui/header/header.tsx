import Button from '../button'
import { Link, useNavigate } from 'react-router-dom'

import { routes } from '@/shared/routes'
import { setCSSVar } from '@/utils/dom'
import { ThemeDropdown } from '@/widgets/theme'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  setCSSVar('header-height', 42)

  return (
    <header className='flex items-center justify-between mr-2rem ml-2rem'>
      <Link to={routes.main.path}>Logo</Link>
      <div>
        <Link to={routes.settings.path}>Settings</Link>
      </div>
      <ThemeDropdown />
      <Button onClick={() => navigate('/login')}>Logout</Button>
    </header>
  )
}
