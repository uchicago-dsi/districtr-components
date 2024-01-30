import schemes from './schemes'

/**
 * Global Districtr color map for districts.
 *
 * We might consider using fewer colors and just allowing repetitions,
 * since a human being can only hold so many colors in their head at
 * one time.
 */
let _colorScheme = [
  '#0099cd',
  '#ffca5d',
  '#00cd99',
  '#99cd00',
  '#cd0099',
  '#aa44ef', // lighter, req from San Diego
  // Color brewer:
  '#8dd3c7',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
  '#b3de69',
  '#fccde5',
  // "#d9d9d9", Too gray!
  '#bc80bd',
  '#ccebc5',
  '#ffed6f',
  '#ffffb3',
  // other color brewer scheme:
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  //    "#ffff99",
  '#b15928',
  // random material design colors:
  '#64ffda',
  '#00B8D4',
  '#A1887F',
  '#76FF03',
  '#DCE775',
  '#B388FF',
  '#FF80AB',
  '#D81B60',
  '#26A69A',
  '#FFEA00',
  '#6200EA'
]

//_colorScheme.push(..._colorScheme.map(hex => changeColorLuminance(hex, -0.3)));

/**
 * District color scheme given a certain number if units
 */
export const getColorScheme = (unitCount, colorScheme = _colorScheme) => {
  let colors = []
  for (let i = 0; i < unitCount; i++) {
    colors.push(colorScheme[i % colorScheme.length])
  }
  return colors
}

/**
 * Darker colors for when the user hovers over assigned units.
 */
export const getHoverColorScheme = (unitCount, colorScheme = _colorScheme) => {
  let colors = []
  for (let i = 0; i < unitCount; i++) {
    colors.push(changeColorLuminance(colorScheme[i % colorScheme.length], -0.15))
  }
  return colors
}

/**
 * Brighter colors for when the district is in an active state.
 */
export const getSelectedColorScheme = (unitCount, colorScheme = _colorScheme) => {
  let colors = []
  for (let i = 0; i < unitCount; i++) {
    colors.push(changeColorLuminance(colorScheme[i % colorScheme.length], 0.15))
  }
  return colors
}

/**
 * Adjusts the color luminance. Use it for shading colors.
 *
 * I got this from stack overflow to find shaded versions of the
 * ColorBrewer colors.
 *
 * @param {string} hex
 * @param {number} lum
 */
export function changeColorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  // convert to decimal and change luminosity
  let rgb = '#',
    c,
    i
  for (i = 0; i < 3; i++) {
    const z = i * 2
    c = parseInt(hex.substring(z, z + 2), 16)
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ('00' + c).slice(c.length)
  }

  return rgb
}

export const getUnitOutlineColor = (units) => {
  const unitList = Object.keys(units).map((key) => units[key])

  const unitOutlineColorStyle = [
    'case',
    ['==', ['feature-state', 'active'], false],
    [
      'match',
      ['feature-state', 'unit'],
      ...unitList.map((unit) => [unit.id, unit.color]).reduce((list, unit) => [...list, ...unit]),
      'rgba(0, 0, 0, 0)'
    ],
    '#000000'
  ]

  return unitOutlineColorStyle
}

export function getUnitColorProperty(units) {
  // Convert units from a object to a array of objects
  const unitList = Object.keys(units).map((key) => units[key])

  const unitColorStyle = [
    'match',
    ['feature-state', 'unit'],
    // for each unit in units, add the unit id and the color
    ...unitList.map((unit) => [unit.id, unit.color]).reduce((list, pair) => [...list, ...pair]),
    'rgba(0, 0, 0, 0)'
  ]

  const hoveredUnitColorStyle = [
    'match',
    ['feature-state', 'unit'],
    ...unitList.map((unit) => [unit.id, unit.hoverColor]).reduce((list, unit) => [...list, ...unit]),
    '#aaaaaa'
  ]

  const activeUnitColorStyle = [
    'match',
    ['feature-state', 'unit'],
    ...unitList.map((unit) => [unit.id, unit.selectedColor]).reduce((list, unit) => [...list, ...unit]),
    '#aaaaaa'
  ]

  const standardColor = ['case', ['boolean', ['feature-state', 'hover'], false], hoveredUnitColorStyle, unitColorStyle]

  const blendWithHoverOption = [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    ['feature-state', 'blendHoverColor'],
    ['feature-state', 'blendColor']
  ]

  const unitColorProperty = [
    'case',
    ['==', ['feature-state', 'useBlendColor'], true],
    blendWithHoverOption,
    standardColor
  ]

  return unitColorProperty
}

/**
 * Mapbox color rule for the units layer.
 */

export const unitBordersPaintProperty = {
  'line-color': '#777777',
  'line-width': ['interpolate', ['linear'], ['zoom'], 0, 0, 7, 1],
  'line-opacity': 0.3
}

export const highlightUnassignedUnitBordersPaintProperty = {
  ...unitBordersPaintProperty,
  'line-color': ['case', ['==', ['feature-state', 'color'], null], '#ff4f49', unitBordersPaintProperty['line-color']],
  'line-width': ['case', ['==', ['feature-state', 'color'], null], 4, 1],
  'line-opacity': ['case', ['==', ['feature-state', 'color'], null], 0.8, 0.3]
}

export const updateUnitsColorScheme = (units, colorScheme) => {
  const unitList = Object.keys(units).map((key) => units[key])
  const colors = getColorScheme(unitList.length, colorScheme)
  const hoverColors = getHoverColorScheme(unitList.length, colorScheme)
  const selectedColors = getSelectedColorScheme(unitList.length, colorScheme)

  unitList.forEach((unit, i) => {
    unit.color = colors[i]
    unit.hoverColor = hoverColors[i]
    unit.selectedColor = selectedColors[i]
  })

  const newUnits = {}

  unitList.forEach((unit) => {
    newUnits[unit.id] = unit
  })

  return newUnits
}
