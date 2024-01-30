import React from 'react'

import DebugPanel from './DebugPanel'

export default {
  title: 'DebugPanel'
}

export const WithBar = () => <DebugPanel foo="bar" />

export const WithBaz = () => <DebugPanel foo="baz" />
