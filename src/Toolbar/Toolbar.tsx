import React from 'react'
import { BiBrush, BiEraser, BiMove } from 'react-icons/bi'

import Button from '../Button'
import ColorPicker from '../ColorPicker'
import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import RangeSlider from '../RangeSlider'
import './Toolbar.css'
import { ToolbarProps } from './Toolbar.types'

const Toolbar: React.FC<ToolbarProps> = ({ position, children }) => {
  const districtr = React.useContext(DistrictrContext)
  const districtrDispatch = React.useContext(DistrictrDispatchContext)
  const [panelOpen, setPanelOpen] = React.useState<number | boolean>(false)
  const [currentColor, setCurrentColor] = React.useState(null)
  const [unitCount, setUnitCount] = React.useState(Object.keys(districtr.units).length)

  React.useEffect(() => {
    setCurrentColor(districtr.units[districtr.activeUnit].color)
    //setUnitCount(Object.keys(districtr.units).length)
  }, [])

  React.useEffect(() => {
    setCurrentColor(districtr.units[districtr.activeUnit].color)
  }, [districtr.activeUnit])

  React.useEffect(() => {}, [currentColor])

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    districtrDispatch({
      type: 'update_tool_options',
      payload: { tool: districtr.activeTool, property: e.target.name, value: e.target.value }
    })
  }

  const handleColorChange = (e) => {
    setCurrentColor(e.target.value)
    districtrDispatch({ type: 'update_unit_color', payload: { unit: districtr.activeUnit, color: e.target.value } })
  }

  const handleToolChange = (tool: string) => {
    districtrDispatch({ type: 'update_active_tool', payload: { activeTool: tool } })
  }

  const createToolButtons = () => {
    if (!districtr.tools) return null
    const toolButtons = []
    for (const [key, value] of Object.entries(districtr.tools)) {
      const tool = districtr.tools[key]
      const icon = () => {
        if (tool.name === 'brush') {
          return <BiBrush />
        } else if (tool.name === 'eraser') {
          return <BiEraser />
        } else if (tool.name === 'pan') {
          return <BiMove />
        } else {
          return tool.icon
        }
      }
      if (tool.enabled) {
        toolButtons.push(
          <li key={key} className="d-toolbar-item">
            <Button
              accessibilityLabel={`${tool.name} button`}
              variant={'toolbar'}
              pressed={districtr.activeTool === tool.name}
              onClick={() => handleToolChange(tool.name)}
            >
              {icon()}
            </Button>
          </li>
        )
      }
    }
    return toolButtons
  }

  const createToolOptions = () => {
    if (!districtr.tools) return null
    const toolOptions = []
    for (const [key, value] of Object.entries(districtr.tools)) {
      const tool = districtr.tools[key]
      if (tool.name === districtr.activeTool && tool.enabled && 'options' in tool) {
        const optionInputs = tool.options.inputs
        optionInputs.forEach((optionInput, index) => {
          if (optionInput.type === 'rangeSlider') {
            toolOptions.push(
              <li key={index} className="d-toolbar-item">
                <RangeSlider {...optionInput.config} onChange={handleOptionChange} name={optionInput.property} />
              </li>
            )
          }
          if (optionInput.type === 'colorPicker') {
            if (!districtr.units) return null

            toolOptions.push(
              <li key={index} className="d-toolbar-item">
                <Button
                  accessibilityLabel="Color Swatch"
                  variant={'swatch'}
                  onClick={() => (panelOpen === index ? setPanelOpen(false) : setPanelOpen(index))}
                  style={{ backgroundColor: currentColor }}
                />
                {panelOpen === index && (
                  <div className="d-panel d-toolbar-panel">
                    <ColorPicker color={currentColor} defaultUnitCount={unitCount} onChange={handleColorChange} />
                  </div>
                )}
              </li>
            )
          }
        })
      }
    }
    return toolOptions
  }

  const toolButtons = createToolButtons()
  const toolOptions = createToolOptions()

  return (
    <div data-testid="Toolbar" className={`d-toolbar d-toolbar--${position}`}>
      {districtr.tools && position == 'left' && (
        <>
          <ul className="d-toolbar-group d-toolbar-group--top">{toolButtons}</ul>
          <ul className="d-toolbar-group d-toolbar-group--middle">{toolOptions}</ul>
        </>
      )}

      {children}
    </div>
  )
}

export default Toolbar
