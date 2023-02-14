import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { addToast } from '~/packages/toast'
import Button from '~/ui/button'
import TextInput from '~/ui/text-input'
import { I18nDropdown, useT } from '~/widgets/i18n'

import { translations } from '../model/translations'

const USERNAME = 'username'
const PASSWORD = 'password'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const t = useT(translations, 'login')

  return (
    <main className='flex justify-center'>
      <div className='flex justify-center  items-center flex-col'>
        <I18nDropdown />
        <form onSubmit={onSubmit}>
          <div className='w-20rem flex flex-col m-4'>
            <label className='mb-0.5rem' htmlFor={USERNAME}>
              {t.Username()}
            </label>
            <TextInput id={USERNAME} name={USERNAME} />
          </div>
          <div className='w-20rem flex flex-col m-4'>
            <label className='mb-0.5rem' htmlFor={PASSWORD}>
              {t.Password()}
            </label>
            <TextInput id={PASSWORD} name={PASSWORD} left={<div>O</div>} right={<div>O</div>} />
          </div>
          <div className='w-20rem flex flex-col m-4 pt-0.5rem'>
            <Button>{t.Login()}</Button>
          </div>
        </form>
      </div>
    </main>
  )

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    navigate('/main')
    addToast({ data: t.success.loggedIn(), type: 'success' })
  }
}
