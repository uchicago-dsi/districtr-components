import { deserialize } from 'flatgeobuf/dist/flatgeobuf-geojson.min'
import { LngLatBounds, PointLike } from 'mapbox-gl'
import type { Map as MapboxMap } from 'mapbox-gl'

import { UnitConfigProps } from '../Districtr/Districtr.types'

export const getBoxAroundPoint = (point: { x: number; y: number }, radius: number) => {
  const southwest: PointLike = [point.x + radius, point.y + radius]
  const northeast: PointLike = [point.x - radius, point.y - radius]
  const box: [PointLike, PointLike] = [northeast, southwest]
  return box
}

export const convertBrushSizeToPixels = (mapZoom: number, size: number) => {
  // https://docs.mapbox.com/help/glossary/zoom-level/#zoom-levels-and-geographical-distance
  // Zoom scale at equator
  const mapboxZoomScale = [
    78271.484, 39135.742, 19567.871, 9783.936, 4891.968, 2445.984, 1222.992, 611.496, 305.748, 152.874, 76.437, 38.219,
    19.109, 9.555, 4.777, 2.389, 1.194, 0.597, 0.299, 0.149, 0.075, 0.037, 0.019, 0.01, 0.005, 0.0
  ]

  // Limit map zoom level to the available zoom levels in the scale array
  const zoom = Math.floor(Math.min(mapZoom, mapboxZoomScale.length - 1))
  const scaleA = mapboxZoomScale[zoom]
  const scaleB = mapboxZoomScale[zoom + 1]
  const scale = scaleA + (scaleB - scaleA) * (mapZoom - zoom)

  return Math.round((size * 200) / scale)
}

export const getHoveredFeatures = (point: any, brushSize: number, map: MapboxMap, layerIds: string[]) => {
  const box: [PointLike, PointLike] = getBoxAroundPoint(point, brushSize)
  const features = map.queryRenderedFeatures(box, {
    layers: layerIds
  })
  return features
}

export const removeHoveredFeatures = (map: MapboxMap, features, layer) => {
  features.forEach((feature) => {
    map.setFeatureState(
      {
        source: layer.source,
        sourceLayer: layer.sourceLayer,
        id: feature.id
      },
      {
        hover: false
      }
    )
  })
}

export const colorFeature = (map: MapboxMap, feature, layer, unit) => {
  map.setFeatureState(
    {
      source: layer.source,
      sourceLayer: layer.sourceLayer,
      id: feature.id
    },
    {
      ...feature.state,
      unit: unit,
      hover: false
    }
  )
}

/**
 * Invoked to update colors of the interactive map
 *
 * @param map maps to state.mapboxMap
 * @param features this is set of features that are currently being hovered over
 * @param layer maps to interactiveLayer
 * @param unit maps to state.activeUnit
 * @param units
 * @param activeTool
 * @param geometryKey
 * @param featureKey
 * @param columnKeys
 * @param currentUnitAssignments
 * @param currentUnitPopulations maps to state.unitPopulations
 * @param currentUnitColumnPopulations maps to state.unitColumnPopulations
 * @param lockedUnits
 * @returns
 */
