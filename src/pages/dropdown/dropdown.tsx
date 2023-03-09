import Dropdown from '~/ui/dropdown'

export default function DropdownPage(): JSX.Element {
  return (
    <main className='pt-5rem'>
      <div
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)' }}
      >
        <h2 className='mb-2rem'>Dropdown</h2>
        <div className='mt-1rem'>
          <label htmlFor='readonly' className='label ml-0.25rem'>
            Dropdown
          </label>
          <Dropdown rootProps={{ className: 'mt-0.5rem' }} id='readonly' autoComplete='off' />
        </div>
      </div>
    </main>
  )
}
