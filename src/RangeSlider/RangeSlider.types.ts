interface RangeSliderChangeEvent {
  originalEvent: React.SyntheticEvent
  value: number
  stopPropagation(): void
  preventDefault(): void
  target: {
    name: string
    id: string
    value: number
  }
}

export interface RangeSliderProps {
  name?: string
  id?: string
  align: 'horizontal' | 'vertical'
  min: number
  max: number
}
