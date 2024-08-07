import { TreeNode } from "@wsfe/vue-tree"

export enum TreeNodeType {
  text = 'text',
  input = 'input'
}

export interface ITreeNodeData {
  title?: string
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

export interface NodeFormProps {
  visible: boolean
  node: ITreeNodeData
}

export interface NodeFormEmits {
  (e: 'confirm', value: ITreeNodeData): void
}

export interface NodeModelProps {
  text: string
}

export interface CacheTreeNodeProps {
  node: ITreeNodeData | TreeNode | null
  event: MouseEvent | null
}
