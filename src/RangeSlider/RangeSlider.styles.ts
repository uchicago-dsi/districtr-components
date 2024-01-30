import styled from 'styled-components'

export const StyledRange = styled.input`
  -webkit-appearance: none;
  background: transparent;
  width: 300px;

  &::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: goldenrod;
    margin-top: -4px;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #ffffff;
  }

  &::-moz-range-track {
    width: 100px;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  &::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: goldenrod;
  }

  /*hide the outline behind the border*/
  &:-moz-focusring {
    outline: 0;
    outline-offset: -1px;
  }

  &:focus::-moz-range-track {
    background: #ccc;
  }
`

export const StyledInput = styled.input`
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  text-align: center;
  padding: 4px 2px;
  margin: 0;
  outline: none;
  border-radius: 3px;
  border: 2px solid #333;
  width: 36px;
  font-size: 0.85rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    border-color: #6a806c;
  }
`

export const StyledRangeSlider = styled.div`
  display: flex;

  &.d-rangeslider--vertical {
    margin-top: 12px;
    width: 48px;
    height: 160px;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-around;
  }

  &.d-rangeslider--horizontal {
    flex-direction: row;
    align-items: center;
  }

  &.d-rangeslider--horizontal {
    ${StyledRange} {
      height: 12px;
    }

    ${StyledInput} {
      margin-right: 6px;
    }
  }

  &.d-rangeslider--vertical {
    ${StyledRange} {
      margin-top: 10px;
      width: 100px;
      transform: rotate(270deg);
    }

    ${StyledInput} {
      margin-top: 8px;
    }
  }
`
