type IFormType = 'input' | 'password' | 'select' | 'datepicker' | 'checkbox'
type ILabelPosition = 'left' | 'right' | 'top'
export interface IFormItem {
  field: string
  type: IFormType
  label?: string
  rules?: any[]
  placeholder?: any
  disabled?: boolean
  size?: 'large' | 'small' | 'default'
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
  dateField?: string[]
}
export interface IColLayout {
  span?: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}
export interface IFormConfig {
  formItems: IFormItem[]
  labelWidth?: string
  labelPosition?: ILabelPosition
  colLayout?: IColLayout
  itemStyle?: any
  gutter?: number
  operationLayout?: IColLayout
  showCreateBtn?: boolean
  isDatePicker?: boolean
  rules?: any
}
