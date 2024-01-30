import { Map } from 'mapbox-gl'
import { AnyLayer } from 'mapbox-gl'

import { LayerProps } from '../Districtr/Districtr.types'

export interface LayerControlProps {
  map: Map
  layer: AnyLayer
}
