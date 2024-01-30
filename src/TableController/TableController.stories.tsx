import { withThemeFromJSXProvider } from '@storybook/addon-styling'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { themeDark, themeLight } from '../theme'
import TableController from './TableController'
import { ColumnSetItemData } from './TableController.types'

const total: ColumnSetItemData = {
  key: 'P2TOTPOP',
  type: 'total',
  sum: 6177224,
  name: 'Total Population',
  value: 734155
}

const demographicData: ColumnSetItemData[] = [
  {
    key: 'P2HISP',
    type: 'subgroup',
    sum: 729745,
    name: 'Hispanic or Latino',
    value: 112755,
    dataset: 'Total Population'
  },
  { key: 'P2WHITE', type: 'subgroup', sum: 2913782, name: 'White Alone', value: 102045, dataset: 'Total Population' },
  { key: 'P2BLACK', type: 'subgroup', sum: 5209246, name: 'Black Alone', value: 230112, dataset: 'Total Population' },
  {
    key: 'P2AIAN',
    type: 'subgroup',
    sum: 12055,
    name: 'American Indian and Alaska Native Alone',
    value: 1440,
    dataset: 'Total Population'
  },
  { key: 'P2ASIAN', type: 'subgroup', sum: 417962, name: 'Asian Alone', value: 28230, dataset: 'Total Population' },
  {
    key: 'P2NHPI',
    type: 'subgroup',
    sum: 2575,
    name: 'Native Hawaiian and Other Pacific Islander Alone',
    value: 223,
    dataset: 'Total Population'
  },
  {
    key: 'P2OTHER',
    type: 'subgroup',
    sum: 35314,
    name: 'Some other race alone',
    value: 18440,
    dataset: 'Total Population'
  },
  {
    key: 'P2MULTIR',
    type: 'subgroup',
    sum: 270764,
    name: 'Two or More Races',
    value: 120555,
    dataset: 'Total Population'
  }
]

export default {
  title: 'TableController',
  data: demographicData
}

export const Demographics = () => <TableController data={demographicData} total={total} />

Demographics.decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: themeLight,
      dark: themeDark
    },
    defaultTheme: 'light',
    Provider: ThemeProvider
  })
]
