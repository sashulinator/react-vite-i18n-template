import React from 'react'

// import { RequestData, useLogin } from '@/api/auth/login'
// import history from '@/app/history'
// import ROUTES from '@/constants/routes'
// import tT from '@/constants/translation-schemas/t'
// import toastRequestError from '@/lib/api/toast-request-error'
// import { Button } from '@/shared/button'
// import TextField from '@/shared/text-field'

export default function Login(): JSX.Element {
  // const loginMutation = useLogin({
  //   onError: (error) => toastRequestError(tT.errors.couldNotLogin, '', error),
  //   onSuccess(response) {
  //     localStorage.setItem('access_token', response.data.access_token)
  //     localStorage.setItem('refresh_token', response.data.refresh_token)
  //     history.push(ROUTES.main.path)
  //   },
  // })

  // function onSubmit(data: RequestData) {
  //   localStorage.removeItem('access_token')
  //   localStorage.removeItem('refresh_token')
  //   loginMutation.mutate(data)
  // }

  return <main>LoginPage</main>
}
