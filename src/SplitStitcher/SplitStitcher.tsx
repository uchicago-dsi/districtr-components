import React from 'react'
import { MdOutlineDashboardCustomize } from 'react-icons/md'

import Button from '../Button'
import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import { StyledSplitStitcher } from './SplitStitcher.styles'
import { SplitStitcherProps } from './SplitStitcher.types'

const SplitStitcher: React.FC<SplitStitcherProps> = ({ foo }) => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)

  const [splits, setSplits] = React.useState(new Map())
  const [totalFeatures, setTotalFeatures] = React.useState(9178)
  const [drawnFeatures, setDrawnFeatures] = React.useState(0)

  React.useEffect(() => {
    calculateSplits()
  }, [])

  React.useEffect(() => {
    const newSplits = new Map()
    let count = 0
    districtr.unitAssignments.forEach((value, key) => {
      count += 1
      if (!newSplits.has(key.slice(0, 5))) {
        newSplits.set(key.slice(0, 5), new Set())
      }
      newSplits.get(key.slice(0, 5)).add(value)
    })
    setSplits(newSplits)
    setDrawnFeatures(count)
  }, [districtr.unitAssignments])

  const calculateSplits = () => {
    const newSplits = new Map()
    districtr.unitAssignments.forEach((value, key) => {
      if (!newSplits.has(key.slice(0, 5))) {
        newSplits.set(key.slice(0, 5), new Set())
      }
      newSplits.get(key.slice(0, 5)).add(value)
    })
  }

  const togglePaintByCounty = () => {
    districtrDispatch({ type: 'toggle_paint_by_county' })
  }

  return (
    <StyledSplitStitcher data-testid="SplitStitcher">
      <h4>Stitch Split Counties</h4>

      <small>
        Paint by County will only paint counties that are in view. The map's bounds will be locked while drawing by
        county.
      </small>
      <br />
      <div style={{ marginTop: 12 }}>
        <Button
          accessibilityLabel="Paint By County"
          pressed={districtr.paintByCounty}
          fullWidth={true}
          variant="secondary"
          onClick={togglePaintByCounty}
        >
          {districtr.paintByCounty ? 'Turn Off Paint By County' : 'Turn On Paint By County'}
        </Button>
      </div>
      <br />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Array.from(splits).map(([key, value]) => {
          if (value.size > 1) {
            return (
              <li key={key}>
                {key} County: {value.size} Districts
              </li>
            )
          }
        })}
        <div>
          <Button accessibilityLabel="Recalculate" fullWidth={true} onClick={calculateSplits}>
            Recalculate
          </Button>
          <br />
          <small>
            <strong>
              You have drawn {drawnFeatures.toLocaleString()} of {totalFeatures.toLocaleString()} Features.
            </strong>{' '}
            To activate the Split County Tool, draw at least one county that is split between two districts or more. For
            the most accurate results from the Split County tool complete your entire map.
          </small>
        </div>
      </ul>
    </StyledSplitStitcher>
  )
}

export default SplitStitcher
