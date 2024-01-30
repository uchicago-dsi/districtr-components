import React from 'react'

import Button from '../Button'
import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import TableController from '../TableController'
import { ColumnSetItemData } from '../TableController/TableController.types'
import UnitController from '../UnitController'
import { UnitPopulationChart } from '../UnitController/UnitPopulationChart'
import { UnitPropertiesContainer } from './UnitProperties.styles'
import { UnitPropertiesProps } from './UnitProperties.types'

const UnitProperties: React.FC<UnitPropertiesProps> = () => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)

  const [dataSets, setDataSets] = React.useState(['Population', 'Civilian Voting Age Population'])
  const [activeDataSet, setActiveDataSet] = React.useState('Population')
  const [showPanel, setShowPanel] = React.useState('')

  const [allUnitData, setAllUnitData] = React.useState(null)
  const [allData, setAllData] = React.useState(null)
  const [chartData, setChartData] = React.useState(null)
  const [allSubgroupChartData, setAllSubgroupChartData] = React.useState(null)
  const [subgroupChartData, setSubgroupChartData] = React.useState(null)
  const [keys, setKeys] = React.useState(null)

  React.useEffect(() => {
    if (!districtr.mapboxMap) {
      return
    }

    const layer = districtr.mapboxMap.getLayer(districtr.interactiveLayerIds[districtr.activeInteractiveLayer])
    if (!layer) {
      return
    }
    const mapping = districtr.columnSets[layer.id].columnSets

    const availableSets = []
    const newData = []
    const subgroupDataSets = []

    for (const [key, value] of Object.entries(mapping)) {
      const subgroupSet = []
      const demographicDataset = []

      if ('columnPopulations' in districtr.units[districtr.activeUnit]) {
        const dataset = mapping[key]
        const newDataset = {}
        availableSets.push(dataset.name)

        if ('total' in dataset && dataset.total !== null) {
          newDataset[dataset.total.name] = Math.round(
            (districtr.units[districtr.activeUnit].columnPopulations[dataset.total.key] /
              districtr.units[districtr.activeUnit].unitIdealPopulation) *
              100
          )
          newDataset['name'] = dataset.total.name
          newDataset['color'] = [districtr.units[districtr.activeUnit].color]

          const newTotalDemographic: ColumnSetItemData = {
            sum: dataset.total.sum,
            value: districtr.units[districtr.activeUnit].population,
            name: dataset.total.name,
            key: dataset.total.key,
            type: 'total',
            dataset: dataset.name
          }
          demographicDataset.push(newTotalDemographic)
        }

        if ('subgroups' in dataset) {
          newDataset['subgroups'] = {}

          dataset.subgroups.forEach((column) => {
            const value = Math.round(
              //@ts-ignore
              (districtr.units[districtr.activeUnit].columnPopulations[column.key] /
                districtr.units[districtr.activeUnit].unitIdealPopulation) *
                100
            )
            const newDemographic: ColumnSetItemData = {
              sum: column.sum,
              value: districtr.units[districtr.activeUnit].columnPopulations[column.key],
              name: column.name,
              key: column.key,
              type: 'subgroup',
              dataset: dataset.name
            }
            demographicDataset.push(newDemographic)

            //@ts-ignore
            newDataset['subgroups'][column.name] = value

            const subgroupData = {
              name: column.name,
              colors: [districtr.units[districtr.activeUnit].color]
            }
            subgroupData[column.name] = value

            subgroupSet.push([subgroupData])
          })
          newDataset['subgroups']['name'] = 'Subgroups'
          newDataset['subgroups']['colors'] = ['#4a77fe', '#4afed4', '#fefb4a', '#fe4a4a', '#4afea1']
        }
        newData.push(newDataset)
        subgroupDataSets.push(demographicDataset)
      }
    }
    if (newData.length > 0) {
      setAllData(newData)
      setChartData([{ ...newData[dataSets.indexOf(activeDataSet)] }])
      //@ts-ignore
      setAllSubgroupChartData(subgroupDataSets)
      setSubgroupChartData(subgroupDataSets[dataSets.indexOf(activeDataSet)])
      setKeys(
        Object.keys(newData[availableSets.indexOf(activeDataSet)]).filter(
          (d) => d !== 'color' && d !== 'subgroups' && d !== 'name'
        )
      )
      setDataSets(availableSets)
    }

    const newAllUnitData = Object.keys(districtr.units).map((unit) => {
      return [
        {
          name: districtr.units[unit].name,
          population: Math.round((districtr.units[unit].population / districtr.units[unit].unitIdealPopulation) * 100),
          colors: [districtr.units[unit].color]
        }
      ]
    })

    setAllUnitData(newAllUnitData)
  }, [districtr.activeUnit, districtr.units[districtr.activeUnit].population])

  React.useEffect(() => {
    if (allData) {
      setChartData([allData[dataSets.indexOf(activeDataSet)]])
      //@ts-ignore
      setSubgroupChartData(allSubgroupChartData[dataSets.indexOf(activeDataSet)])

      setKeys(
        Object.keys(allData[dataSets.indexOf(activeDataSet)]).filter(
          (d) => d !== 'color' && d !== 'subgroups' && d !== 'name'
        )
      )
    }
  }, [activeDataSet])

  return (
    <UnitPropertiesContainer data-testid="UnitProperties">
      <UnitController dataSets={dataSets} activeDataSet={activeDataSet} setActiveDataSet={setActiveDataSet} />
      <div style={{ padding: '0 8px' }}>
        <UnitPopulationChart key={districtr.units[districtr.activeUnit].id} unitId={districtr.activeUnit} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          flexDirection: 'row',
          padding: '0 8px'
        }}
      >
        <Button
          accessibilityLabel="All Units"
          fullWidth={true}
          variant="secondary"
          pressed={showPanel === 'all'}
          onClick={() => (showPanel === 'all' ? setShowPanel('') : setShowPanel('all'))}
        >
          All Units
        </Button>
        &nbsp;
        <Button
          accessibilityLabel="Demographics"
          fullWidth={true}
          variant="secondary"
          pressed={showPanel === 'demographics'}
          onClick={() => (showPanel === 'demographics' ? setShowPanel('') : setShowPanel('demographics'))}
        >
          Demographics
        </Button>
      </div>

      <div
        style={{
          marginTop: 12,
          width: '100%',
          padding: '8px',
          maxHeight: 'calc(100vh - 350px)',
          overflowY: 'scroll',
          overflowX: 'hidden'
        }}
      >
        {showPanel === 'demographics' && <TableController data={subgroupChartData} activeSet={activeDataSet} />}

        {showPanel === 'all' &&
          districtr.units &&
          Object.keys(districtr.units).map((unit) => {
            if (districtr.units[unit].population > 1) {
              return <UnitPopulationChart key={`population-chart-${unit}`} unitId={unit} variant="allUnits" />
            }
          })}
      </div>
    </UnitPropertiesContainer>
  )
}

export default UnitProperties
