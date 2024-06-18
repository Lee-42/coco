import { ipcRenderer } from 'electron'

// Exposing the Node API
const node = {
  fs: {
    readdirSync: async (dirPath) => {
      try {
        const result = await ipcRenderer.invoke('readdirSync', dirPath)
        return result
      } catch (error) {
        console.error('Error in readdirSync:', error)
        throw error
      }
    }
  }
}

export default node
