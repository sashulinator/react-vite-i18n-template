// import Callout, { top } from '~/ui/callout'
import Popover from '~/ui/popover'
import { useBoolean } from '~/utils/hooks'

export default function CalloutPage(): JSX.Element {
  const [isDefaultOpen, , , toggleDefault] = useBoolean(false)
  const [isTopOpen, , , toggleTop] = useBoolean(false)
  return (
    <main className='pt-5rem'>
      <div
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)' }}
      >
        <h2 className='mb-2rem'>Callout</h2>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Default
          </label>
          <div>
            <Popover isOpen={isDefaultOpen} content={<span>Default</span>}>
              <button onClick={toggleDefault}>Toggle</button>
            </Popover>
          </div>
        </div>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Top
          </label>
          <div>
            <Popover isOpen={isTopOpen} content={<span>Top Callout</span>}>
              <button onClick={toggleTop}>Toggle</button>
            </Popover>
          </div>
        </div>
      </div>
    </main>
  )
}
