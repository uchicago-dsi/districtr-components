import React from 'react'
import { withReactContext } from 'storybook-react-context'

import { DistrictrContext } from '../Districtr/DistrictrContext'
import { districtrReducer } from '../Districtr/reducers/districtrReducer'
import UnitProperties from './UnitProperties'

export default {
  title: 'UnitProperties',
  component: UnitProperties,
  decorators: [
    withReactContext({
      Context: DistrictrContext,
      initialState: {
        mapboxMap: null,
        mapboxAccessToken:
          'pk.eyJ1IjoiZGlzdHJpY3RyIiwiYSI6ImNqbjUzMTE5ZTBmcXgzcG81ZHBwMnFsOXYifQ.8HRRLKHEJA0AismGk2SX2g',
        mapboxStyle: 'mapbox://styles/districtr/cleos4lys000t01mgngsue9zw',
        mapboxContainer: 'districtr-mapbox',
        initialViewState: {
          bounds: [
            [-79.4877, 37.9121],
            [-75.0491, 39.723]
          ],
          longitude: -77.6114,
          latitude: 38.806,
          zoom: 10,
          bearing: 0,
          pitch: 0,
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          },
          fitBoundsOptions: {
            padding: 20
          }
        },
        terrain: true,
        satellite: false,
        zoom: 10,
        center: [-77.6114, 38.806],
        latitude: 38.806,
        longitude: -77.6114,
        bearing: 0,
        pitch: 0,
        bounds: [
          [-79.4877, 37.9121],
          [-75.0491, 39.723]
        ],
        tools: {
          brush: {
            name: 'brush',
            icon: 'B',
            tooltip: 'Brush Tool',
            cursor: 'brush',
            shortcut: 'b',
            enabled: true,
            size: 50,
            options: {
              inputs: [
                {
                  type: 'colorPicker',
                  name: 'Brush Color',
                  property: 'color',
                  config: {
                    color: '#000000',
                    defaultUnitCount: 1
                  }
                },
                {
                  type: 'rangeSlider',
                  name: 'Brush Size',
                  property: 'size',
                  config: {
                    align: 'vertical',
                    min: 1,
                    max: 100
                  }
                }
              ]
            }
          },
          pan: {
            name: 'pan',
            icon: 'P',
            tooltip: 'Pan Tool',
            cursor: 'pan',
            shortcut: 'p',
            enabled: true
          },
          eraser: {
            name: 'eraser',
            icon: 'E',
            tooltip: 'Eraser Tool',
            cursor: 'eraser',
            shortcut: 'e',
            enabled: true,
            size: 50,
            options: {
              inputs: [
                {
                  type: 'rangeSlider',
                  name: 'Eraser Size',
                  property: 'size',
                  config: {
                    align: 'vertical',
                    min: 1,
                    max: 100
                  }
                }
              ]
            }
          }
        },
        activeTool: 'pan',
        units: {
          '1': {
            name: '1st Ward Chicago',
            type: 'varying-multi',
            id: 1,
            color: '#0099cd',
            hoverColor: '#0082ae',
            selectedColor: '#00b0ec',
            lockedColor: '#e59090',
            disabledColor: '#cdcdcd',
            population: 1250,
            idealPopulation: 772153,
            unitIdealPopulation: 2000,
            members: 2,
            note: ''
          },
          '2': {
            name: '2nd Ward Chicago',
            type: 'varying-multi',
            id: 2,
            color: '#8dd3c7',
            hoverColor: '#78b3a9',
            selectedColor: '#a2f3e5',
            lockedColor: '#e59090',
            disabledColor: '#cdcdcd',
            population: 2200,
            idealPopulation: 772153,
            unitIdealPopulation: 3000,
            members: 3,
            note: ''
          },
          '3': {
            name: '3rd Ward Chicago',
            type: 'varying-multi',
            id: 3,
            color: '#cd0099',
            hoverColor: '#ae0082',
            selectedColor: '#ec00b0',
            lockedColor: '#e59090',
            disabledColor: '#cdcdcd',
            population: 3900,
            idealPopulation: 772153,
            unitIdealPopulation: 4000,
            members: 4,
            note: ''
          },
          '4': {
            name: '4th Ward Chicago',
            type: 'varying-multi',
            id: 4,
            color: '#cd0099',
            hoverColor: '#ae0082',
            selectedColor: '#ec00b0',
            lockedColor: '#e59090',
            disabledColor: '#cdcdcd',
            population: 800,
            idealPopulation: 772153,
            unitIdealPopulation: 1000,
            members: 4,
            note: ''
          }
        },
        activeUnit: 2,
        palette: [],
        sources: [],
        layers: [],
        coloring: false,
        interactiveLayerIds: ['Census Block Groups', 'Census Blocks'],
        activeInteractiveLayer: 0,
        cursorVisible: true,
        unitAssignments: {},
        unitPopulations: {},
        unitColumnPopulations: {},
        columnKeys: [],
        geometryKey: 'GEOID20',
        featureKey: 'P2TOTPOP',
        populationSum: 6177224,
        hoveredFeatures: [],
        brushSizeValue: 50,
        brushSize: 0,
        columnSets: {
          'Census Blocks': {
            geometryKey: 'GEOID20',
            columnSets: [
              {
                name: 'Population',
                type: 'population',
                total: {
                  key: 'P2TOTPOP',
                  sum: 6177224,
                  name: 'Total Population'
                },
                subgroups: [
                  {
                    key: 'P2HISP',
                    sum: 729745,
                    name: 'Hispanic or Latino'
                  },
                  {
                    key: 'P2WHITE',
                    sum: 2913782,
                    name: 'White Alone'
                  },
                  {
                    key: 'P2BLACK',
                    sum: 5209246,
                    name: 'Black Alone'
                  },
                  {
                    key: 'P2AIAN',
                    sum: 12055,
                    name: 'American Indian and Alaska Native Alone'
                  },
                  {
                    key: 'P2ASIAN',
                    sum: 417962,
                    name: 'Asian Alone'
                  },
                  {
                    key: 'P2NHPI',
                    sum: 2575,
                    name: 'Native Hawaiian and Other Pacific Islander Alone'
                  },
                  {
                    key: 'P2OTHER',
                    sum: 35314,
                    name: 'Some other race alone'
                  },
                  {
                    key: 'P2MULTIR',
                    sum: 270764,
                    name: 'Two or More Races'
                  }
                ]
              },
              {
                name: 'Civilian Voting Age Population',
                type: 'population',
                total: {
                  key: 'P4TOTPOP',
                  sum: 4815202,
                  name: 'Total Population'
                },
                subgroups: [
                  {
                    key: 'P4HISP',
                    sum: 492262,
                    name: 'Hispanic or Latino'
                  },
                  {
                    key: 'P4WHITE',
                    sum: 2401360,
                    name: 'White Alone'
                  },
                  {
                    key: 'P4BLACK',
                    sum: 1388741,
                    name: 'Black Alone'
                  },
                  {
                    key: 'P4AIAN',
                    sum: 9788,
                    name: 'American Indian and Alaska Native Alone'
                  },
                  {
                    key: 'P4ASIAN',
                    sum: 332666,
                    name: 'Asian Alone'
                  },
                  {
                    key: 'P4NHPI',
                    sum: 2035,
                    name: 'Native Hawaiian and Other Pacific Islander Alone'
                  },
                  {
                    key: 'P4OTHER',
                    sum: 23196,
                    name: 'Some other race alone'
                  },
                  {
                    key: 'P4MULTIR',
                    sum: 165154,
                    name: 'Two or More Races'
                  }
                ]
              }
            ]
          },
          'Census Block Groups': {
            geometryKey: 'GEOID20',
            columnSets: [
              {
                name: 'Population',
                type: 'population',
                total: {
                  key: 'P2TOTPOP',
                  sum: 6177224,
                  name: 'Total Population'
                },
                subgroups: [
                  {
                    key: 'P2HISP',
                    sum: 729745,
                    name: 'Hispanic or Latino'
                  },
                  {
                    key: 'P2WHITE',
                    sum: 2913782,
                    name: 'White Alone'
                  },
                  {
                    key: 'P2BLACK',
                    sum: 1795027,
                    name: 'Black Alone'
                  },
                  {
                    key: 'P2AIAN',
                    sum: 12055,
                    name: 'American Indian and Alaska Native Alone'
                  },
                  {
                    key: 'P2ASIAN',
                    sum: 417962,
                    name: 'Asian Alone'
                  },
                  {
                    key: 'P2NHPI',
                    sum: 2575,
                    name: 'Native Hawaiian and Other Pacific Islander Alone'
                  },
                  {
                    key: 'P2OTHER',
                    sum: 35314,
                    name: 'Some other race alone'
                  },
                  {
                    key: 'P2MULTIR',
                    sum: 270764,
                    name: 'Two or More Races'
                  }
                ]
              },
              {
                name: 'Civilian Voting Age Population',
                type: 'population',
                total: {
                  key: 'P4TOTPOP',
                  sum: 4815202,
                  name: 'Total Population'
                },
                subgroups: [
                  {
                    key: 'P4HISP',
                    sum: 492262,
                    name: 'Hispanic or Latino'
                  },
                  {
                    key: 'P4WHITE',
                    sum: 2401360,
                    name: 'White Alone'
                  },
                  {
                    key: 'P4BLACK',
                    sum: 1388741,
                    name: 'Black Alone'
                  },
                  {
                    key: 'P4AIAN',
                    sum: 9788,
                    name: 'American Indian and Alaska Native Alone'
                  },
                  {
                    key: 'P4ASIAN',
                    sum: 332666,
                    name: 'Asian Alone'
                  },
                  {
                    key: 'P4NHPI',
                    sum: 2035,
                    name: 'Native Hawaiian and Other Pacific Islander Alone'
                  },
                  {
                    key: 'P4OTHER',
                    sum: 23196,
                    name: 'Some other race alone'
                  },
                  {
                    key: 'P4MULTIR',
                    sum: 165154,
                    name: 'Two or More Races'
                  }
                ]
              }
            ]
          }
        },
        lockedUnits: new Set(),
        hiddenUnits: new Set(),
        events: [
          ['click', null],
          ['mouseup', null],
          ['touchend', null],
          ['mousedown', null],
          ['touchstart', null],
          ['mouseenter', null],
          ['mouseover', null],
          ['mouseleave', null],
          ['touchleave', null],
          ['mouseout', null],
          ['mousemove', null],
          ['touchmove', null],
          ['zoom', null],
          ['idle', null],
          ['moveend', null],
          ['zoomend', null]
        ]
      }
    })
  ]
}

