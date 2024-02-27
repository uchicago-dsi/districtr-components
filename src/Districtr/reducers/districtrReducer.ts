import mapboxgl from 'mapbox-gl'

import { getUnitColorProperty, updateUnitsColorScheme } from '../../utils/colors'
import {
  colorFeature,
  colorFeatures,
  convertBrushSizeToPixels,
  getHoveredFeatures,
  removeHoveredFeatures,
  repaintMapFeatures,
  setActiveFeatures
} from '../../utils/geometry'
import { DistrictrAction, DistrictrState } from '../Districtr.types'

export const intializeDistrictrState = (state: DistrictrState) => {
  const sourceColumnSets = state.columnSets[state.interactiveLayerIds[state.activeInteractiveLayer]].columnSets

  const columnKeys = []

  let populationSum = state.populationSum

  sourceColumnSets.forEach((columnSet) => {
    if (columnSet.total !== null && columnSet.type === 'population' && columnSet.total.key === state.featureKey) {
      populationSum = columnSet.total.sum
      columnKeys.push(columnSet.total.key)
    }

    if (columnSet.subgroups) {
      columnSet.subgroups.forEach((subgroup) => {
        columnKeys.push(subgroup.key)
      })
    }
  })

  return {
    ...state,
    populationSum,
    columnKeys
  }
}

