import { FC } from 'react'
import { RouteProps } from 'react-router-dom'

import Dropdown from '~/pages/dropdown'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFound from '~/pages/not-found'
import PopoverPage from '~/pages/popover'
import SettingsPage from '~/pages/settings'
import TextInput from '~/pages/text-input'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

type Route = Omit<RouteProps, 'path'> & {
  Header?: FC
  Nav?: FC
  getName: () => string
  path: string
}

export const routes = {
  main: {
    Header,
    Nav,
    getName: () => 'Main',
    path: '/main',
    element: <MainPage />,
  },
  textInput: {
    Header,
    Nav,
    getName: () => 'TextInput',
    path: '/text-input',
    element: <TextInput />,
  },
  dropdown: {
    Header,
    Nav,
    getName: () => 'Dropdown',
    path: '/dropdown',
    element: <Dropdown />,
  },
  popover: {
    Header,
    Nav,
    getName: () => 'Popover',
    path: '/popover',
    element: <PopoverPage />,
  },
  settings: {
    Header,
    Nav,
    getName: () => 'Settings',
    path: '/settings',
    element: <SettingsPage />,
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
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>

export const routeList: Route[] = Object.values(routes)
