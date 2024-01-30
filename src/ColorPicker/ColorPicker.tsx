import React, { useEffect } from 'react'

import Button from '../Button/Button'
import { DistrictrContext, DistrictrDispatchContext } from '../Districtr/DistrictrContext'
import DistrictrThemeProvider from '../theme'
import schemes from '../utils/schemes'
import { ColorPickerWrapper } from './ColorPicker.styles'
import { ColorPickerProps, ColorSchemeOption } from './ColorPicker.types'

const ColorPicker: React.FC<ColorPickerProps> = ({ color, defaultUnitCount, onChange, onInput, onInputChange }) => {
  const [sources, setSources] = React.useState(['districtr', 'cartoColors', 'colorBrewer'])
  const [unitCount, setUnitCount] = React.useState(defaultUnitCount)
  const [activeSchemeSource, setActiveSchemeSource] = React.useState('districtr')
  const [activeScheme, setActiveScheme] = React.useState('Core')
  const [activeSchemeGroup, setActiveSchemeGroup] = React.useState<string>('All')
  const [schemeGroups, setSchemeGroups] = React.useState([])
  const [colorSchemes, setColorSchemes] = React.useState([])
  const [sourceFilter, setSourceFilter] = React.useState('All')
  const [filteredColorSchemes, setFilteredColorSchemes] = React.useState([])
  const [activeColorScheme, setActiveColorScheme] = React.useState([])
  const [activeColor, setActiveColor] = React.useState<string>(color)
  const [hexInput, setHexInput] = React.useState(color)

  const inputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSchemeGroups(createSchemeGroupOptions())
    setColorSchemes(createColorSchemeOptions())

    setActiveColorScheme(getSchemeForUnits(unitCount, schemes[activeSchemeSource]['schemes'][activeScheme]))
  }, [])

  useEffect(() => {
    setFilteredColorSchemes(filterColorSchemes())
  }, [colorSchemes])

  useEffect(() => {
    setColorSchemes(createColorSchemeOptions())
  }, [unitCount])

  useEffect(() => {
    setHexInput(activeColor)
  }, [activeColor])

  useEffect(() => {
    setFilteredColorSchemes(filterColorSchemes())
    setActiveColorScheme(getSchemeForUnits(unitCount, schemes[activeSchemeSource]['schemes'][activeScheme]))
  }, [activeSchemeSource, activeSchemeGroup, activeScheme, sourceFilter])

  const filterColorSchemes = (): ColorSchemeOption[] => {
    const filteredSchemes = colorSchemes.filter((scheme) => {
      // If the source filter is set to All, and the active scheme group is set to All, return all schemes
      if (sourceFilter === 'All' && activeSchemeGroup === 'All') {
        return scheme
      }
      // If the source filter is set to All, and the active scheme group is set to a specific group, return all schemes in that group
      if (sourceFilter === 'All' && activeSchemeGroup !== 'All') {
        if (scheme.groups.includes(activeSchemeGroup)) {
          return scheme
        }
      }
      // If the source filter is set to a specific source, and the active scheme group is set to All, return all schemes in that source
      if (sourceFilter !== 'All' && activeSchemeGroup === 'All') {
        return scheme.source === sourceFilter
      }
      // If the source filter is set to a specific source, and the active scheme group is set to a specific group, return all schemes in that source and group
      if (
        sourceFilter !== 'All' &&
        activeSchemeGroup !== 'All' &&
        scheme.groups.includes(activeSchemeGroup) &&
        scheme.source === sourceFilter
      ) {
        return scheme
      }
    })
    return filteredSchemes
  }

  const createSchemeGroupOptions = (): Array<string> => {
    const schemeGroupOptions: [string] = ['All']
    const schemeGroups = ([] = sources
      .map((source) => {
        return schemes[source]['schemeGroups']
      })
      .flat())

    schemeGroups.forEach((schemeGroup) => {
      const schemes = ([] = Object.keys(schemeGroup).map((key) => {
        // add schemes to schemeChoices
        if (!schemeGroupOptions.includes(key)) {
          schemeGroupOptions.push(key)
        }
      }))
    })
    return schemeGroupOptions
  }

  const createColorSchemeOptions = (): ColorSchemeOption[] => {
    let id = 0
    const colorSchemeOptions = []

    Object.keys(schemes).forEach((source) => {
      const schemeSource = schemes[source]
      const sourceSchemes = schemeSource['schemes']
      const sourceSchemeGroups = schemeSource['schemeGroups']

      Object.keys(sourceSchemes).forEach((scheme) => {
        id++
        const schemeColors = getSchemeForUnits(unitCount, sourceSchemes[scheme])

        // for every key in the schemeGroups object
        const schemeGroups = ([] = Object.keys(sourceSchemeGroups).map((key) => {
          const schemeGroup = sourceSchemeGroups[key]
          if (schemeGroup.includes(scheme)) {
            return key
          } else {
            return null
          }
        }))

        // remove nulls from the array
        const filteredSchemeGroups = schemeGroups.filter((group) => {
          return group !== null
        })

        colorSchemeOptions.push({
          id: id,
          value: scheme,
          label: scheme,
          source: source,
          groups: filteredSchemeGroups,
          colors: schemeColors
        })
      })
    })
    return colorSchemeOptions
  }

  const getSchemeForUnits = (unitCount: number, scheme) => {
    // For each key in the colorScheme convert the value to a integer and add it to an array
    const colorSchemeChoices = ([] = Object.keys(scheme).map((key) => {
      return parseInt(key)
    }))

    // Find the colorSchemeChoice that is closest to the unitCount
    const colorKey = colorSchemeChoices.reduce((a, b) => {
      return Math.abs(b - unitCount) < Math.abs(a - unitCount) ? b : a
    })

    const colors = scheme[colorKey]
    return colors
  }

  const handleSchemeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const schemeGroup = e.target.value
    setActiveSchemeGroup(schemeGroup)
  }

  const handleSchemeClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const source = e.currentTarget.dataset.source
    const scheme = e.currentTarget.dataset.scheme

    setActiveSchemeSource(source)
    setActiveScheme(scheme)
  }

  const isValidHex = (hex: string) => {
    return /^#[0-9A-F]{6}$/i.test(hex)
  }

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value
    if (!hex) {
      return
    }
    // if the hex does not have a #, add it
    if (hex.charAt(0) !== '#') {
      hex = '#' + hex
    }
    setHexInput(hex)
    // check that the hex is valid
    if (isValidHex(hex)) {
      setActiveColor(hex)
      onChange(e)
    }
  }

  const handleSwatchClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, color) => {
    setActiveColor(color)
    //@ts-ignore
    e.target.value = color
    onChange(e)
  }

  return (
    <DistrictrThemeProvider>
      <ColorPickerWrapper data-testid="ColorPicker" className="d-colorpicker">
        <div className="d-panel-section">
          <input
            ref={inputRef}
            className="d-panel-input"
            type="text"
            name="hex"
            value={hexInput}
            onInput={handleHexInput}
          />
        </div>

        <div
          className="d-colorpicker-color"
          data-testid="ColorPickerDisplay"
          style={{ backgroundColor: activeColor }}
        ></div>
        <div className="d-panel-section">
          <ul className="d-swatchpicker">
            {activeColorScheme.map((color, index) => {
              return (
                <li key={index} className="d-swatchpicker-swatch">
                  <Button
                    aria-label="Color Swatch"
                    pressed={activeColor === color}
                    variant={'swatch'}
                    style={{ backgroundColor: color }}
                    dataset-color={color}
                    //@ts-ignore
                    onClick={(e) => handleSwatchClick(e, color)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <hr />
        <div className="d-panel-section d-scheme-filters">
          <div className="d-panel-col">
            <select className={'d-panel-input'} value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
              <option value="All">All</option>
              {sources.map((schemeSource) => {
                return (
                  <option key={schemeSource} value={schemeSource}>
                    {schemeSource}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="d-panel-col">
            <select className={'d-panel-input'} value={activeSchemeGroup} onChange={handleSchemeGroupChange}>
              {schemeGroups.map((schemeGroup) => {
                return (
                  <option key={schemeGroup} value={schemeGroup}>
                    {schemeGroup}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="d-panel-col">
            <input
              className={'d-panel-input'}
              type="number"
              min="1"
              max="435"
              value={unitCount}
              onChange={(e) => setUnitCount(parseInt(e.target.value))}
            />
          </div>
        </div>
        <ul className="d-panel-list">
          {filteredColorSchemes.map((colorScheme) => {
            return (
              <li
                key={colorScheme.id}
                data-source={colorScheme.source}
                data-scheme={colorScheme.value}
                onClick={handleSchemeClick}
                className="d-list-item d-scheme-item"
              >
                <div className="d-scheme-info">
                  <div className="d-scheme-title">{colorScheme.label}</div>
                  <div className="d-scheme-groups">{colorScheme.groups.toString()}</div>
                </div>

                <div className="d-scheme-colors">
                  {colorScheme.colors.map((color, index) => {
                    return <div className="d-scheme-color" key={index} style={{ backgroundColor: color }}></div>
                  })}
                </div>
              </li>
            )
          })}
        </ul>
      </ColorPickerWrapper>
    </DistrictrThemeProvider>
  )
}

export default ColorPicker
