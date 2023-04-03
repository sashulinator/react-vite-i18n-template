import { ForwardedRef, JSXElementConstructor } from 'react'

export type ReactElementWithRef<
  P = any,
  T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>
> = React.ReactElement<P & { ref?: ForwardedRef<HTMLElement> }, T> & { ref?: ForwardedRef<HTMLElement> }
