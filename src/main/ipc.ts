import { ipcMain } from 'electron'
import fs from 'fs-extra'
import { join } from 'path'

interface TreeNode {
  name: string
  path: string
  isLeaf: boolean
}

ipcMain.handle('readNodeSync', (_e, args) => {
  const dirs = fs.readdirSync(args.path)
  const arr: TreeNode[] = []
  dirs.forEach((d) => {
    const path = join(args.path, d)
    const isLeaf = !fs.statSync(path).isDirectory()
    arr.push({
      name: d,
      path,
      isLeaf
    })
  })
  return arr
})
