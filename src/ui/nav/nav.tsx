import React from 'react'

import { setCSSVar } from '@/utils/dom'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200)

  return <nav>Nav</nav>
}
