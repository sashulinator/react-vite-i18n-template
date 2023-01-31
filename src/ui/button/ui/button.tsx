import './button.scss'

import c from 'clsx'

import { AnyDictionary } from '@/utils/dictionary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, AnyDictionary {
  className?: undefined | string
}

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button data-x='Button' className={c(props.className)} {...props}>
      {props.children}
    </button>
  )
}
