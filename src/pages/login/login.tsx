import { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { toast } from '@/packages/toast'
import Button from '@/ui/button'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        toast({ data: 'by1111111!', type: 'success' })
      }, 1000)
      setTimeout(() => {
        toast({ data: '22222222!', type: 'error' })
      }, 1500)
      setTimeout(() => {
        toast({ data: '33333333333!', type: 'warning' })
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
    }, 0)

    // const list = Array(5_000).fill(1)

    // chunk(
    //   list.length,
    //   10,
    //   (acc: string[], chunkStart, chunkEnd) => {
    //     if (chunkStart > 45) {
    //       return true
    //     }
    //     const listChunk = list.slice(chunkStart, chunkEnd)
    //     return [...acc, ...listChunk.map(() => `number: ${chunkStart}`)]
    //   },
    //   []
    // ).then((ret) => {
    //   console.log('ret', ret)
    // })
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
