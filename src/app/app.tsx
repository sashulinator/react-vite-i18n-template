import './reset.css'

import './utils.css'
// 🟢 Отключаем eslint т.к. этот файл генерируется динамически
// eslint-disable-next-line import/no-unresolved
import 'uno.css'

import '../shared/dayjs'
import '../shared/i18n'
import Layout from './layout'
import { Suspense } from 'react'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from '@/shared/react-query'
import { Container } from '@/ui/toast'

export default function App() {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout />
          {createPortal(
            <>
              <ReactQueryDevtools />
              <Container />
            </>,
            document.body
          )}
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  )
}
