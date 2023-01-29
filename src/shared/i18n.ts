import { createInstance } from 'i18next'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const locale = 'ru'
export const i18n = createInstance()

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    lng: locale,
    fallbackLng: locale,
    ns: ['t'],
  })
  .catch(() => {
    // errorMessage('Cannot load a translation file')
  })
  .then(() => {
    // if (process.env.NODE_ENV === 'development') {
    //   Object.keys(i18n.store.data[i18n.resolvedLanguage] || {}).forEach((key) => {
    //     validate(schemas, i18n.store.data[i18n.resolvedLanguage], key)
    //   })
    // }
  })
