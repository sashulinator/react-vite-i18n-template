import React from 'react'

import { setCSSVar } from '@/utils/dom'

export default function Header(): JSX.Element {
  setCSSVar('header-height', 42)

  return <header>Header</header>
}
