import { ToolsConfigProps } from '../Districtr/Districtr.types'

export const defaultToolConfig: ToolsConfigProps = {
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
}

export const defaultMapStyleConfig = {
  'streets-v12': {
    name: 'Streets',
    url: 'mapbox://styles/mapbox/streets-v12'
  },
  'outdoors-v12': {
    name: 'Outdoors',
    url: 'mapbox://styles/mapbox/outdoors-v12'
  },
  'light-v11': {
    name: 'Light',
    url: 'mapbox://styles/mapbox/light-v11'
  },
  'dark-v11': {
    name: 'Dark',
    url: 'mapbox://styles/mapbox/dark-v11'
  },
  'satellite-v9': {
    name: 'Satellite',
    url: 'mapbox://styles/mapbox/satellite-v9'
  },
  'satellite-streets-v12': {
    name: 'Satellite Streets',
    url: 'mapbox://styles/mapbox/satellite-streets-v12'
  },
  'navigation-day-v1': {
    name: 'Navigation Preview Day',
    url: 'mapbox://styles/mapbox/navigation-preview-day-v4'
  },
  'navigation-night-v1': {
    name: 'Navigation Preview Night',
    url: 'mapbox://styles/mapbox/navigation-preview-night-v4'
  },
  'districtr-v1': {
    name: 'Districtr Light',
    url: 'mapbox://styles/districtr/clek2rian000701o4m5zm294j'
  },
  'districtr-md-v1': {
    name: 'Districtr Maryland Light',
    url: 'mapbox://styles/districtr/cleos4lys000t01mgngsue9zw'
  },
  'districtr-pa-v1': {
    name: 'Districtr Pennsylvania Light',
    url: 'mapbox://styles/districtr/clfkmvtb1000u01ln7zpxtz0t'
  }
}
