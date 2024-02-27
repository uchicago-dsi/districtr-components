# districtr-components


## Current Functionality
Providing adequate source configs, the map is currently functional for the default layers described in the README file. Below is a small video of what the functionality looks like with this barebones react app setup. A small setup process is required for this to work. 

[Demo Link](https://youtu.be/LgRx3P0d_i8?si=jcEdCS826v3r4qKO)

```
1. Run npx create-react-app.
2. Run npm run build in the districtr-private repo
3. Copy over all dependencies to your newly created react app and install.
4. Move the build folder over to the src directory of your new react app.
5. Supply mapbox key to the component.
```

## Component Design
The state of the component seems to be split in three places:

1. State local to the Districtr.tsx file (not updated by the districtrReducer).
2. State updated by the districtrReducer.
3. Plan information stored in the mapState (still ambiguous as to what is in here unfortunately).

The entirety of the plan information (population, color, partition it belongs to) is stored in the state map of a feature within a style source, as evidenced by colorFeature and colorFeatures functions. Whether or not this is an adequate method to store state is unclear, but as of this point, it is quite difficult to decipher what exactly is being updated each time a state is being clicked. Most of the functions that are updating the map state are configured in such a way that the naming and number of key value pairs are abstracted away (mapState, the object that presumably holds a preexisting plan is typed as any). One thing that is confusing is that there are currently several keys that are hardcoded and being updated each time a state is pressed (idealPopulation, members, units). There is also logic to potentially save the plan as blobs, but this functionality will need more testing. It would also appear that there's logic separating active(probably plan information) and non active layers (styling).

Districtr Reducer Events
Used in component and not yet used

Event Name | Params | Function
-----------|--------|---------
load_map_state | `mapState : any` | Supposedly loads a preexisting plan containing district information. Will need more testing to see how this works.
set_mapbox_map | `mapboxAccessToken: string` <br> `keydownCallBack: callback` | initializes the map, sets sources, layers, and map interactions with keydownCallBack 
remove_mapbox_map | N/A |probably removes the mapbox map
set_terrain | N/A | N/A
set_satellite | N/A | calls setLayoutProperty with terrain-option
update_unit_color | N/A | calls setLayoutProperty with satellite-option
update_active_tool | `activeTool: string` | changes the tool being applied (eraser, cursor, brush)
update_tool_options | `activeTool: ToolsConfigProps ` <br> `property: string ` <br> `value: string` | updates tool settings, seems like it is already configured for things other than the brush and eraser
set_brush_size | `payload: number` | updates the brush size to reflect what is in the input and slider
update_brush_size | `payload: ToolsConfigProps` | updates brush size appearance on Cursor
update_coloring_mode | | 
mouse_down_on_map | `payload: bool` | changes the coloring property of the Districtr state to true if brush or eraser is toggled on.
mouse_up_on_map | | changes the coloring property of the Districtr state to be false if brush or eraser is toggled on.
update_map_zoom | `payload: number` |  | adjusts the brush size according to the mapbox map zoom state
update_cursor_visibility | `payload: bool` | makes the cursor visible or invisible depending on whether the cursor hovers over the map.
user_clicked_map | `payload: { distance: number, radians: number, point: { x : number,y : number} }` |  updates the map state depending on the current active tool and the location of the press.
user_moved_mouse | `payload: { distance: number, radians: number, point: { x : number, y : number }, rad: number }` |  updates the map state depending on the current tool. seems to be streamlining an action where the user clicks and holds the mouse down to color in several counties.
set_active_unit |  `payload: string` | updates the active unit (which is the district being colored in the example case)
update_unit_name | `payload: { unit: number, name: string }`  | updates the unit name to reflect what the user has inputted into the unit modal.
mouse_left_map | | handles whenever the cursor leaves the map, in which case the cursor is hidden and any hover indicators are turned off.
toggle_unit_lock | `payload: { unit: number }` | locks the active unit, presumably this should prevent any further coloring to affect the selected unit? but it doesn't seem to work
toggle_unit_visibility | `payload : { unit: number }` | presumably changes the visibility of the selected unit, but it doesn't seem to work.
update_unit_note | | allows the user to input a small note into the current activeUnit
map_zoom_ended | `payload: {  zoom: number,  bounds: number }` | updates the zoom and bounds property on the districtr state after a finishes zooming.
map_move_ended | `payload: {  zoom: number,  bounds: number }` | updates the zoom and bounds properties on the district state on move end event
toggle_paint_by_county | | 
set_demo_labels | | 
set_demo_overlay | |
change_active_dataset | |



Barebones React Setup
```
import './App.css';
import { Districtr, generateUnits } from './build'
import "./build/districtr-mapbox-gl.css"

const COUNTIES_TILESET = {
  sourceLayer: "cb_2018_us_county_500k-6p4p3f",
  source: { type: "vector", url: "mapbox://districtr.6fcd9f0h" }
};

function App() {

  const initialViewState = {
    longitude: -95.0,
    latitude: 36.5,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 },
  }

  const sources = [
    {
      id: "counties",
      config: { type: "vector", url: "mapbox://districtr.6fcd9f0h", generateId: true }
    }
  ]

  const layers = [
    {
      name: "U.S. County Borders Interactive Layer",
      interactive: true,
      config: {
        id: "counties-draw",
        source: "counties",
        ["source-layer"]: "cb_2018_us_county_500k-6p4p3f",
        type: "fill",
        layout: {
          visibility: "visible",
        },
      },
    },
    {
      name: "U.S. County Borders",
      interactive: false,
      config: {
        id: "counties-borders",
        source: "counties",
        ["source-layer"]: "cb_2018_us_county_500k-6p4p3f",
        type: "line",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "#777777",
          "line-width": ["interpolate", ["linear"], ["zoom"], 0, 0, 7, 1],
          "line-opacity": 0.8,
        },
      },
    },
    {
      name: "U.S. County Names",
      interactive: false,
      config: {
        id: "counties-labels",
        source: "counties",
        ["source-layer"]: "cb_2018_us_county_500k-6p4p3f",
        type: "symbol",
        layout: {
          visibility: "none",
          "text-field": ["format", ["get", "basename"], { "font-scale": 0.8 }],
        },
        paint: {
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
          "text-halo-blur": 1,
        },
      },
    },
  ]

  const columnSets = {
    'counties-draw': {
      geometryKey: 'GEOID',
      columnSets: [
        {
          name: 'Population',
          type: 'population',
          total: {
            key: 'POP100',
            max: 10014009,
            min: 64,
            sum: 331449281,
            name: 'Total Population'
          }
        }
      ]
    }
  }



  return (
    <Districtr
        title="Draw 50 States"
        mapboxAccessToken={mapboxKey}
        initialViewState={initialViewState}
        sources={sources}
        layers={layers}
        unitCount={50}
        totalMembers={50}
        unitName="State"
        unitNamePlural="States"
        unitsConfig={generateUnits(null, 50, 50, "State", "States", "single", 331449281)}
        interactiveLayerIds={["counties-draw"]}
        unitType="single" // will be removed
        columnSets={columnSets} // legecy ColumnSets that will be updated.
        />
  );
}
export default App;
```



