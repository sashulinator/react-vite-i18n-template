import React from 'react'
import { useNavigate } from 'react-router-dom'

import { setCSSVar } from '@/utils/dom'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  setCSSVar('header-height', 42)

  return (
    <header className='flex items-center justify-between mr-2rem ml-2rem'>
      <div>Logo</div>
      <div>Links in the center</div>
      <button onClick={() => navigate('/login')}>Logout</button>
    </header>
  )
}
