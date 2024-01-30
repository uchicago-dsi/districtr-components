import React from 'react'

import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import { StyledInput, StyledRange, StyledRangeSlider } from './RangeSlider.styles'
import { RangeSliderProps } from './RangeSlider.types'

const RangeSlider: React.FC<RangeSliderProps> = ({ align, min, max, name }) => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)

  const rangeSlider = React.useRef<HTMLDivElement>(null)
  const rangeInput = React.useRef<HTMLInputElement>(null)
  const range = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    districtrDispatch({ type: 'set_brush_size', payload: parseInt(e.target.value) })
  }

  return (
    <StyledRangeSlider ref={rangeSlider} data-testid="RangeSlider" className={`d-rangeslider d-rangeslider--${align}`}>
      <StyledInput
        name={name}
        ref={rangeInput}
        type="number"
        value={districtr.brushSizeValue}
        min={min}
        onChange={handleChange}
        max={max}
        className="d-input-number"
      />
      <StyledRange
        name={name}
        ref={range}
        type="range"
        min={min}
        max={max}
        value={districtr.brushSizeValue}
        onChange={handleChange}
        className="d-range"
      />
    </StyledRangeSlider>
  )
}

export default RangeSlider
