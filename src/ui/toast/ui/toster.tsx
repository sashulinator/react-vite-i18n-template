import c from 'clsx'

export interface TosterProps {
  className?: string
}

export default function Toster(props: TosterProps): JSX.Element {
  return <aside className={c('Toster', props.className)}>Toster</aside>
}
