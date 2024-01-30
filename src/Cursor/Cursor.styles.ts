import styled from 'styled-components'

export const StyledCursor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  background: #000;
  pointer-events: none;
  z-index: 1000;
  background: transparent;
  transform: translate(-50%, -50%);

  &.d-cursor--hidden {
    opacity: 0;
  }

  &.d-cursor--visible {
    opacity: 1;
  }
`
export const CursorBounds = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #333333;
  pointer-events: none;
  opacity: 1;

  &.d-brush-pan {
    opacity: 0;
  }
`

export const CursorCenter = styled.div`
  position: relative;
  top: calc(-50% - 4px);
  left: calc(50% - 4px);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  pointer-events: none;
`
