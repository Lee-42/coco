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
  }
}

export default api
