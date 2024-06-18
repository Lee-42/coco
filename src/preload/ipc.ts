import fs from 'fs-extra'
import { ipcMain } from 'electron'

ipcMain.handle('readdirSync', (event, dirPath) => {
  try {
    const files = fs.readdirSync(dirPath)
    return files
  } catch (error) {
    console.error('Error reading directory:', error)
    throw error
  }
})
