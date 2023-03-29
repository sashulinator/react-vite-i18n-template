// import Callout, { top } from '~/ui/callout'
import { useState } from 'react'

import Popover from '~/ui/popover'
import { useBoolean } from '~/utils/hooks'

export default function PopoverPage(): JSX.Element {
  const [isDefaultOpen, , , toggleDefault] = useBoolean(false)
  const [isTCPontsOpen, , , toggleTCPoints] = useBoolean(false)
  const [isTCPlacementOpen, , , toggleTCPlacement] = useBoolean(false)
  const [isParentPopupContainerOpen, , , toggleParentPopupContaner] = useBoolean(false)
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)

  return (
    <main className='pt-5rem'>
      <div
        ref={setContainerEl}
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)', position: 'relative' }}
      >
        <h2 className='mb-2rem'>Callout</h2>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Default
          </label>
          <div>
            {containerEl && (
              <Popover
                portalToEl={containerEl}
                isOpen={isDefaultOpen}
                content={<span style={{ position: 'fixed' }}>Default</span>}
              >
                <button onClick={toggleDefault}>Toggle</button>
              </Popover>
            )}
          </div>
        </div>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            TC (Points)
          </label>
          <div>
            <Popover
              points={['bc', 'tc']}
              isOpen={isTCPontsOpen}
              content={<span style={{ position: 'fixed' }}>Top Callout</span>}
            >
              <button onClick={toggleTCPoints}>Toggle</button>
            </Popover>
          </div>
        </div>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            CL (Placement)
          </label>
          <div>
            <Popover
              placement='cr'
              isOpen={isTCPlacementOpen}
              content={<span style={{ position: 'fixed' }}>Top Callout</span>}
            >
              <button onClick={toggleTCPlacement}>Toggle</button>
            </Popover>
          </div>
        </div>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Parent is a popup container
          </label>
          <div>
            {containerEl && (
              <Popover
                portalToEl={containerEl}
                points={['bc', 'tc']}
                isOpen={isParentPopupContainerOpen}
                content={<span style={{ position: 'absolute' }}>Top Callout</span>}
              >
                <button onClick={toggleParentPopupContaner}>Toggle</button>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