export const Panel = () => {
  return <UnitProperties />
}

Panel.args = {
  units: {
    '1': {
      name: '1 district',
      type: 'single',
      id: 1,
      color: '#0099cd',
      hoverColor: '#0082ae',
      selectedColor: '#00b0ec',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    },
    '2': {
      name: '2 district',
      type: 'single',
      id: 2,
      color: '#ffca5d',
      hoverColor: '#d9ac4f',
      selectedColor: '#ffe86b',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    },
    '3': {
      name: '3 district',
      type: 'single',
      id: 3,
      color: '#00cd99',
      hoverColor: '#00ae82',
      selectedColor: '#00ecb0',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    },
    '4': {
      name: '4 district',
      type: 'single',
      id: 4,
      color: '#99cd00',
      hoverColor: '#82ae00',
      selectedColor: '#b0ec00',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    },
    '5': {
      name: '5 district',
      type: 'single',
      id: 5,
      color: '#cd0099',
      hoverColor: '#ae0082',
      selectedColor: '#ec00b0',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    },
    '6': {
      name: '6 district',
      type: 'single',
      id: 6,
      color: '#aa44ef',
      hoverColor: '#913acb',
      selectedColor: '#c44eff',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    },
    '7': {
      name: '7 district',
      type: 'single',
      id: 7,
      color: '#8dd3c7',
      hoverColor: '#78b3a9',
      selectedColor: '#a2f3e5',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    },
    '8': {
      name: '8 district',
      type: 'single',
      id: 8,
      color: '#bebada',
      hoverColor: '#a29eb9',
      selectedColor: '#dbd6fb',
      lockedColor: '#e59090',
      disabledColor: '#cdcdcd',
      population: 0,
      idealPopulation: 772153,
      unitIdealPopulation: 772153,
      members: 1,
      note: ''
    }
  },
  activeUnit: 1,
  palette: [],
  sources: [],
  layers: [],
  coloring: false,
  interactiveLayerIds: ['Census Block Groups', 'Census Blocks'],
  activeInteractiveLayer: 0,
  cursorVisible: true,
  unitAssignments: {},
  unitPopulations: {},
  unitColumnPopulations: {},
  columnKeys: [],
  geometryKey: 'GEOID20',
  featureKey: 'P2TOTPOP',
  populationSum: 6177224,
  hoveredFeatures: [],
  brushSizeValue: 50,
  brushSize: 0
}

Panel.argTypes = {
  activeUnit: {
    control: {
      type: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  units: {
    control: {
      type: 'object'
    }
  },
  palette: {
    control: {
      type: 'object'
    }
  }
}
