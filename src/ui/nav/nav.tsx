import getRootElement from '@/lib/dom/get-root-element'
import { setCSSVar } from '@/utils/dom'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return <nav>Nav</nav>
}
