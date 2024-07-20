import { IpcRenderer } from 'electron'
import { ITreeNodeData } from '@renderer/components/sidebar/explorer/types'

interface NodeAPI {
  path: typeof import('path')
}

interface ElectronAPI {
  ipcRenderer: IpcRenderer
}

interface Api {
  getTreeData: (path: string) => ITreeNodeData[]
}

declare global {
  interface Window {
    electron: ElectronAPI
    node: NodeAPI
    api: Api
  }
}
