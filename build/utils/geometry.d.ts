import { PointLike } from 'mapbox-gl';
import type { Map as MapboxMap } from 'mapbox-gl';
import { UnitConfigProps } from '../Districtr/Districtr.types';
export declare const getBoxAroundPoint: (point: {
    x: number;
    y: number;
}, radius: number) => [PointLike, PointLike];
export declare const convertBrushSizeToPixels: (mapZoom: number, size: number) => number;
export declare const getHoveredFeatures: (point: any, brushSize: number, map: MapboxMap, layerIds: string[]) => import("mapbox-gl").MapboxGeoJSONFeature[];
export declare const removeHoveredFeatures: (map: MapboxMap, features: any, layer: any) => void;
export declare const colorFeature: (map: MapboxMap, feature: any, layer: any, unit: any) => void;
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
export declare const colorFeatures: (map: MapboxMap, features: mapboxgl.MapboxGeoJSONFeature[], layer: mapboxgl.AnyLayer, unit: number, units: UnitConfigProps, activeTool: string, geometryKey: string, featureKey: string, columnKeys: string[], currentUnitAssignments: Map<string, number>, currentUnitPopulations: any, currentUnitColumnPopulations: any, lockedUnits: any) => false | {
    unitAssignments: Map<string, number>;
    unitPopulations: Map<string, number>;
    unitColumnPopulations: Map<string, number>;
    units: UnitConfigProps;
    hoveredFeatures: any[];
};
export declare const setActiveFeatures: (map: MapboxMap, layer: any, unit: any) => void;
export declare const repaintMapFeatures: (map: MapboxMap, layer: any, unitAssignments: Map<string, number>, geokey: any) => void;
export declare const getMouseParameters: (event: any, previous: any) => {
    distance: number;
    radians: number;
    point: any;
};
export declare const mapsAreEqual: (m1: any, m2: any) => boolean;
export declare function loadFeaturesFromFlatgeobufFile(map: any, data: Uint8Array, point: {
    x: number;
    y: number;
}, radius: number): Promise<{
    type: string;
    features: any[];
}>;
