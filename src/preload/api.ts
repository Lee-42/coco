import { ipcRenderer } from 'electron'
import fs from 'fs-extra'

// Exposing custom APIs
const api = {
  /**
   * 获取目录节点
   * @param path 目录路径
   * @returns
   */
  getTreeData: async (path) => {
    try {
      const result = await ipcRenderer.invoke('getTreeData', path)
      return result
    } catch (error) {
      return error
    }
  },

  menuPopup: async (location) => {
    try {
      const result = await ipcRenderer.invoke('menuPopup', location)
      return result
    } catch (error) {
      return error
    }
  },

  showItemInFolder: async (path: string) => {
    try {
      const result = await ipcRenderer.invoke('showItemInFolder', path)
      return result
    } catch (error) {
      return error
    }
  },

  removeSync: async (path: string) => {
    try {
      const result = await ipcRenderer.invoke('removeSync', path)
      return result
    } catch (error) {
      return error
    }
  },

  renameSync: async (oldPath: fs.PathLike, newPath: fs.PathLike) => {
    try {
      const result = await ipcRenderer.invoke('renameSync', oldPath, newPath)
      return result
    } catch (error) {
      return error
    }
  },
  ensureDirSync: async (oldPath: fs.PathLike, newPath: fs.PathLike) => {
    try {
      const result = await ipcRenderer.invoke('ensureDirSync', oldPath, newPath)
      return result
    } catch (error) {
      return error
    }
  },
  ensureFileSync: async (oldPath: fs.PathLike, newPath: fs.PathLike) => {
    try {
      const result = await ipcRenderer.invoke('ensureFileSync', oldPath, newPath)
      return result
    } catch (error) {
      return error
    }
  },
  readFileSync: async (
    path: fs.PathOrFileDescriptor,
    options?: {
      encoding?: null | undefined
      flag?: string | undefined
    } | null
  ) => {
    try {
      const result = await ipcRenderer.invoke('readFileSync', path, options)
      return result
    } catch (error) {
      return error
    }
  }
}

export default api
