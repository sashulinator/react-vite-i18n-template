import './reset.css'

import './tags.css'
import './utils.css'
// 🟢 Отключаем eslint т.к. этот файл генерируется динамически
// eslint-disable-next-line import/no-unresolved
import 'uno.css'

import '../shared/dayjs'
import Layout from './layout'
import { Suspense } from 'react'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from '@/shared/react-query'
import { Container } from '@/ui/toast'
import { getCurrentThemeName, setTheme } from '@/widgets/theme'

export default function App() {
  setTheme(getCurrentThemeName())
  // prettier-ignore
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
        {createPortal([
          <ReactQueryDevtools key='0' />,
          <Container key='1' />,
        ], document.body)}
      </QueryClientProvider>
    </Suspense>
  )
}
