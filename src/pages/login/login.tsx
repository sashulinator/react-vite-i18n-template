import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

import Button from '@/ui/button'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()

  return (
    <main className='flex justify-center'>
      <div style={{ backgroundColor: '#eee' }} className='flex items-center'>
        <form onSubmit={onSubmit}>
          <div className='w-20rem flex flex-col m-4'>
            <label htmlFor='username'>Username</label>
            <input id='username' name='username' />
          </div>
          <div className='w-20rem flex flex-col m-4'>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' />
          </div>
          <div className='w-20rem flex flex-col m-4'>
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </main>
  )

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/main')
  }
}
