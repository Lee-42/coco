export enum TreeNodeType {
  text = 'text',
  input = 'input'
}

export interface ITreeNodeData {
  title?: string | number
  id?: string | number
  isLeaf: boolean
  checked?: boolean
  icon: string
  indeterminate?: boolean
  selected?: boolean
  disabled?: boolean
  // type: TreeNodeType
  children?: ITreeNodeData[]
  key: string
}

export enum Behavior {}

export interface NodeForm {
  message: string
  nodeInfo: ITreeNodeData
}
