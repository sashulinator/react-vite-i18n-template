import { memo } from 'react'

const CloseIcon = (props) => (
  <svg aria-hidden='true' viewBox='0 0 14 16' width='1em' height='1em' {...props}>
    <path d='m7.71 8.23 3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z' />
  </svg>
)

const Memo = memo(CloseIcon)
export default Memo
