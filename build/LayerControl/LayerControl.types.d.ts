import { Map } from 'mapbox-gl';
import { AnyLayer } from 'mapbox-gl';
export interface LayerControlProps {
    map: Map;
    layer: AnyLayer;
}
