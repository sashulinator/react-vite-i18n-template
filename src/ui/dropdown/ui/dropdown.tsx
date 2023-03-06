import { forwardRef, useEffect, useRef } from 'react'

import PositioningPortal, { PositionStrategyProps, bottomPrefered } from '~/ui/positioning-portal'
import TextInput, { TextInputProps } from '~/ui/text-input'
import { useBoolean } from '~/utils/hooks'
import { useDebounce } from '~/utils/hooks/use-debounce'
import If from '~/utils/react/if'
import { setRefs } from '~/utils/react/set-refs'

export interface DropdownProps extends TextInputProps {
  portalProps?: PositionStrategyProps
}

const DropdownComponent: React.ForwardRefRenderFunction<HTMLInputElement, DropdownProps> = (props, ref) => {
  const { portalProps } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isOpen, open] = useBoolean(false)
  const [transform, setTransform] = useDebounce('', 3000)

  useEffect(() => {
    setTransform('translateX(40px)')
  }, [])

  return (
    <>
      <TextInput {...props} ref={setRefs(inputRef, ref)} onClick={open} style={{ transform }} />
      <If is={isOpen}>
        <PositioningPortal
          {...portalProps}
          updatePositionDeps={[transform]}
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
