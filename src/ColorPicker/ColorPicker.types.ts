export interface ColorPickerProps {
  color: string
  defaultUnitCount: number
  onChange?: (e: React.SyntheticEvent) => void
  onInputChange?: (e: React.SyntheticEvent) => void
  onInput?: (e: React.SyntheticEvent) => void
}

export interface ColorSchemeOption {
  name: string
  colors: string[]
  value: string
  label: string
  source: string
  groups: string[]
}
