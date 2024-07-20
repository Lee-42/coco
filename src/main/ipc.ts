import { ipcMain } from 'electron'
import fs from 'fs-extra'
import { join } from 'path'
import { ITreeNodeData } from '../renderer/src/components/sidebar/explorer/types'

ipcMain.handle('getTreeData', (_event, dirPath) => {
  try {
    const files = fs.readdirSync(dirPath)
    return files.map((_f) => {
      const _p = join(dirPath, _f)
      const stat = fs.statSync(_p)
      return {
        key: _p,
        title: _f,
        id: _p,
        isLeaf: stat.isDirectory(),
        checked: false,
        indeterminate: false,
        selected: false,
        disabled: false,
        children: []
      } as ITreeNodeData
    })
  } catch (error) {
    return error
  }
})
