import React, { useEffect } from 'react'

import Button from '../Button'
import DistrictrThemeProvider from '../theme'
import { StyledTableController } from './TableController.styles'
import { ColumnSetItemData, TableControllerProps } from './TableController.types'
import TableControllerItem from './TableControllerItem'

const TableController: React.FC<TableControllerProps> = ({ data, activeSet }) => {
  const [activeValue, setActiveValue] = React.useState(0)
  const [chartData, setChartData] = React.useState([])
  const [chartTotal, setChartTotal] = React.useState<ColumnSetItemData>(null)

  useEffect(() => {}, [activeValue])

  if (!data) return null

  React.useEffect(() => {
    // If the data item type is 'total', and the dataset equals activeSet, set it to a variable called 'total' and remove total from the data array
    const total = data.find((item) => item.type === 'total' && item.dataset === activeSet)
    data = data.filter((item) => item.type !== 'total')

    // Remove any item from the dataset that are not of the dataset type equal to activeSet
    data = data.filter((item) => item.dataset === activeSet)

    // sort the data so the largest value is at the top and then sort by name
    data.sort((a, b) => {
      if (a.value > b.value) {
        return -1
      }
      if (a.value < b.value) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })

    setChartData(data)
    setChartTotal(total)
  }, [data, activeSet])

  return (
    <DistrictrThemeProvider>
      <StyledTableController data-testid="TableController">
        {chartData.map((item, index) => {
          return (
            <TableControllerItem
              key={index}
              item={item}
              total={chartTotal}
              activeValue={activeValue}
              setActiveValue={setActiveValue}
            />
          )
        })}
        <Button accessibilityLabel="Coalition Builder" variant="secondary" fullWidth={true}>
          {' '}
          + Add Custom Coalition
        </Button>
      </StyledTableController>
    </DistrictrThemeProvider>
  )
}

export default TableController
