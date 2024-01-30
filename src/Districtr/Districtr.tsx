import throttle from 'lodash/throttle'
import mapboxgl, { MapLayerMouseEvent, Map as MapboxMap, Point } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { BiDownload, BiHelpCircle, BiRedo, BiUndo, BiZoomIn, BiZoomOut } from 'react-icons/bi'
import { GiSewingNeedle } from 'react-icons/gi'
import { GrSatellite } from 'react-icons/gr'
import { HiArrowsExpand } from 'react-icons/hi'
import { RxGroup, RxLayers } from 'react-icons/rx'
import { TbMountain } from 'react-icons/tb'

import Button from '../Button'
import Cursor from '../Cursor'
import DebugPanel from '../DebugPanel'
import SplitStitcher from '../SplitStitcher'
import Toolbar from '../Toolbar'
import UnitProperties from '../UnitProperties'
import DistrictrThemeProvider from '../theme'
import { defaultMapStyleConfig, defaultToolConfig } from '../utils/defaultConfig'
import { getMouseParameters } from '../utils/geometry'
import { DistrictrWrapper } from './Districtr.styles'
import { DistrictrProps, ViewStateChangeEvent } from './Districtr.types'
import { DistrictrContext, DistrictrDispatchContext } from './DistrictrContext'
import { districtrReducer, intializeDistrictrState } from './reducers/districtrReducer'

