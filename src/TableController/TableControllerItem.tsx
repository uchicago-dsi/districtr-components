import React from 'react'
import { BiChevronDown, BiChevronRight, BiMapAlt } from 'react-icons/bi'
import { MdOutlineLabel } from 'react-icons/md'

import Button from '../Button'
import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import { StyledTableItem, TableItemCell, TableItemHeader } from './TableController.styles'
import { TableItemProps } from './TableController.types'

const TableControllerItem: React.FC<TableItemProps> = ({ item, total, activeValue, setActiveValue }) => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)

  const [activeValues, setActiveValues] = React.useState([])
  const [activeHeaderLabel, setActiveHeaderLabel] = React.useState(['District', 'District'])
  const [open, setOpen] = React.useState(false)
  const [datasetShareValue, setDatasetShareValue] = React.useState('')
  const [datasetShareValueRaw, setDatasetShareValueRaw] = React.useState('0')

  React.useEffect(() => {
    const totalShare: number = (item.value / total.value) * 100

    let totalShareValue: string = totalShare.toFixed(1) + '%'
    if (totalShare < 0.1 && totalShare > 0) {
      totalShareValue = '< 0.1%'
    }
    if (totalShare === 0) {
      totalShareValue = '0%'
    }

    const raw = item.value.toLocaleString()

    let datasetShare: string | number = (item.sum / total.sum) * 100

    let datasetShareValue: string = datasetShare.toFixed(1) + '%'
    if (datasetShare < 0.1 && datasetShare > 0) {
      datasetShareValue = '< 0.1%'
    }
    if (datasetShare === 0) {
      datasetShareValue = '0%'
    }

    setDatasetShareValueRaw(item.sum.toLocaleString())
    setDatasetShareValue(datasetShareValue)
    setActiveValues([totalShareValue, raw])
  }, [item, activeValue])

  const changeActiveValue = () => {
    if (activeValue === 1) {
      setActiveValue(0)
    } else {
      setActiveValue(1)
    }
  }

  const handleOverlayClick = () => {
    districtrDispatch({
      type: 'set_demo_overlay',
      payload: {
        name: item.name,
        value: item.value,
        sum: item.sum,
        dataset: item.dataset,
        type: item.type,
        key: item.key
      }
    })
  }

  const handleLabelClick = () => {
    districtrDispatch({
      type: 'set_demo_labels',
      payload: {
        name: item.name,
        value: item.value,
        sum: item.sum,
        dataset: item.dataset,
        type: item.type,
        key: item.key
      }
    })
  }

  return (
    <StyledTableItem data-testid="TableController">
      <TableItemCell className="toggle-wrapper">
        <Button accessibilityLabel="Toggle Open" pressed={open} variant="toggle" onClick={() => setOpen(!open)}>
          <BiChevronRight />
        </Button>
      </TableItemCell>
      <TableItemCell className="cell-name">{item.name}</TableItemCell>
      <TableItemCell onClick={changeActiveValue} className="cell-value">
        {districtr.activeDemoOverlay === item.key && <BiMapAlt />}
        {districtr.activeDemoLabel === item.key && <MdOutlineLabel />}
        {activeValues[activeValue]}
      </TableItemCell>

      {open && (
        <>
          <TableItemCell className="cell-wrapper">
            <div className="cell-controls">
              <Button
                accessibilityLabel="Demographic Overlay"
                pressed={districtr.activeDemoOverlay === item.key}
                size="small"
                variant="toolbar"
                style={{ marginRight: 4 }}
                onClick={handleOverlayClick}
              >
                <BiMapAlt />
              </Button>
              <Button
                accessibilityLabel="Demographic Labels"
                pressed={districtr.activeDemoLabel === item.key}
                size="small"
                variant="toolbar"
                style={{ marginRight: 4 }}
                onClick={handleLabelClick}
              >
                <MdOutlineLabel />
              </Button>
            </div>

            <div className="cell-state_left">
              {activeValue == 1 ? activeHeaderLabel[0] : activeHeaderLabel[1]}
              <br />
              {activeValue == 1 ? activeValues[0] : activeValues[1]}
            </div>

            <div className="cell-state_right">
              State
              <br />
              {activeValue == 1 ? datasetShareValue : datasetShareValueRaw}
            </div>
          </TableItemCell>
        </>
      )}
    </StyledTableItem>
  )
}

export default TableControllerItem
