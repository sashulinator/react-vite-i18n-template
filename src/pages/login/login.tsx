import { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router'

import Button from '@/ui/button'
import { toast } from '@/ui/toast'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      toast({ data: 'hello!' })
      setTimeout(() => {
        toast({ data: 'by!' })
      }, 500)
      setTimeout(() => {
        toast({ data: 'by1111111!' })
      }, 1000)
      setTimeout(() => {
        toast({ data: '22222222!' })
      }, 1500)
      setTimeout(() => {
        toast({ data: '33333333333!' })
      }, 2000)
      setTimeout(() => {
        toast({ data: '44444444444!' })
      }, 2500)
      setTimeout(() => {
        toast({ data: '555555555!' })
      }, 3000)
      setTimeout(() => {
        toast({ data: '77777777!' })
      }, 3500)
    }, 100)
  }, [])

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
