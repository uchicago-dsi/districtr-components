import styled from 'styled-components'

export const UnitPropertiesContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 48px;
  width: 300px;
  background: rgb(253, 253, 247);
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  border-left: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  max-height: 100%;
  overflow: hidden;
  box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.1);

  &.d-unit-danger {
    color: #a00000;
    background: #fac7c7;
  }

  &.d-unit-warning {
    color: #8a5c00;
    background: #fff3c2;
  }

  &.d-unit-success {
    background: #ffffff;
  }
`
