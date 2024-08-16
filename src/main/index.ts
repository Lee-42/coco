import { app, BrowserWindow, ipcMain, protocol } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import './global'
import { WindowManager } from './windowManager'
import { WindowRouteRecordRaw } from '../renderer/src/router/index'
import { ipcChannel } from './ipc'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const wm = new WindowManager()
  ipcChannel(wm.windows)
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  //同时也创建的自定义的file协议的
  protocol.interceptFileProtocol('file', (req, callback) => {
    const url = req.url.substring(8)
    callback(decodeURI(url))
  })

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  wm.initWindow()

  // IPC test
  ipcMain.on('open', (_e, args: WindowRouteRecordRaw) => {
    wm.createWindow(args.path, args.meta)
  })
  ipcMain.on('maximize', (_e, args: WindowRouteRecordRaw) => {
    wm.maximize(args.path)
  })
  ipcMain.on('minimize', (_e, args: WindowRouteRecordRaw) => {
    wm.minimize(args.path)
  })
  ipcMain.on('restore', (_e, args: WindowRouteRecordRaw) => {
    wm.restore(args.path)
  })
  ipcMain.on('close', (_e, args: WindowRouteRecordRaw) => {
    wm.close(args.path)
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) wm.initWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

console.log('process.versionsprocess.versions: ', process.versions)
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
