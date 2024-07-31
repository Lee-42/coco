import { ipcMain, Menu, MenuItem, shell } from 'electron'
import fs from 'fs-extra'
import { join } from 'path'
import { ITreeNodeData, TreeNodeType } from '../renderer/src/components/sidebar/explorer/types'

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
        isLeaf: !stat.isDirectory(),
        checked: false,
        indeterminate: false,
        selected: false,
        disabled: false,
        type: TreeNodeType.Text,
        children: []
      } as ITreeNodeData
    })
  } catch (error) {
    return error
  }
})

ipcMain.handle('menuPopup', (_event, location) => {
  try {
    console.log('location: ', location)
    const menu = new Menu()
    //添加菜单功能, label: 菜单名称， accelerator：快捷键，click：点击方法
    menu.append(
      new MenuItem({
        label: '复制',
        accelerator: 'CommandOrControl+C',
        click: () => {
          console.log('复制')
        }
      })
    )
    //添加菜单分割线
    menu.append(new MenuItem({ type: 'separator' }))
    //添加菜单功能
    menu.append(
      new MenuItem({
        label: '粘贴',
        accelerator: 'CommandOrControl+V',
        click: () => {
          console.log('粘贴')
        }
      })
    )
    menu.popup({
      x: location.x,
      y: location.y
    })
  } catch (error) {
    return error
  }
})

ipcMain.handle('showItemInFolder', (_event, path: string) => {
  try {
    shell.showItemInFolder(path)
  } catch (error) {
    return error
  }
})

ipcMain.handle('removeSync', (_event, path: string) => {
  try {
    fs.removeSync(path)
  } catch (error) {
    return error
  }
})
