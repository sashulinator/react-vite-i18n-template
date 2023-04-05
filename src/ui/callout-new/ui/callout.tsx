import { clsx } from 'clsx'
import React from 'react'

interface CalloutProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
}

export default function Callout(props: CalloutProps): JSX.Element {
  return <div className={clsx('ui-Callout', props.rootProps?.className)}>Callout</div>
}
