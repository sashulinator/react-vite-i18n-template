import axios from 'axios'
import { stringify } from 'qs'

import { handleUnauthorizedError } from '~/lib/auth/handle-unauthorized-error'
import { setAuthorizationHeader } from '~/lib/auth/set-authorization-header'

const refreshTokenUrl = '/api/auth/refresh'
// const loginUrl = '/login'

const api = axios.create({
  withCredentials: true,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = '*/*'

api.interceptors.request.use(setAuthorizationHeader)
api.interceptors.response.use(undefined, (error) => handleUnauthorizedError(error, refreshTokenUrl))

export default api

// Private

//
