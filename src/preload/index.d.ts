import { IpcRenderer } from 'electron'
import { ITreeNodeData } from '@renderer/components/sidebar/explorer/types'
import fs from 'fs-extra'
import type { WatchOptions } from 'chokidar'

fs.readFile()

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
  renameSync: (oldPath: fs.PathLike, newPath: fs.PathLike) => void
  ensureDirSync: (path: string) => void
  ensureFileSync: (path: string) => void
  readFileSync: (
    path: fs.PathOrFileDescriptor,
    options?: {
      encoding?: null | undefined
      flag?: string | undefined
    } | null
  ) => Buffer
  watch: (
    path: string,
    options: WatchOptions,
    callback: (event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', path: string) => void
  ) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    node: NodeAPI
    api: Api
  }
}
