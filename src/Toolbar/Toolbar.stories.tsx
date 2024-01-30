import React from 'react'

import Toolbar from './Toolbar'

export default {
  title: 'Toolbar'
}

export const WithBar = () => <Toolbar position="left" />

export const WithBaz = () => <Toolbar position="right" />
