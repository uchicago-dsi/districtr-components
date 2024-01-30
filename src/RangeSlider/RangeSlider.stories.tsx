import React from 'react'

import RangeSlider from './RangeSlider'

export default {
  title: 'RangeSlider',
  component: RangeSlider,
  argTypes: {
    align: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' }
    }
  }
}
const Template = ({ align, min, max, ...rest }) => {
  return <RangeSlider align={align} min={min} max={max} />
}

export const Default = Template.bind({})
Default.args = {
  align: 'horizontal',
  min: 1,
  max: 1000
}
