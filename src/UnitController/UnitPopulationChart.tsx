import { AxisTop } from '@visx/axis'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { BarStackHorizontal, Line } from '@visx/shape'
import React from 'react'

import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import { ChartWrapper } from './UnitController.styles'

type UnitPopulationChartProps = {
  unitId: string | number
  variant?: 'default' | 'allUnits'
}

export const UnitPopulationChart = ({ unitId, variant = 'default' }) => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)
  if (!unitId || !districtr.units) return null

  const unit = districtr.units[unitId]
  const members = unit.members || 1

  const marginBottom = variant === 'default' ? 18 : 0

  const chartData = [
    {
      name: unit.name,
      population: (unit.population / unit.unitIdealPopulation) * 100
    }
  ]

  const keys = Object.keys(chartData[0]).filter((d) => d !== 'color' && d !== 'subgroups' && d !== 'name')

  const getChartStatus = () => {
    if (unit.population / unit.unitIdealPopulation > 1.2) {
      return 'danger'
    } else if (unit.population / unit.unitIdealPopulation > 1.075) {
      return 'warning'
    } else {
      return 'success'
    }
  }

  const getStartTickFormat = (value: number, data) => {
    if (variant === 'default') {
      return ''
    } else {
      return `${data[value].name}`
    }
  }

  const getIdealTickFormat = (value: number) => {
    if (variant === 'default') {
      return 'Ideal'
    } else {
      return ''
    }
  }

  const handleChartClick = (e) => {
    if (variant === 'default') {
      // districtrDispatch({ type: 'setUnitId', payload: unitId })
    } else {
      districtrDispatch({ type: 'set_active_unit', payload: unitId })
    }
  }

  return (
    <ChartWrapper
      style={{ width: '100%', height: 48, marginBottom: marginBottom }}
      onClick={(e) => handleChartClick(e)}
    >
      <ParentSize>
        {(parent) => (
          <svg width={parent.width} height={parent.height}>
            <rect width={parent.width} height={parent.height} fill="transparent" />
            <Group top={18}>
              <rect key={`background`} x={0} y={0} height={parent.height} width={parent.width} fill={'#eeeeee'} />
              <BarStackHorizontal
                data={chartData}
                keys={keys}
                height={parent.height - 18}
                width={parent.width}
                y={(d) => d.name}
                xScale={scaleLinear({
                  range: [0, parent.width],
                  domain: [0, 120]
                })}
                yScale={scaleBand({
                  range: [0, 100],
                  domain: chartData.map((d) => d.name),
                  padding: 0
                })}
                color={scaleOrdinal({
                  domain: keys,
                  range: [unit.color, '#4afed4']
                })}
              >
                {(barStacks) =>
                  barStacks.map((barStack) =>
                    barStack.bars.map((bar) => (
                      <rect
                        key={`bar-stack-${barStack.index}-${bar.index}`}
                        x={bar.x}
                        y={bar.y}
                        height={bar.height}
                        width={bar.width}
                        fill={bar.color}
                      />
                    ))
                  )
                }
              </BarStackHorizontal>
              <AxisTop
                top={0}
                scale={scaleLinear({
                  range: [0, parent.width],
                  domain: [0, 120]
                })}
                numTicks={5}
                tickLength={3}
                hideAxisLine={true}
                stroke="#000000"
                tickStroke="#ffffff"
                tickValues={[100]}
                tickFormat={(d) => getIdealTickFormat(d)}
                tickLabelProps={() => ({
                  fill: '#000000',
                  fontSize: 12,
                  textAnchor: 'middle'
                })}
              />
              <AxisTop
                top={0}
                scale={scaleLinear({
                  range: [0, parent.width],
                  domain: [0, 120]
                })}
                numTicks={5}
                tickLength={3}
                hideAxisLine={true}
                stroke="#000000"
                tickStroke="#ffffff"
                tickValues={[0]}
                tickFormat={(d) => getStartTickFormat(d, chartData)}
                tickLabelProps={() => ({
                  fill: '#000000',
                  fontSize: 11,
                  textAnchor: 'start'
                })}
              />

              {Array.from(Array(members).keys()).map((member, i) => {
                if (i + 1 === members) {
                  return null
                }
                return (
                  <Line
                    key={`member-${i}`}
                    from={{
                      x: scaleLinear({
                        domain: [0, 120],
                        range: [0, parent.width]
                      })((100 / members) * (i + 1)),
                      y: parent.height
                    }}
                    to={{
                      x: scaleLinear({
                        domain: [0, 120],
                        range: [0, parent.width]
                      })((100 / members) * (i + 1)),
                      y: 0
                    }}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                )
              })}

              {getChartStatus() === 'danger' && (
                <>
                  <rect
                    key={`background`}
                    x={0}
                    y={0}
                    height={parent.height}
                    width={parent.width}
                    fill={variant === 'default' ? '#a60000' : `${unit.hoverColor}`}
                  />
                  <text
                    key={`bar-stack-text`}
                    style={{ fontWeight: 'bold' }}
                    x={parent.width / 2}
                    y={parent.height / 2 - 5}
                    textAnchor="middle"
                    fill="#ffffff"
                  >
                    OVER +{Math.round((unit.population / unit.unitIdealPopulation) * 100 - 100) + '%'}
                  </text>
                </>
              )}

              <Line
                from={{
                  x: scaleLinear({
                    domain: [0, 120],
                    range: [0, parent.width]
                  })(0),
                  y: parent.height
                }}
                to={{
                  x: scaleLinear({
                    domain: [0, 120],
                    range: [0, parent.width]
                  })(0),
                  y: 0
                }}
                stroke="#808080"
                strokeWidth={3}
              />

              <Line
                from={{
                  x: scaleLinear({
                    domain: [0, 120],
                    range: [0, parent.width]
                  })(100),
                  y: parent.height
                }}
                to={{
                  x: scaleLinear({
                    domain: [0, 120],
                    range: [0, parent.width]
                  })(100),
                  y: 0
                }}
                stroke="#363636"
                strokeWidth={2}
              />

              <Line
                from={{
                  x: scaleLinear({
                    domain: [0, 120],
                    range: [0, parent.width]
                  })(120),
                  y: parent.height
                }}
                to={{
                  x: scaleLinear({
                    domain: [0, 120],
                    range: [0, parent.width]
                  })(120),
                  y: 0
                }}
                stroke="#808080"
                strokeWidth={3}
              />
            </Group>
          </svg>
        )}
      </ParentSize>
    </ChartWrapper>
  )
}
