export interface ITreeNodeData {
  title?: string | number
  id?: string | number
  isLeaf: boolean
  checked?: boolean
  indeterminate?: boolean
  selected?: boolean
  disabled?: boolean
  children?: ITreeNodeData[]
  key: string
}
