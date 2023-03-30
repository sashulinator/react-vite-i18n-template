// import Callout, { top } from '~/ui/callout'
import Callout from '~/ui/callout'
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
            <Callout
              placement='tc'
              overflow={{ adjustX: true, adjustY: true, alwaysByViewport: true }}
              isOpen={isDefaultOpen}
              content={
                <span>
                  Default
                  <br />
                  Default
                  <br />
                  Default
                  <br />
                  Default
                </span>
              }
            >
              <button onClick={toggleDefault}>Toggle</button>
            </Callout>
          </div>
        </div>
      </div>
    </main>
  )
}
