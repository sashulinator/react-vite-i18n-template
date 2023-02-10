import * as translations from '../model/translations'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { addToast } from '@/packages/toast'
import Button from '@/ui/button'
import { I18nDropdown, useT } from '@/widgets/i18n'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const t = useT(translations, 'login')

  return (
    <main className='flex justify-center'>
      <div className='flex justify-center  items-center flex-col'>
        <I18nDropdown />
        <form onSubmit={onSubmit}>
          <div className='w-20rem flex flex-col m-4'>
            <label htmlFor='username'>{t.Username()}</label>
            <input id='username' name='username' />
          </div>
          <div className='w-20rem flex flex-col m-4'>
            <label htmlFor='password'>{t.Password()}</label>
            <input id='password' name='password' />
          </div>
          <div className='w-20rem flex flex-col m-4'>
            <Button>{t.Login()}</Button>
          </div>
        </form>
      </div>
    </main>
  )

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/main')
    addToast({ data: 'Logged In', type: 'success' })
  }
}
