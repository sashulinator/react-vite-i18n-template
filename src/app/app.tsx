import './reset.css'

import '../shared/dayjs'
import '../shared/i18n'
import Layout from './layout'
import React, { Suspense } from 'react'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from '@/shared/react-query'

export default function App() {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout />
          {createPortal(<ReactQueryDevtools />, document.body)}
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  )
}
