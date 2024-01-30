import type { AnyLayer, AnySourceData, FillLayer, FitBoundsOptions, LineLayer, LngLatBoundsLike, Map, MapboxEvent, PaddingOptions, SymbolLayer } from 'mapbox-gl';
import { ColorPickerProps } from '../ColorPicker/ColorPicker.types';
import { RangeSliderProps } from '../RangeSlider/RangeSlider.types';
export interface UnitProps {
    /** The unit number */
    id: number;
    /** The district name */
    name?: string;
    /** The district type */
    type?: 'single' | 'multi' | 'multi-varying';
    /** Number of seats available. Not a sub unit.  */
    members?: number;
    /** The district color */
    color?: string;
    /** The district color when hovered. */
    hoverColor?: string;
    /** The district color when selected. */
    selectedColor?: string;
    /** The district color when locked. */
    lockedColor?: string;
    /** The district color when disabled */
    disabledColor?: string;
    /** The population of the unit. */
    population?: number;
    /** The ideal population of the unit. */
    idealPopulation?: number;
    unitIdealPopulation?: number;
    columnPopulations?: any;
    /** The total number of units. */
    totalUnits?: number;
    /** Remove from stack */
    stashed?: boolean;
    note?: string;
}
export interface ColumnSetSubgroup {
    key: string;
}
export interface ColumnSetTotal {
    key: string;
    max: number;
    min: number;
    sum: number;
    name: string;
}
export interface SourceColumnSet {
    name: string;
    type: string;
    total: ColumnSetTotal;
    subgroups: ColumnSetSubgroup[];
}
export interface InteractiveLayer {
    geometryKey: string;
    columnSets: SourceColumnSet[];
}
export interface ColumnSets {
    [key: string]: InteractiveLayer;
}
export interface UnitConfigProps {
    [key: number]: UnitProps;
}
export interface SourceProps {
    /** id for the Mapbox GL source */
    id: string;
    /** Mapbox Source configuration */
    config: AnySourceData;
}
export interface LayerProps {
    /** id for the Mapbox GL layer */
    name: string;
    /** is this an interactive layer */
    interactive: boolean;
    /** Mapbox Layer configuration */
    config: AnyLayer | FillLayer | LineLayer | SymbolLayer;
}
export interface ViewState {
    /** Initial longitude at map center. Defaults to Lower 48 center.
     * @default -95.0
     */
    longitude?: number;
    /** Initial latitude at map center.  Defaults to Lower 48 center.
     * @default 36.5
     */
    latitude?: number;
    /** Initial zoom level for map
     * @default 5
     */
    zoom?: number;
    /** Map rotation
     * @default 0
     */
    bearing?: number;
    /** Map angle in degrees for camera looking at ground.
     * @default 0
     */
    pitch?: number;
    /** Padding optons */
    padding?: PaddingOptions;
}
export interface InitialViewStateProps extends ViewState {
    /** Initial bounds for map. If supplied these will override the map center coordinates.
     * @default [[-125.0, 24.0], [-66.0, 50.0]]
     */
    bounds?: LngLatBoundsLike;
    /** Fit Bounds options
     * @default { padding: 20 }
     */
    fitBoundsOptions?: FitBoundsOptions;
}
export interface ActiveToolProps {
    /** The name of the active tool. */
    name: 'pan' | 'brush' | 'eraser' | 'inspect';
}
export interface AnyInputProps {
    /** The type of input for the option */
    type: 'rangeSlider' | 'colorPicker' | 'checkbox' | 'radio' | 'select';
    /** The name of the option */
    name: string;
    /** The property that the input controls on the tool */
    property: string;
    /** The configuration for the input */
    config: ColorPickerProps | RangeSliderProps;
}
export interface AnyToolProps {
    /** The name of the tool */
    name: string;
    /** The icon for the tool */
    icon: string;
    /** The tooltip for the tool */
    tooltip: string;
    /** The cursor for the tool */
    cursor: string;
    /** The keyboard shortcut for the tool. */
    shortcut?: string;
    /** Is the tool enabled
     * @default true
     */
    enabled?: boolean;
}
export interface BrushToolProps extends AnyToolProps {
    /** The size of the brush in meters.
     * @default 5000
     */
    size: number;
    /** The brush tool options configuration */
    options?: {
        /** the inputs and their configuration */
        inputs: AnyInputProps[];
    };
}
export interface ToolsConfigProps {
    /** The default tool */
    brush?: BrushToolProps;
    eraser?: BrushToolProps;
    pan?: AnyToolProps;
}
export interface DistrictrProps {
    /** ID for the Mapbox GL instance
     * @default "districtr-map"
     */
    mapboxContainerId?: string;
    /** Title for the mapping problem */
    title?: string;
    /** Mapbox GL access token. Required. */
    mapboxAccessToken: string;
    /** InitialViewState */
    initialViewState?: InitialViewStateProps;
    /** Mapbox style URL. Defaults to Mapbox Light.
     * @default "mapbox://styles/mapbox/light-v11"
     */
    mapStyle?: string;
    /** Array of Sources to add to the Mapbox map */
    sources?: SourceProps[];
    /** Array of Layers to add to the Mapbox map */
    layers?: LayerProps[];
    /** The source for the layer which the user draws map units/districts on. */
    interactiveLayerIds: string[];
    /** Unit configuration */
    unitsConfig: UnitConfigProps;
    /** Old columnset structures for testing */
    columnSets?: ColumnSets;
    /** Tools available and their configurations */
    toolsConfig?: ToolsConfigProps;
    mapState?: any;
    /** Function to send saved map information to */
    setMapState?: (mapData: any) => void;
    saveEnabled?: boolean;
    /** Data used for geo analysis */
    compositorData?: any;
    theme?: any;
}
export type ViewStateChangeEvent = (MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & {
    type: 'movestart' | 'move' | 'moveend' | 'zoomstart' | 'zoom' | 'zoomend';
    viewState: ViewState;
}) | (MapboxEvent<MouseEvent | TouchEvent | undefined> & {
    type: 'rotatestart' | 'rotate' | 'rotateend' | 'dragstart' | 'drag' | 'dragend' | 'pitchstart' | 'pitch' | 'pitchend';
    viewState: ViewState;
});
export type DistrictrState = {
    mapboxMap: Map;
    mapboxAccessToken: string;
    mapboxStyle: string;
    mapboxContainer: string;
    initialViewState: InitialViewStateProps;
    terrain: boolean;
    satellite: boolean;
    zoom: number;
    center: [number, number];
    tools: ToolsConfigProps;
    activeTool: 'pan' | 'brush' | 'eraser' | 'inspect';
    units: UnitConfigProps;
    activeUnit: number;
    palette: string[];
    sources: SourceProps[];
    layers: LayerProps[];
    coloring: boolean;
    interactiveLayerIds: string[];
    activeInteractiveLayer: number;
    cursorVisible: boolean;
    unitAssignments: any;
    unitPopulations: any;
    unitColumnPopulations: any;
    columnKeys: string[];
    geometryKey: string;
    featureKey: string;
    populationSum: number;
    hoveredFeatures: any[];
    brushSizeValue: number;
    brushSize: number;
    events: any[];
    columnSets: ColumnSets;
    lockedUnits: any;
    hiddenUnits: any;
    /** Initial longitude at map center. Defaults to Lower 48 center.
     * @default -95.0
     */
    longitude?: number;
    /** Initial latitude at map center.  Defaults to Lower 48 center.
     * @default 36.5
     */
    latitude?: number;
    /** Map rotation
     * @default 0
     */
    bearing?: number;
    /** Map angle in degrees for camera looking at ground.
     * @default 0
     */
    pitch?: number;
    /** Padding optons */
    padding?: PaddingOptions;
    bounds?: LngLatBoundsLike;
    compositorData?: any;
    /** Are we painting units by county */
    paintByCounty?: boolean;
    /** Are county GEOIDs being painted */
    paintedCountyGEOIDs: any;
    /** Query all source features and save them here */
    allFeatures?: any;
    /** If the features have all been queried this be true */
    allFeaturesLoaded?: boolean;
    /** The key for the columnset to be displayed on the map overlay from the demo density  */
    activeDemoOverlay?: string;
    /** The key for the columnset to be displayed on the map overlay from the demo density  */
    activeDemoLabel?: string;
    changedFeatures?: any[];
    changeHistory?: [];
    historyIndex?: number;
};
export type DistrictrAction = {
    type: string;
    mapboxContainerRef?: string;
    show?: boolean;
    payload?: any;
};
