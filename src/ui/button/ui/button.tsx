import './button.scss'

import c from 'clsx'

import { Any } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Dictionary<Any> {
  className?: undefined | string
}

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button data-x='Button' className={c(props.className)} {...props}>
      {props.children}
    </button>
  )
}
