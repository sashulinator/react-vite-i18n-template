import * as React from 'react'
import { SVGProps, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M6.873 17.129c-1.845-1.31-3.305-3.014-4.13-4.09a1.693 1.693 0 0 1 0-2.077C4.236 9.013 7.818 5 12 5c1.876 0 3.63.807 5.13 1.874'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14.13 9.887a3 3 0 1 0-4.243 4.242M4 20 20 4M10 18.704A7.124 7.124 0 0 0 12 19c4.182 0 7.764-4.013 9.257-5.962a1.694 1.694 0 0 0-.001-2.078A22.939 22.939 0 0 0 19.57 9'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const EyeOffIcon = memo(SvgComponent)
export default EyeOffIcon
