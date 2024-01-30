import styled from 'styled-components'

export const DistrictrWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .districtr-mapbox {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 48px;
    right: 48px;
    z-index: 1;
  }
`