const Districtr: React.FC<DistrictrProps> = ({
  mapboxContainerId = 'districtr-mapbox',
  title = 'Districtr Map',
  mapboxAccessToken,
  initialViewState = {
    longitude: -95.0,
    latitude: 36.5,
    zoom: 10,
    pitch: 0,
    bearing: 0,
    bounds: [
      [-125, 24],
      [-67, 50]
    ],
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 }
  },
  mapStyle = 'light-v11',
  sources,
  layers,
  interactiveLayerIds,
  unitsConfig,
  columnSets = {},
  mapState,
  setMapState = () => {},
  toolsConfig = defaultToolConfig,
  saveEnabled,
  compositorData
}) => {
  const mapStyleOptions = useRef(defaultMapStyleConfig)
  const mapboxContainerRef = useRef(null)

  const [districtr, districtrDispatch] = useReducer(
    districtrReducer,
    {
      mapboxMap: null,
      mapboxAccessToken: mapboxAccessToken,
      mapboxStyle: mapStyleOptions.current[mapStyle].url,
      mapboxContainer: 'districtr-mapbox',
      initialViewState: initialViewState,
      terrain: true,
      satellite: false,
      zoom: initialViewState.zoom,
      center: [initialViewState.longitude, initialViewState.latitude],
      latitude: initialViewState.latitude,
      longitude: initialViewState.longitude,
      bearing: initialViewState.bearing,
      pitch: initialViewState.pitch,
      bounds: initialViewState.bounds,
      tools: toolsConfig,
      activeTool: 'pan',
      units: unitsConfig,
      activeUnit: 1,
      palette: [],
      sources: sources,
      layers: layers,
      coloring: false,
      interactiveLayerIds: interactiveLayerIds,
      activeInteractiveLayer: 0,
      cursorVisible: true,
      unitAssignments: new Map(),
      unitPopulations: new Map(),
      unitColumnPopulations: new Map(),
      columnKeys: [],
      geometryKey: columnSets[interactiveLayerIds[0]].geometryKey,
      featureKey: columnSets[interactiveLayerIds[0]].columnSets[0].total.key,
      populationSum: columnSets[interactiveLayerIds[0]].columnSets[0].total.sum,
      hoveredFeatures: [],
      brushSizeValue: 50,
      brushSize: 100,
      columnSets: columnSets,
      lockedUnits: new Set(),
      hiddenUnits: new Set(),
      compositorData: compositorData,
      paintByCounty: false,
      paintedCountyGEOIDs: new Set(),
      changedFeatures: [],
      changeHistory: [],
      historyIndex: -1,
      events: [
        //['load', () => onLoad()],
        ['click', (e) => onMapClick(e)],
        ['mouseup', (e) => onMapMouseUp(e)],
        ['touchend', (e) => onMapMouseUp(e)],
        ['mousedown', (e) => onMapMouseDown(e)],
        ['touchstart', (e) => onMapMouseDown(e)],
        ['mouseenter', (e) => onMapMouseEnter(e)],
        ['mouseover', (e) => onMapMouseOver(e)],
        ['mouseleave', (e) => onMapMouseLeave(e)],
        ['touchleave', (e) => onMapMouseLeave(e)],
        ['mouseout', (e) => onMapMouseOut(e)],
        ['mousemove', (e) => onMapMouseMove(e)],
        ['touchmove', (e) => onMapMouseMove(e)],
        ['zoom', (e) => onMapZoom(e)],
        ['idle', () => onMapIdle()],
        ['moveend', (e) => onMapMoveEnd(e)],
        ['zoomend', (e) => onMapZoomEnd(e)]
      ]
    },
    intializeDistrictrState
  )

  // const [map, setMap] = useState<MapboxMap>(null)

  const [debug, setDebug] = useState<boolean>(false)
  const [rightPanel, setRightPanel] = useState<string>('unit')

  const [currentSave, setCurrentSave] = useState<boolean>(null)

  const [saveLoaded, setSaveLoaded] = useState<boolean>(false)

  const prevPoint = useRef<Point>(null)
  const mousePosition = useRef<{ x: number; y: number }>(null)
  const lastSaved = useRef<string>(null)


  // set map
  // useEffect(() => {
  //   console.log("set map useEffect should only be called once")
  //   mapboxgl.accessToken = mapboxAccessToken
  //   const newMap = new mapboxgl.Map({
  //     container: 'districtr-mapbox',
  //     style: districtr.mapboxStyle,
  //     center: districtr.center,
  //     zoom: districtr.zoom,
  //     attributionControl: false,
  //     pitchWithRotate: false,
  //     dragRotate: false,
  //     preserveDrawingBuffer: true,
  //     cooperativeGestures: false,
  //     dragPan: true,
  //     boxZoom: false,
  //     touchZoomRotate: true,
  //     transformRequest: (url, resourceType) => {
  //       if (resourceType === 'Source' && url.startsWith('http://api.districtr.org')) {
  //         return {
  //           url: url,
  //           headers: {
  //             Authorization: 'Token *FUTURE TOKEN*',
  //             'Access-Control-Allow-Origin': '*'
  //           }
  //         }
  //       }
  //     }
  //   })
  //   console.log("Setting Map to ", newMap);
  //   setMap(newMap)
  // }, [])

  useEffect(() => {
    const keydownCallBack = (e) => {
      if (e.key === 'q') {
        districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'pan' } })
      }
      if (e.key === 'w') {
        districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'brush' } })
      }
      if (e.key === 'e') {
        districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'eraser' } })
      }
      if (e.key === 'a') {
        districtrDispatch({ type: 'set_active_unit', payload: 'previous' })
      }
      if (e.key === 'd') {
        districtrDispatch({ type: 'set_active_unit', payload: 'next' })
      }
    }
    districtrDispatch({ type: 'set_mapbox_map', payload: { mapboxAccessToken, keydownCallBack} })
    districtrDispatch({ type: 'update_active_tool', payload: { activeTool: districtr.activeTool } })
  }, [])

  // useEffect(() => {
  //   if (!districtr.mapboxMap) {
  //     return
  //   }
  //   console.log('i fire once', "main useEffect hook");


  //   // add a keypress listener to the map
  //   districtr.mapboxMap.getCanvas().addEventListener('keydown', (e) => {
  //     if (e.key === 'q') {
  //       districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'pan' } })
  //     }
  //     if (e.key === 'w') {
  //       districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'brush' } })
  //     }
  //     if (e.key === 'e') {
  //       districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'eraser' } })
  //     }
  //     if (e.key === 'a') {
  //       districtrDispatch({ type: 'set_active_unit', payload: 'previous' })
  //     }
  //     if (e.key === 'd') {
  //       districtrDispatch({ type: 'set_active_unit', payload: 'next' })
  //     }
  //   })
  // }, [districtr.mapboxMap])

  useEffect(() => {
    if (!saveLoaded && mapState) {
      setSaveLoaded(true)

      // remove null values from mapState and events
      const mapStateWithoutNulls = Object.keys(mapState).reduce((acc, key) => {
        if (mapState[key] !== null) {
          acc[key] = mapState[key]
        }
        return acc
      }, {})

      districtrDispatch({ type: 'load_map_state', payload: { mapState: mapStateWithoutNulls } })
    }
  }, [mapState])

  useEffect(() => {
    if (!districtr.mapboxMap) {
      return
    }

    const center = districtr.mapboxMap.getCenter()
    const panOffset = 150

    if (debug) {
      districtr.mapboxMap.panTo(center, { offset: [-panOffset, 0] })
    } else {
      districtr.mapboxMap.panTo(center, { offset: [panOffset, 0] })
    }
  }, [debug])

  useEffect(() => {
    if (saveEnabled && currentSave && saveLoaded) {
      const mapData = districtr.mapboxMap.getStyle()
      const mapDataString = JSON.stringify(mapData)
      const blob = new Blob([mapDataString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = 'map.json'
      const image = districtr.mapboxMap.getCanvas().toDataURL()

      const stateData = { ...districtr }
      stateData.events = null
      stateData.mapboxMap = null

      const saveData = {}
      // for each key in the stateData, if it's a function, remove it
      for (const key in stateData) {
        if (typeof stateData[key] === 'function') {
          delete stateData[key]
        } else {
          saveData[key] = stateData[key]
        }
      }
      saveData['image'] = image
      saveData['style'] = mapData

      setMapState(saveData)
      lastSaved.current = new Date().toISOString()
    }
    setCurrentSave(false)
  }, [currentSave])

  const throttledZoomDispatch = throttle((payload) => districtrDispatch(payload), 100)
  const throttledZoomEndDispatch = throttle((payload) => districtrDispatch(payload), 100)
  const throttledMoveEndDispatch = throttle((payload) => districtrDispatch(payload), 250)

  const onMapZoom = (e: ViewStateChangeEvent) => {
    // Use the throttled function within onMapZoom
    throttledZoomDispatch({ type: 'update_map_zoom', payload: e.target.getZoom() })
  }

  const onMapZoomEnd = (e: ViewStateChangeEvent) => {
    // Use the throttled function within onMapZoomEnd
    throttledZoomEndDispatch({
      type: 'map_zoom_ended',
      payload: { zoom: e.target.getZoom(), bounds: e.target.getBounds() }
    })
  }

  const onMapMoveEnd = (e: ViewStateChangeEvent) => {
    // Use the throttled function within onMapMoveEnd
    throttledMoveEndDispatch({
      type: 'map_move_ended',
      payload: { center: e.target.getCenter(), bounds: e.target.getBounds() }
    })
  }

  const onMapMouseUp = (e: MapLayerMouseEvent) => {
    districtrDispatch({ type: 'mouse_up_on_map', payload: true })
  }

  const onMapMouseDown = (e: MapLayerMouseEvent) => {
    districtrDispatch({ type: 'mouse_down_on_map', payload: true })
  }

  const onMapClick = (e: MapLayerMouseEvent) => {
    mousePosition.current = { x: e.point.x, y: e.point.y }

    const mouseParams = getMouseParameters(e, prevPoint.current)

    districtrDispatch({
      type: 'user_clicked_map',
      payload: { distance: mouseParams.distance, radians: mouseParams.radians, point: mouseParams.point }
    })

    prevPoint.current = mouseParams.point
  }

  const throttledMoveDispatch = throttle((payload) => districtrDispatch(payload), 50)

  const onMapMouseMove = (e: MapLayerMouseEvent) => {
    mousePosition.current = { x: e.point.x, y: e.point.y }
    const cPoint = e.point
    let pPoint = prevPoint.current

    if (!pPoint) {
      prevPoint.current = cPoint
      pPoint = prevPoint.current
    }

    const dist = Math.sqrt(Math.pow(cPoint.x - pPoint.x, 2) + Math.pow(cPoint.y - pPoint.y, 2))
    const rads = Math.atan2(cPoint.y - pPoint.y, cPoint.x - pPoint.x)

    const offsetFactor = 15

    // Use the throttled function within onMapMouseMove
    throttledMoveDispatch({
      type: 'user_moved_mouse',
      payload: { distance: dist, radians: rads, offsetFactor: offsetFactor, point: cPoint }
    })

    prevPoint.current = cPoint
  }

  const onMapMouseEnter = (e: MapLayerMouseEvent) => {
    districtrDispatch({ type: 'update_cursor_visibility', payload: false })
  }

  const onMapMouseOver = (e: MapLayerMouseEvent) => {
    districtrDispatch({ type: 'update_cursor_visibility', payload: true })
  }

  const onMapMouseLeave = (e: MapLayerMouseEvent) => {
    districtrDispatch({ type: 'mouse_left_map', payload: e })
  }

  const onMapMouseOut = (e: MapLayerMouseEvent) => {
    districtrDispatch({ type: 'mouse_left_map', payload: e })
  }

  const throttledSetCurrentSave = throttle((value) => setCurrentSave(value), 60000, { trailing: false })

  const onMapIdle = () => {
    throttledSetCurrentSave(true)
  }

  const handleUndo = () => {
    districtrDispatch({ type: 'undo' })
  }

  const handleRedo = () => {
    districtrDispatch({ type: 'redo' })
  }

  return (
    <DistrictrThemeProvider>
      <DistrictrContext.Provider value={districtr}>
        <DistrictrDispatchContext.Provider value={districtrDispatch}>
          {districtr && (
            <DistrictrWrapper data-testid="Districtr" className="districtr-wrapper">
              <Toolbar position={'left'}>
                <ul className="d-toolbar-group d-toolbar-group--bottom">
                  <li className="d-toolbar-item"></li>
                </ul>
              </Toolbar>
              <div id="districtr-mapbox" className="districtr-mapbox" ref={mapboxContainerRef}></div>
              <Cursor
                visible={districtr.cursorVisible}
                size={districtr.brushSize}
                tool={districtr.activeTool}
                position={mousePosition.current}
              />
              <Toolbar position={'right'}>
                <ul className="d-toolbar-group d-toolbar-group--top">
                  <li className="d-toolbar-item">
                    <Button
                      accessibilityLabel="Zoom In"
                      variant="toolbar"
                      onClick={() => districtr.mapboxMap.zoomIn({ duration: 200 })}
                    >
                      <BiZoomIn />
                    </Button>
                  </li>
                  <li className="d-toolbar-item">
                    <Button
                      accessibilityLabel="Zoom Out"
                      variant="toolbar"
                      onClick={() => districtr.mapboxMap.zoomOut({ duration: 200 })}
                    >
                      <BiZoomOut />
                    </Button>
                  </li>

                  <li className="d-toolbar-item">
                    <Button
                      accessibilityLabel="Pan To Bounds"
                      variant="toolbar"
                      onClick={() => {
                        if (districtr.mapboxMap) {
                          districtr.mapboxMap.fitBounds(initialViewState.bounds, { duration: 200 })
                        }
                      }}
                    >
                      <HiArrowsExpand />
                    </Button>
                  </li>
                </ul>

                <ul className="d-toolbar-group d-toolbar-group--bottom">
                  <li className="d-toolbar-item">
                    <Button
                      accessibilityLabel="Unit Properties"
                      variant="toolbar"
                      pressed={rightPanel === 'unit'}
                      onClick={() => (rightPanel === 'unit' ? setRightPanel('') : setRightPanel('unit'))}
                    >
                      <RxGroup />
                    </Button>
                  </li>
                  <li className="d-toolbar-item">
                    <Button
                      accessibilityLabel="Layer Control"
                      variant="toolbar"
                      pressed={rightPanel === 'debug'}
                      onClick={() => (rightPanel === 'debug' ? setRightPanel('') : setRightPanel('debug'))}
                    >
                      <RxLayers />
                    </Button>
                  </li>
                  <li className="d-toolbar-item">
                    <Button
                      accessibilityLabel="Stitch Tool"
                      variant="toolbar"
                      pressed={rightPanel === 'stitch'}
                      onClick={() => (rightPanel === 'stitch' ? setRightPanel('') : setRightPanel('stitch'))}
                    >
                      <GiSewingNeedle />
                    </Button>
                  </li>
                </ul>

                <ul className="d-toolbar-group d-toolbar-group--bottom"></ul>
              </Toolbar>
              {rightPanel === 'debug' && (
                <DebugPanel
                  map={districtr.mapboxMap}
                  layers={districtr.layers}
                  units={districtr.units}
                  activeUnit={districtr.activeUnit}
                  sumPopulation={districtr.populationSum}
                  title={title}
                />
              )}

              {rightPanel === 'unit' && <UnitProperties />}
              {rightPanel === 'stitch' && <SplitStitcher foo={'foo'} />}
            </DistrictrWrapper>
          )}
        </DistrictrDispatchContext.Provider>
      </DistrictrContext.Provider>
    </DistrictrThemeProvider>
  )
}

export default Districtr
