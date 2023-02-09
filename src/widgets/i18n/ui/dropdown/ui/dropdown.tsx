import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { getCurrentLanguage } from '@/widgets/i18n/lib/get-current-language'

export default function I18nDropdown(): JSX.Element {
  const { i18n } = useTranslation()

  const options = ['ru', 'en']

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={onChange} name='themes' defaultValue={getCurrentLanguage()}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(e.target.value)
  }
}

I18nDropdown.dispayName = 'I18nDropdown'