export const districtrReducer = (state: DistrictrState, action: DistrictrAction): DistrictrState => {
  switch (action.type) {
    case 'load_map_state': {
      const { mapState } = action.payload

      const currentMap = state.mapboxMap
      const currentAccessToken = state.mapboxAccessToken

      const activeLayer = mapState.interactiveLayerIds
        ? mapState.interactiveLayerIds[mapState.activeInteractiveLayer]
        : state.interactiveLayerIds[state.activeInteractiveLayer]

      const geometryKey = mapState.geometryKey ? mapState.geometryKey : state.geometryKey
      // (map: MapboxMap, layer, unitAssignments: Map<string, number>, geokey)
      repaintMapFeatures(currentMap, activeLayer, mapState.unitAssignments, geometryKey)

      return {
        ...state,
        ...mapState,
        mapboxMap: currentMap,
        mapboxAccessToken: currentAccessToken
      }
    }
    case 'set_mapbox_map': {
      const events = state.events

      mapboxgl.accessToken = action.payload.mapboxAccessToken
      const map = new mapboxgl.Map({
        container: 'districtr-mapbox',
        style: state.mapboxStyle,
        center: state.center,
        zoom: state.zoom,
        attributionControl: false,
        pitchWithRotate: false,
        dragRotate: false,
        preserveDrawingBuffer: true,
        cooperativeGestures: false,
        dragPan: true,
        boxZoom: false,
        touchZoomRotate: true,
        transformRequest: (url, resourceType) => {
          if (resourceType === 'Source' && url.startsWith('http://api.districtr.org')) {
            return {
              url: url,
              headers: {
                Authorization: 'Token *FUTURE TOKEN*',
                'Access-Control-Allow-Origin': '*'
              }
            }
          }
        }
      })

      // const map = structuredClone(action.payload.map)

      map.on('load', () => {
        // Add custome map sources not in style
        if (state.sources.length > 0) {
          state.sources.forEach((source) => {
            map.addSource(source.id, source.config)
            // if (!map.getSource(source.id)) {
            //   map.addSource(source.id, source.config)
            // }
          })
        }

        // Add custom map layers not in style
        if (state.layers.length > 0) {
          state.layers.forEach((layer) => {
            if (map.getLayer(layer.config.id)) {
              map.removeLayer(layer.config.id)
            }
            map.addLayer(layer.config)
          })
        }

        // Add the interactive drawing layers
        for (const layerId of state.interactiveLayerIds) {
          const defaultInteractiveColorScheme = getUnitColorProperty(state.units)
          if (layerId === state.interactiveLayerIds[state.activeInteractiveLayer]) {
            map.setPaintProperty(layerId, 'fill-color', defaultInteractiveColorScheme)
            map.setPaintProperty(layerId, 'fill-opacity', [
              'case',
              ['==', ['feature-state', 'hidden'], true],
              0,
              ['==', ['feature-state', 'active'], true],
              0.8,
              1
            ])
          } else {
            map.setPaintProperty(layerId, 'fill-opacity', 0)
          }
        }

        events.forEach(([event, callback]) => {
          map.on(event, callback)
        })

        //calculate the brush size in pixels

        const layer = map.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer])
        if (layer) {
          const features = map.queryRenderedFeatures(null, { layers: [layer.id] })
          features.forEach((feature) => {
            const unitId = feature.properties[state.geometryKey]
            const unitAssignment = state.unitAssignments.get(unitId)
            if (unitAssignment) {
              colorFeature(map, feature, layer, unitAssignment)
            }
          })
        }

        map.fitBounds(state.initialViewState.bounds, state.initialViewState.fitBoundsOptions)
        map.setProjection('mercator')
        const zoom = map.getZoom()
        if (zoom && state.brushSize) {
          const brushSize = convertBrushSizeToPixels(map.getZoom(), state.brushSize)

          if (brushSize) {
            return {
              ...state,
              mapboxMap: map,
              brushSize: brushSize
            }
          }
        }
      })

      map.getCanvas().addEventListener('keydown', action.payload.keydownCallBack)
      return {
        ...state,
        mapboxMap: map
      }
    }

    case 'remove_mapbox_map': {
      state.mapboxMap.remove()
      return {
        ...state,
        mapboxMap: null
      }
    }

    case 'set_terrain': {
      if (!state.mapboxMap || !state.mapboxMap.getLayer('terrain-option')) {
        return
      }
      state.mapboxMap.setLayoutProperty('terrain-option', 'visibility', action.show ? 'visible' : 'none')

      return {
        ...state,
        terrain: action.show
      }
    }
    case 'set_satellite': {
      if (!state.mapboxMap || !state.mapboxMap.getLayer('satellite-option')) {
        return
      }
      state.mapboxMap.setLayoutProperty('satellite-option', 'visibility', action.show ? 'visible' : 'none')

      return {
        ...state,
        satellite: action.show
      }
    }
    case 'update_unit_color': {
      const newUnits = state.units

      if (!newUnits[action.payload.unit]) {
        return state
      }

      if (newUnits[action.payload.unit].color === action.payload.color) {
        return state
      }

      newUnits[action.payload.unit].color = action.payload.color

      const newPalette = []
      for (const unit in newUnits) {
        newPalette.push(newUnits[unit].color)
      }

      const updatedUnits = updateUnitsColorScheme(newUnits, newPalette)

      const layer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer])
      const defaultInteractiveColorScheme = getUnitColorProperty(updatedUnits)

      state.mapboxMap.setPaintProperty(layer.id, 'fill-color', defaultInteractiveColorScheme)

      return {
        ...state,
        units: updatedUnits,
        palette: newPalette
      }
    }
    case 'update_active_tool': {
      const tool = action.payload.activeTool
      const drawingTools = ['brush', 'eraser']
      const panningTools = ['pan']
      if (drawingTools.includes(tool)) {
        state.mapboxMap.dragPan.disable()
        state.mapboxMap.doubleClickZoom.disable()
        state.mapboxMap.touchZoomRotate.disable()
        state.mapboxMap.getCanvas().style.cursor = 'none'
      } else if (panningTools.includes(tool)) {
        state.mapboxMap.getCanvas().style.cursor = 'grab'
        state.mapboxMap.dragPan.enable()
        state.mapboxMap.doubleClickZoom.enable()
        state.mapboxMap.touchZoomRotate.enable()
      } else {
        state.mapboxMap.dragPan.enable()
        state.mapboxMap.doubleClickZoom.enable()
        state.mapboxMap.touchZoomRotate.enable()
        state.mapboxMap.getCanvas().style.cursor = 'default'
      }

      return {
        ...state,
        activeTool: action.payload.activeTool
      }
    }
    case 'update_tool_options': {
      if (action.payload.property === 'size') {
        return {
          ...state,
          tools: {
            ...state.tools,
            [action.payload.tool]: {
              ...state.tools[action.payload.tool],
              [action.payload.property]: action.payload.value
            }
          }
        }
      }
      return {
        ...state,
        tools: {
          ...state.tools,
          [action.payload.tool]: {
            ...state.tools[action.payload.tool],
            [action.payload.property]: action.payload.value
          }
        }
      }
    }
    case 'set_brush_size': {
      const zoom = state.mapboxMap.getZoom()
      if (zoom) {
        const brushSizePixels = convertBrushSizeToPixels(zoom, action.payload)
        return {
          ...state,
          brushSize: brushSizePixels,
          brushSizeValue: action.payload
        }
      }

      return {
        ...state
      }
    }
    case 'update_brush_size': {
      const zoom = state.mapboxMap.getZoom()
      if (zoom) {
        const brushSizePixels = convertBrushSizeToPixels(state.zoom, state.brushSizeValue)
        return {
          ...state,
          brushSize: brushSizePixels
        }
      }

      return {
        ...state
      }
    }
    case 'update_coloring_mode': {
      return {
        ...state,
        coloring: action.payload
      }
    }
    case 'mouse_down_on_map': {
      if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
        //state.mapboxMap.getCanvas().style.cursor = 'crosshair'
        return {
          ...state,
          coloring: true
        }
      }
      //state.mapboxMap.getCanvas().style.cursor = ''
      return {
        ...state,
        coloring: false
      }
    }
    case 'mouse_up_on_map': {
      if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
        //state.mapboxMap.getCanvas().style.cursor = 'crosshair'
        return {
          ...state,
          coloring: false
        }
      }
      //state.mapboxMap.getCanvas().style.cursor = ''
      return {
        ...state,
        coloring: false
      }
    }
    case 'update_map_zoom': {
      const brushSizePixels = convertBrushSizeToPixels(action.payload, state.brushSizeValue)

      return {
        ...state,
        brushSize: brushSizePixels,
        zoom: action.payload
      }
    }
    case 'update_cursor_visibility': {
      // Need to also check for drawing mode
      if (action.payload) {
        //state.mapboxMap.getCanvas().style.cursor = 'crosshair'
      } else {
        //state.mapboxMap.getCanvas().style.cursor = ''
      }

      return {
        ...state,
        cursorVisible: action.payload
      }
    }
    case 'user_clicked_map': {
      if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
        const interactiveLayer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer])
        const features = getHoveredFeatures(action.payload.point, state.brushSize, state.mapboxMap, [
          interactiveLayer.id
        ])

        if (state.hoveredFeatures.length > 0) {
          removeHoveredFeatures(state.mapboxMap, state.hoveredFeatures, interactiveLayer)
        }

        const results = colorFeatures(
          state.mapboxMap,
          features,
          interactiveLayer,
          state.activeUnit,
          state.units,
          state.activeTool,
          state.geometryKey,
          state.featureKey,
          state.columnKeys,
          state.unitAssignments,
          state.unitPopulations,
          state.unitColumnPopulations,
          state.lockedUnits
        )

        if (results) {
          return {
            ...state,
            unitAssignments: results.unitAssignments,
            unitPopulations: results.unitPopulations,
            unitColumnPopulations: results.unitColumnPopulations,
            units: results.units,
            hoveredFeatures: results.hoveredFeatures
          }
        }
      }
      return {
        ...state
      }
    }
    case 'user_moved_mouse': {
      const threshold = state.brushSize / action.payload.offsetFactor
      const distance = action.payload.distance

      if (distance < threshold) {
        return {
          ...state
        }
      }

      const interactiveLayer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer])
      if (!interactiveLayer) {
        return {
          ...state
        }
      }

      let features = getHoveredFeatures(action.payload.point, state.brushSize, state.mapboxMap, [interactiveLayer.id])

      if (state.hoveredFeatures.length > 0) {
        removeHoveredFeatures(state.mapboxMap, state.hoveredFeatures, interactiveLayer)
      }

      if (state.coloring) {
        if (state.paintByCounty) {
          const countyGEOIDs = new Set()

          features.forEach((feature) => {
            const geoid = feature.properties.GEOID20
            const countyGEOID = geoid.slice(0, 5)
            countyGEOIDs.add(countyGEOID)
          })

          let shouldPaint = false
          // block just checks whether the county Geoid is already painted?
          for (const countyGEOID of countyGEOIDs) {
            if (!state.paintedCountyGEOIDs.has(countyGEOID)) {
              shouldPaint = true
              state.paintedCountyGEOIDs.add(countyGEOID)
            }
          }

          if (shouldPaint && countyGEOIDs.size > 0) {
            //@ts-ignore
            const countyFeatures = state.mapboxMap.queryRenderedFeatures({
              //@ts-ignore
              layers: [interactiveLayer.id],
              filter: ['match', ['slice', ['get', 'GEOID20'], 0, 5], [...countyGEOIDs], true, false]
            })

            features = countyFeatures
          }
        }

        const results = colorFeatures(
          state.mapboxMap,
          features,
          interactiveLayer,
          state.activeUnit,
          state.units,
          state.activeTool,
          state.geometryKey,
          state.featureKey,
          state.columnKeys,
          state.unitAssignments,
          state.unitPopulations,
          state.unitColumnPopulations,
          state.lockedUnits
        )

        if (results) {
          return {
            ...state,
            unitAssignments: results.unitAssignments,
            unitPopulations: results.unitPopulations,
            unitColumnPopulations: results.unitColumnPopulations,
            units: results.units,
            hoveredFeatures: results.hoveredFeatures
          }
        }

        return {
          ...state
        }
      }

      if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
        if (!interactiveLayer) {
          return {
            ...state
          }
        }

        if (features.length > 0) {
          features.forEach((feature) => {
            state.mapboxMap.setFeatureState(
              {
                // @ts-ignore
                source: interactiveLayer.source,
                // @ts-ignore
                sourceLayer: interactiveLayer.sourceLayer,
                id: feature.id
              },
              {
                ...feature.state,
                hover: true
              }
            )
          })
        }

        return {
          ...state,
          hoveredFeatures: features
        }
      } else {
        return {
          ...state
        }
      }
    }
    case 'set_active_unit': {
      let newActiveUnit = 1
      if (action.payload === 'next') {
        if (state.activeUnit === Object.keys(state.units).length) {
          newActiveUnit = 1
        } else {
          newActiveUnit = state.activeUnit + 1
        }
      } else if (action.payload === 'previous') {
        if (state.activeUnit === 1) {
          newActiveUnit = Object.keys(state.units).length
        } else {
          newActiveUnit = state.activeUnit - 1
        }
      } else {
        newActiveUnit = parseInt(action.payload)
      }

      setActiveFeatures(state.mapboxMap, state.interactiveLayerIds[state.activeInteractiveLayer], newActiveUnit)

      return {
        ...state,
        activeUnit: newActiveUnit,
        paintedCountyGEOIDs: new Set()
      }
    }
    case 'update_unit_name': {
      const newUnits = state.units
      newUnits[action.payload.unit].name = action.payload.name
      return {
        ...state,
        units: newUnits
      }
    }
    case 'mouse_left_map': {
      if (state.hoveredFeatures.length > 0) {
        const interactiveLayer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer])
        removeHoveredFeatures(state.mapboxMap, state.hoveredFeatures, interactiveLayer)
      }
      return {
        ...state,
        hoveredFeatures: [],
        cursorVisible: false,
        coloring: false
      }
    }
    case 'toggle_unit_lock': {
      const unit = state.activeUnit
      const newLockedUnits = state.lockedUnits

      if (newLockedUnits.has(unit)) {
        newLockedUnits.delete(unit)
        return {
          ...state,
          lockedUnits: newLockedUnits
        }
      } else {
        newLockedUnits.add(unit)
        return {
          ...state,
          lockedUnits: newLockedUnits
        }
      }
    }
    case 'toggle_unit_visibility': {
      const unit = action.payload.unit
      const newHiddenUnits = state.hiddenUnits

      if (newHiddenUnits.has(unit)) {
        newHiddenUnits.delete(unit)
      } else {
        newHiddenUnits.add(unit)
      }

      const features = state.mapboxMap.queryRenderedFeatures({
        //@ts-ignore
        layers: [state.interactiveLayerIds[state.activeInteractiveLayer]]
      })

      features.forEach((feature) => {
        if (newHiddenUnits.has(feature.state.unit)) {
          state.mapboxMap.setFeatureState(
            {
              source: feature.source,
              sourceLayer: feature.sourceLayer,
              id: feature.id
            },
            {
              ...feature.state,
              hidden: true
            }
          )
        } else {
          state.mapboxMap.setFeatureState(
            {
              source: feature.source,
              sourceLayer: feature.sourceLayer,
              id: feature.id
            },
            {
              ...feature.state,
              hidden: false
            }
          )
        }
      })
      return {
        ...state,
        hiddenUnits: newHiddenUnits
      }
    }
    case 'update_unit_note': {
      const newUnits = state.units
      newUnits[action.payload.unit].note = action.payload.note
      return {
        ...state,
        units: newUnits
      }
    }
    case 'map_zoom_ended': {
      return {
        ...state,
        zoom: action.payload.zoom,
        bounds: action.payload.bounds
      }
    }
    case 'map_move_ended': {
      repaintMapFeatures(
        state.mapboxMap,
        state.interactiveLayerIds[state.activeInteractiveLayer],
        state.unitAssignments,
        state.geometryKey
      )

      return {
        ...state,
        center: action.payload.center,
        bounds: action.payload.bounds
      }
    }
    case 'toggle_paint_by_county': {
      if (!state.paintByCounty) {
        const b = state.initialViewState.bounds

        state.mapboxMap.setMaxBounds([
          [b[0][0] - 0.5, b[0][1] - 0.5],
          [b[1][0] + 0.5, b[1][1] + 0.5]
        ])
        state.mapboxMap.setZoom(1)
        state.mapboxMap.setMaxZoom(state.mapboxMap.getZoom() + 0.2)
        return {
          ...state,
          paintByCounty: !state.paintByCounty
        }
      }

      state.mapboxMap.setMaxBounds()
      state.mapboxMap.setMaxZoom()
      return {
        ...state,
        paintByCounty: !state.paintByCounty
      }
    }
    case 'set_demo_labels': {
      const layer = state.mapboxMap.getLayer('vtd-centroids')

      if (action.payload.key === state.activeDemoLabel) {
        if (layer) {
          state.mapboxMap.setLayoutProperty('vtd-centroids', 'visibility', 'none')
        }

        return {
          ...state,
          activeDemoLabel: ''
        }
      }

      // change the text field for the layer

      if (layer) {
        state.mapboxMap.setLayoutProperty('vtd-centroids', 'visibility', 'visible')
        state.mapboxMap.setLayoutProperty('vtd-centroids', 'text-field', ['get', `${action.payload.key}`])
      }

      return {
        ...state,
        activeDemoLabel: action.payload.key
      }
    }
    case 'set_demo_overlay': {
      const layer = state.mapboxMap.getLayer('demo-density')

      if (action.payload.key === state.activeDemoOverlay) {
        if (layer) {
          state.mapboxMap.setLayoutProperty('demo-density', 'visibility', 'none')
        }

        return {
          ...state,
          activeDemoOverlay: ''
        }
      }

      const demoStyling = [
        'match',
        ['get', `${action.payload.key}`],
        0,
        '#f7fcf5',
        [1],
        '#e5f5e0',
        [2],
        '#c7e9c0',
        [3],
        '#a1d99b',
        [4],
        '#74c476',
        [5],
        '#41ab5d',
        [6],
        '#238b45',
        [7],
        '#006d2c',
        [8],
        '#00441b',
        [9],
        '#000000',
        '#FFFFFF'
      ]

      if (layer) {
        state.mapboxMap.setLayoutProperty('demo-density', 'visibility', 'visible')
        state.mapboxMap.setPaintProperty('demo-density', 'fill-color', demoStyling)
      }

      return {
        ...state,
        activeDemoOverlay: action.payload.key
      }
    }
    case 'change_active_dataset': {
      const demoLayer = state.mapboxMap.getLayer('demo-density')
      const labelLayer = state.mapboxMap.getLayer('vtd-centroids')

      if (labelLayer) {
        state.mapboxMap.setLayoutProperty('vtd-centroids', 'visibility', 'none')
      }

      if (demoLayer) {
        state.mapboxMap.setLayoutProperty('demo-density', 'visibility', 'none')
      }

      return {
        ...state,
        activeDemoOverlay: '',
        activeDemoLabel: ''
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
