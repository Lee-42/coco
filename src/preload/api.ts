import { ipcRenderer } from 'electron'
import fs from 'fs-extra'
import { WatchOptions } from 'chokidar'
import { mitter } from '../renderer/src/utils/index'

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
  },
  watch: async (
    path: string,
    options: WatchOptions,
    callback: (event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', path: string) => void
  ) => {
    try {
      console.log({
        path,
        options
      })
      await ipcRenderer.invoke('watch', path, options)
      ipcRenderer.on('watch', (event, args) => {
        try {
          console.log('ipcRenderer', args)
          mitter.emit('watch', args)
          console.log('mitter: ', mitter)
          console.log('window.abc: ', window.abc)
        } catch (err) {
          console.log('err: ', err)
        }
      })
    } catch (error) {
      // todo log
      console.log('error: ', error)
    }
  }
}

export default api
