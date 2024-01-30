import React, { useEffect } from 'react'

import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import { CursorBounds, CursorCenter, StyledCursor } from './Cursor.styles'
import { CursorProps } from './Cursor.types'

const Cursor: React.FC<CursorProps> = ({ position }) => {
  if (!position) return null
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)

  const cursorCircle = React.useRef<HTMLDivElement>(null)
  const cursorDot = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    districtrDispatch({ type: 'update_brush_size' })
  }, [districtr.activeTool])

  // if given the length of the diagonal of a square, return the length of the side
  const getSideLength = (diagonal: number) => {
    return Math.sqrt(2 * Math.pow(diagonal, 2))
  }

  return (
    <StyledCursor
      data-testid="Cursor"
      className={`d-cursor-${districtr.activeTool.toLowerCase()} d-cursor--${
        districtr.cursorVisible ? 'visible' : 'hidden'
      }`}
      style={{
        top: position.y + 50,
        left: position.x + 48,
        width: getSideLength(districtr.brushSize * 2),
        height: getSideLength(districtr.brushSize * 2)
      }}
    >
      <CursorBounds ref={cursorCircle} className={`d-brush-${districtr.activeTool}`} />
      <CursorCenter ref={cursorDot} />
    </StyledCursor>
  )
}

export default Cursor
