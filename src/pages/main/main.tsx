import TextInput from '~/ui/text-input'
import { ThemeDropdown } from '~/widgets/theme'

export default function Login(): JSX.Element {
  return (
    <main className='pt-5rem'>
      <ThemeDropdown />
      <div
        className='w-20rem bg-secondary p-2em mt-3rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_border-color)' }}
      >
        <h2 className='mb-2rem'>TextInput</h2>
        <div className='mt-0.5rem'>
          <label htmlFor='default' className='ml-0.2rem'>
            Default
          </label>
          <TextInput className='mt-0.5rem' id='default' autoComplete='off' defaultValue='Default' />
        </div>
        <div className='mt-1rem'>
          <label htmlFor='error' className='ml-0.2rem'>
            Error
          </label>
          <TextInput id='error' className='mt-0.5rem' isError={true} autoComplete='off' defaultValue='Error' />
        </div>
        <div className='mt-1rem'>
          <label htmlFor='disabled' className='ml-0.2rem'>
            Disabled
          </label>
          <TextInput id='disabled' className='mt-0.5rem' disabled={true} autoComplete='off' value='Disabled' />
        </div>
        <div className='mt-1rem'>
          <label htmlFor='readonly' className='ml-0.2rem'>
            Readonly
          </label>
          <TextInput id='readonly' className='mt-0.3rem' readOnly={true} autoComplete='off' value='Readonly' />
        </div>
      </div>
    </main>
  )
}
