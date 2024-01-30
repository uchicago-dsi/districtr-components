export interface ColumnSetItemData {
  sum: number
  value: number
  name: string
  key: string
  type: 'total' | 'subgroup'
  dataset: string
}

export interface TableItemProps {
  item: ColumnSetItemData
  total: ColumnSetItemData
  activeValue: number
  setActiveValue: (value: number) => void
}

export interface TableControllerProps {
  data: ColumnSetItemData[]
  activeSet: string
}
