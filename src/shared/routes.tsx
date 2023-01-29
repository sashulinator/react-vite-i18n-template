import React, { FC } from 'react'
import { RouteProps } from 'react-router-dom'

import Login from '@/pages/login/login'
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
  login: {
    Header,
    Nav,
    getName: () => 'Login',
    path: '/login',
    element: <Login />,
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