export const colorFeatures = (
  map: MapboxMap,
  features: mapboxgl.MapboxGeoJSONFeature[],
  layer: mapboxgl.AnyLayer,
  unit: number,
  units: UnitConfigProps,
  activeTool: string,
  geometryKey: string,
  featureKey: string,
  columnKeys: string[],
  currentUnitAssignments: Map<string, number>,
  currentUnitPopulations,
  currentUnitColumnPopulations,
  lockedUnits
) => {
  const assignments = new Map([...currentUnitAssignments])
  const populations = new Map()
  const columnPopulations: Map<string, number> = new Map()

  features.forEach((feature) => {
    if (lockedUnits.has(unit)) {
      return
    }

    if (feature.state.unit && lockedUnits.has(feature.state.unit)) {
      return
    }

    // When reaching this point, it is clear that lockedUnit does not contain
    // the unit that corresponds with this feature

    let paintUnit = unit

    if (activeTool === 'eraser') {
      assignments.delete(feature.properties[geometryKey])
      paintUnit = 0
    } else {
      assignments.set(feature.properties[geometryKey], unit)
      // indicates that we mapping the geometryKey to the unit in each feature
    }

    populations.set(feature.properties[geometryKey], feature.properties[featureKey])
    // indicates that we mapping this geometryKey to a corresponding featureKey

    columnKeys.forEach((columnKey) => {
      const cpop_key: string = `${columnKey}-${feature.properties[geometryKey]}`
      const cpop_value: number = feature.properties[`${columnKey}`]
      columnPopulations.set(cpop_key, cpop_value)
    })
    // Mapping string consisting of columnKey and feature.properties[geometryKey] to feature.properties[columnKey]

    colorFeature(map, feature, layer, paintUnit)
  })

  if (!mapsAreEqual(currentUnitAssignments, assignments)) {
    // line is only reached if there is no update to assignments that changes
    // one of the key-value pairs.
    return false
  }

  const newPopulations: Map<string, number> = new Map([...currentUnitPopulations, ...populations])
  // update this newPopulations by unrolling populations into currentUnitPopulations
  const newColumnPopulations: Map<string, number> = new Map([...currentUnitColumnPopulations, ...columnPopulations])
  // update newColumnPopulations by unrolling columnPopulations into currentUnitColumnPopulations
  const newUnits = units

  const updatedPopulations: Map<number, number> = new Map()
  const updatedColumnPopulations: Map<number, { [key: string]: number }> = new Map()

  if (assignments.size === 0) {
    Object.keys(newUnits)
      .map(Number)
      .every((unit) => {
        updatedPopulations.set(unit, 0)

        columnKeys.forEach((columnKey) => {
          if (!updatedColumnPopulations.has(unit)) {
            updatedColumnPopulations.set(unit, {})
          }

          const column = updatedColumnPopulations.get(unit)
          column[columnKey] = 0
          updatedColumnPopulations.set(unit, column)
        })
      })
  }

  // In this block, key for updatedColumnPopulations is number for some reason
  for (let geoid of assignments.keys()) {
    const unit = assignments.get(geoid)
    const population: number = newPopulations.get(geoid)

    if (updatedPopulations.has(unit)) {
      updatedPopulations.set(unit, updatedPopulations.get(unit) + population)
    } else {
      updatedPopulations.set(unit, population)
    }

    columnKeys.forEach((columnKey) => {
      if (!updatedColumnPopulations.has(unit)) {
        updatedColumnPopulations.set(unit, {})
      }

      const recordKey = `${columnKey}-${geoid}`
      const column = updatedColumnPopulations.get(unit)

      if (column[columnKey]) {
        column[columnKey] += newColumnPopulations.get(recordKey)
      } else {
        column[columnKey] = newColumnPopulations.get(recordKey)
      }

      updatedColumnPopulations.set(unit, column)
    })
  }

  let totalMembers = 0
  lockedUnits = new Set(lockedUnits)

  for (let unit of updatedPopulations.keys()) {
    newUnits[unit].population = updatedPopulations.get(unit)
    newUnits[unit].columnPopulations = updatedColumnPopulations.get(unit)

    if (newUnits[unit].type === 'multi-varying') {
      if (totalMembers >= newUnits[unit].totalUnits) {
        newUnits[unit].stashed = true
      } else {
        newUnits[unit].stashed = false
      }

      const ideal = newUnits[unit].idealPopulation
      const population = newUnits[unit].population

      // divide the population by the ideal and round up to the nearest integer
      const newMembers = Math.ceil(population / ideal)
      const newTotalMembersCount = totalMembers + newMembers

      if (newTotalMembersCount > newUnits[unit].totalUnits) {
        newUnits[unit].members = Math.floor(population / ideal)
      } else {
        newUnits[unit].members = Math.ceil(population / ideal)
      }

      newUnits[unit].unitIdealPopulation = ideal * newUnits[unit].members
      totalMembers += newUnits[unit].members
    }
  }

  return {
    unitAssignments: assignments,
    unitPopulations: newPopulations,
    unitColumnPopulations: newColumnPopulations,
    units: newUnits,
    hoveredFeatures: []
  }
}

export const setActiveFeatures = (map: MapboxMap, layer, unit) => {
  const paintLayer = map.getLayer(layer)
  //@ts-ignore
  const features = map.queryRenderedFeatures({ layers: [layer] })

  features.forEach((feature) => {
    if (feature.state.unit === unit) {
      map.setFeatureState(
        {
          //@ts-ignore
          source: paintLayer.source,
          //@ts-ignore
          sourceLayer: paintLayer.sourceLayer,
          id: feature.id
        },
        {
          ...feature.state,
          active: true
        }
      )
    } else {
      map.setFeatureState(
        {
          //@ts-ignore
          source: paintLayer.source,
          //@ts-ignore
          sourceLayer: paintLayer.sourceLayer,
          id: feature.id
        },
        {
          ...feature.state,
          active: false
        }
      )
    }
  })
}

export const repaintMapFeatures = (map: MapboxMap, layer, unitAssignments: Map<string, number>, geokey) => {
  const features = map.queryRenderedFeatures({
    //@ts-ignore
    layers: [layer]
  })

  const paintLayer = map.getLayer(layer)
  features.forEach((feature) => {
    const unit = unitAssignments.get(feature.properties[geokey])

    if (unit) {
      colorFeature(map, feature, paintLayer, unit)
    }
  })
}

export const getMouseParameters = (event: any, previous) => {
  const currentPoint = event.point
  let previousPoint = previous
  if (!previousPoint) {
    previousPoint = currentPoint
  }

  const dist = Math.sqrt(Math.pow(currentPoint.x - previousPoint.x, 2) + Math.pow(currentPoint.y - previousPoint.y, 2))
  const rads = Math.atan2(currentPoint.y - previousPoint.y, currentPoint.x - previousPoint.x)

  return {
    distance: dist,
    radians: rads,
    point: currentPoint
  }
}

export const mapsAreEqual = (m1, m2) => {
  return m1.size === m2.size && Array.from(m1.keys()).every((key) => m1.get(key) === m2.get(key))
}

const headerMetadata = (metadata) => {
  console.log('metadata')
}

export async function loadFeaturesFromFlatgeobufFile(
  map: any,
  data: Uint8Array,
  point: { x: number; y: number },
  radius: number
) {
  const southwest: PointLike = [point.x + radius, point.y + radius]
  const northeast: PointLike = [point.x - radius, point.y - radius]
  const southWestLatLng = map.unproject(southwest)
  const northEastLatLng = map.unproject(northeast)
  const mbbounds = new LngLatBounds(southWestLatLng, northEastLatLng)
  const bounds = {
    minX: southWestLatLng.lng,
    minY: southWestLatLng.lat,
    maxX: northEastLatLng.lng,
    maxY: northEastLatLng.lat
  }

  const iter = await deserialize(data, bounds, headerMetadata)

  const features = []
  let i = 0

  for (const feature of iter) {
    features.push({ ...feature, id: i })
    i += 1
  }

  const fc = { type: 'FeatureCollection', features }
  console.log(fc)
  return fc
}
