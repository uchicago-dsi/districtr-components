import React, { useEffect } from 'react'

import LayerControl from '../LayerControl'
import './DebugPanel.css'
import { DebugPanelProps } from './DebugPanel.types'

const DebugPanel: React.FC<DebugPanelProps> = ({ map }) => {
  const [mapLayers, setMapLayers] = React.useState<any>(null)
  const [mapGroups, setMapGroups] = React.useState<any>(null)

  useEffect(() => {
    if (map) {
      setMapLayers(map.getStyle().layers)
    }
  }, [])

  useEffect(() => {
    setMapLayers(map.getStyle().layers)
  }, [map])

  useEffect(() => {
    if (mapLayers) {
      // if the layer.metadata.group is not already in the array, add it
      const groups = mapLayers.reduce((acc: any, layer: any) => {
        if (layer.metadata && layer.metadata['mapbox:group']) {
          if (!acc.includes(layer.metadata['mapbox:group'])) {
            //  acc.push(layer.metadata['mapbox:group'])
          }
        } else if (!layer.metadata) {
          if (!acc.includes('Districtr')) {
            acc.push('Districtr')
          }
        }
        return acc
      }, [])
      setMapGroups(groups)
    }
  }, [mapLayers])

  return (
    <div data-testid="DebugPanel" className="d-debug-panel d-debug-panel--scrollable ">
      <div className="d-debug-panel__content">
        <div className="d-debug-panel__section">
          <h4 style={{ marginBottom: 5 }}>Layer Control</h4>
          <ul className="d-debug-panel__list">
            {mapLayers && mapGroups && (
              <>
                {mapGroups.map((group) => (
                  <li key={group} className="d-debug-panel__list-item">
                    <h5>{group}</h5>
                    <ul className="d-debug-panel__list">
                      {mapLayers.map((layer) => {
                        if (!layer.metadata && group === 'Districtr') {
                          return <LayerControl key={layer.id} map={map} layer={layer} />
                        }
                      })}
                    </ul>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DebugPanel
