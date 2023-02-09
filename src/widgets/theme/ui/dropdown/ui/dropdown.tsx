import { ChangeEvent } from 'react'

import { getCurrentThemeName } from '@/widgets/theme/lib/get-current-theme-name'
import { getThemeNames } from '@/widgets/theme/lib/get-theme-names'
import { setTheme } from '@/widgets/theme/lib/set-theme'

export default function ThemeDropdown(): JSX.Element {
  const options = getThemeNames()

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={onChange} name='themes' defaultValue={getCurrentThemeName()}>
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
    setTheme(e.target.value)
  }
}

ThemeDropdown.dispayName = 'ThemeDropdown'
