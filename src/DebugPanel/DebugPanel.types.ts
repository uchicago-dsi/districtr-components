import { Map } from 'mapbox-gl'
import { AnyLayer } from 'mapbox-gl'

import { LayerProps, UnitConfigProps } from '../Districtr/Districtr.types'

export interface DebugPanelProps {
  /** The Districtr Mapbox instance */
  map: Map

  /** Districtr map layer configuration */
  layers: any

  /** Districtr map problem title */
  title: string

  /** The units for the map problem */
  units: UnitConfigProps

  /** The unit currently being drawn */
  activeUnit: number

  /** The total population of all features in the current columnSet */
  sumPopulation: number
}
