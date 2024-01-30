import styled from 'styled-components'

export const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(253, 253, 247);
  padding: 12px;
  border: 1px solid #e6e6e6;

  .d-scheme-filters {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-bottom: 12px;
    overflow: hidden;
  }

  .d-panel-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 200px;
    border: 1px solid #666666;
  }

  .d-list-item {
    display: flex;
    border-bottom: 1px solid #000000;
  }

  .d-scheme-item {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 1rem;
    font-size: 0.65rem;
    justify-content: center;
    transition: all 0.2s ease-in;
    background-color: var(--background);
    padding: 0;
    margin: 0;
  }

  .d-scheme-item:hover {
    background-color: #ffffff;
    transform: scale(1.02);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .d-scheme-item:active {
    background-color: #ffffff;
    transform: scale(1);
    box-shadow: 0;
    cursor: pointer;
  }

  .d-scheme-info {
    padding: 4px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .d-scheme-title {
    font-weight: bold;
  }

  .d-colorpicker-color {
    width: 100%;
    height: 60px;
    border-radius: 3px;
    border: 1px solid #8d8d8d;
  }

  .d-scheme-colors {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
  }

  .d-scheme-color {
    width: 100%;
    height: 100%;
  }

  .d-swatchpicker {
    padding: 4px 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .d-swatchpicker-swatch {
    padding: 3px;
    margin: 0;
  }

  .d-circle-swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #333333;
  }

  .d-panel-section {
    margin-bottom: 8px;
  }

  .d-panel-input {
    width: 100%;
  }

  .d-panel-col {
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .d-panel-col:last-of-type {
    margin-right: 0;
  }
`
