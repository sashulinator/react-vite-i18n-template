// import Callout, { top } from '~/ui/callout'
import { forwardRef } from 'react'

import Callout from '~/ui/callout-new'
import { ContentProp } from '~/ui/callout-new/types/callout-props'
import SpeechBubble from '~/ui/speech-bubble'
import { SpeechBubbleProps } from '~/ui/speech-bubble/types/speech-bubble-props'
import { useBoolean } from '~/utils/hooks'

export default function CalloutPage(): JSX.Element {
  const [isDefaultOpen, , , toggleDefault] = useBoolean(false)

  return (
    <main className='pt-5rem'>
      <div
        // ref={setContainerEl}
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)', position: 'relative' }}
      >
        <h2 className='mb-2rem'>Callout</h2>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Default
          </label>
          <div>
            <Callout<SpeechBubbleProps>
              isOpen={isDefaultOpen}
              // contentProps={}
              placement='bc'
              overflow={{ adjustX: true, adjustY: true, alwaysByViewport: true }}
              contentProps={{
                children: <div>Hello</div>,
              }}
              renderContent={BubbleWrapper}
            >
              <button onClick={toggleDefault} style={{ padding: '70px' }}>
                Toggle
              </button>
            </Callout>
          </div>
        </div>
      </div>
    </main>
  )
}

const BubbleWrapper = forwardRef<HTMLDivElement, ContentProp & SpeechBubbleProps>(function BubbleWrapper(
  props: ContentProp & SpeechBubbleProps,
  ref
) {
  console.log('props', props)

  return (
    <div ref={ref}>
      <SpeechBubble {...props} />
    </div>
  )
})
