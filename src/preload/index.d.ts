import { IpcRenderer } from 'electron'
import { ITreeNodeData } from '@renderer/components/sidebar/explorer/types'

interface NodeAPI {
  path: typeof import('path')
}

interface ElectronAPI {
  ipcRenderer: IpcRenderer
}

interface LOCATION {
  x: number
  y: number
}

interface Api {
  getTreeData: (path: string) => ITreeNodeData[]
  menuPopup: (location: LOCATION) => void
  showItemInFolder: (path: string) => void
  removeSync: (path: string) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    node: NodeAPI
    api: Api
  }
}
