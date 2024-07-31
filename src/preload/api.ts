import { ipcRenderer } from 'electron'

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
  }
}

export default api
