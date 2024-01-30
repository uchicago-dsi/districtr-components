import React from 'react'
import { BiHide, BiShow } from 'react-icons/bi'

import Button from '../Button'
import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import './LayerControl.css'
import { LayerControlProps } from './LayerControl.types'

const LayerControl: React.FC<LayerControlProps> = ({ map, layer }) => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)

  const [open, setOpen] = React.useState(false)
  const [layerName, setLayerName] = React.useState(null)
  const [layerTypeName, setLayerTypeName] = React.useState(null)
  const [visible, setVisible] = React.useState(true)
  const [opacity, setOpacity] = React.useState(1)
  const [fillColor, setFillColor] = React.useState(null)
  const [strokeColor, setStrokeColor] = React.useState(null)
  const [strokeWidth, setStrokeWidth] = React.useState(null)
  const [originalPaintProperties, setOriginalPaintProperties] = React.useState(null)
  const [originalLayoutProperties, setOriginalLayoutProperties] = React.useState(null)

  React.useEffect(() => {
    if (districtr.mapboxMap) {
      // if layer has the paint property, set the original paint properties

      if (layer.hasOwnProperty('paint')) {
        //@ts-ignore
        setOriginalPaintProperties(layer.paint)
      }

      if (layer.hasOwnProperty('layout')) {
        //@ts-ignore
        setOriginalLayoutProperties(layer.layout)
        //@ts-ignore
        if (layer.layout.visibility === 'none') {
          setVisible(false)
        }
      }

      if (layer.hasOwnProperty('id')) {
        setLayerName(
          layer.id
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .replace(/\w\S*/g, (txt) => {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            })
        )

        setLayerTypeName(
          layer.type
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .replace(/\w\S*/g, (txt) => {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            })
        )
      }
    }
  }, [])

  React.useEffect(() => {}, [open])

  const toggleVisibility = () => {
    if (visible) {
      districtr.mapboxMap.setLayoutProperty(layer.id, 'visibility', 'none')
    } else {
      districtr.mapboxMap.setLayoutProperty(layer.id, 'visibility', 'visible')
    }
    setVisible(!visible)
  }

  if (!layerName) {
    return null
  }

  return (
    <li data-testid="LayerControl" className="layer-control-panel">
      <div className="layer-control-panel__header">
        <Button accessibilityLabel="Open" size="small" pressed={open} variant="toggle" onClick={() => setOpen(!open)}>
          &#10010;
        </Button>
        <div className="layer-control-panel__title">
          {layerName} ({layerTypeName})
        </div>
        <div className="layer-control-panel__quick-actions">
          <Button accessibilityLabel="visible" size="small" variant="toggle" onClick={() => toggleVisibility()}>
            {visible ? <BiShow /> : <BiHide />}
          </Button>
        </div>
      </div>
      <div className={`layer-control-panel__content ${open ? ' layer-control-panel__open' : ''}`}>
        <div className="layer-control-panel__content__inner">
          <div className="layer-control-panel__content__inner__row">
            <label htmlFor="visibility">Visibility</label>
            <input id="visibility" type="checkbox" checked={visible} onChange={toggleVisibility} />
          </div>

          <div className="layer-control-panel__content__inner__row">
            <label htmlFor="opacity">Opacity</label>
            <input
              id="opacity"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                setOpacity(value)

                if (originalPaintProperties) {
                  if (originalPaintProperties['fill-color']) {
                    districtr.mapboxMap.setPaintProperty(layer.id, 'fill-opacity', value)
                  }
                  if (originalPaintProperties['stroke-color']) {
                    districtr.mapboxMap.setPaintProperty(layer.id, 'line-opacity', value)
                  }

                  if (originalPaintProperties['background-color']) {
                    districtr.mapboxMap.setPaintProperty(layer.id, 'background-opacity', value)
                  }
                } else {
                  if (layer.type === 'raster') {
                    districtr.mapboxMap.setPaintProperty(layer.id, 'raster-opacity', value)
                  }
                }
              }}
            />
          </div>
          {originalPaintProperties && originalPaintProperties.fill && (
            <div className="layer-control-panel__content__inner__row">
              <label htmlFor="fill-color">Fill Color</label>
              <input
                id="fill-color"
                type="color"
                value={fillColor}
                onChange={(e) => {
                  const value = e.target.value
                  setFillColor(value)
                  map.setPaintProperty(layer.id, 'fill-color', value)
                }}
              />
            </div>
          )}
          {originalPaintProperties && originalPaintProperties.stroke && (
            <div className="layer-control-panel__content__inner__row">
              <label htmlFor="stroke-color">Stroke Color</label>
              <input
                id="stroke-color"
                type="color"
                value={strokeColor}
                onChange={(e) => {
                  const value = e.target.value
                  setStrokeColor(value)
                  map.setPaintProperty(layer.id, 'line-color', value)
                }}
              />
            </div>
          )}
          {originalPaintProperties && originalPaintProperties.stroke && (
            <div className="layer-control-panel__content__inner__row">
              <label htmlFor="stroke-width">Stroke Width</label>
              <input
                id="stroke-width"
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={strokeWidth}
                onChange={(e) => {
                  const value = parseFloat(e.target.value)
                  setStrokeWidth(value)
                  map.setPaintProperty(layer.id, 'line-width', value)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default LayerControl
