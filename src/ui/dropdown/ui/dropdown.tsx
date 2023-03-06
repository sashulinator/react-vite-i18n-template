import { forwardRef, useRef } from 'react'

import PositioningPortal, { PositionProps, bottomPrefered } from '~/ui/positioning-portal'
import TextInput, { TextInputProps } from '~/ui/text-input'
import { useBoolean } from '~/utils/hooks'
import If from '~/utils/react/if'
import { setRefs } from '~/utils/react/set-refs'

export interface DropdownProps extends TextInputProps {
  portalProps?: PositionProps
}

const DropdownComponent: React.ForwardRefRenderFunction<HTMLInputElement, DropdownProps> = (props, ref) => {
  const { portalProps } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isOpen, open] = useBoolean(false)

  return (
    <>
      <TextInput {...props} ref={setRefs(inputRef, ref)} onClick={open} />
      <If is={isOpen}>
        <PositioningPortal
          {...portalProps}
          relativeElement={inputRef.current}
          positionStrategy={bottomPrefered}
          containerElement={document.body}
        >
          <div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
            <div>Hello</div>
          </div>
        </PositioningPortal>
      </If>
    </>
  )
}

const Dropdown = forwardRef(DropdownComponent)
export default Dropdown
