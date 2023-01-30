import React, { FC } from 'react'
import { RouteProps } from 'react-router-dom'

import LoginPage from '@/pages/login/login'
import MainPage from '@/pages/main/main'
import NotFound from '@/pages/not-found/not-found'
import Header from '@/ui/header'
import Nav from '@/ui/nav'

export type Route = Omit<RouteProps, 'path'> & {
  Header?: FC
  Nav?: FC
  getName: () => string
  path: string
}

export const routes: Record<string, Route> = {
  main: {
    Header,
    Nav,
    getName: () => 'Main',
    path: '/main',
    element: <MainPage />,
  },
  login: {
    // Header,
    // Nav,
    getName: () => 'Login',
    path: '/login',
    element: <LoginPage />,
  },
  notFound: {
    Header,
    Nav,
    getName: () => 'notFound',
    path: '*',
    element: <NotFound />,
  },
}

export const routeList = Object.values(routes)
