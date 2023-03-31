import { ForwardedRef } from 'react'

export type ReactElementWithRef = React.ReactElement & { ref?: ForwardedRef<HTMLElement> }
