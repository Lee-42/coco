export interface ITreeNodeData {
  title?: string | number
  id?: string | number
  checked?: boolean
  indeterminate?: boolean
  selected?: boolean
  disabled?: boolean
  children?: ITreeNodeData[]
}
