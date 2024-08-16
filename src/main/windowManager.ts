import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

export class WindowManager {
  // private windows: { [id: string]: BrowserWindow } = {}
  windows: { [id: string]: BrowserWindow } = {}

  /**
   * init window
   * @returns
   */
  initWindow() {
    this.createWindow('', {
      width: 0,
      height: 0
    })
  }

  /**
   * create an window
   * @returns
   */
  createWindow(id: string, options?: BrowserWindowConstructorOptions) {
    if (this.windows[id]) return
    const window = new BrowserWindow({
      ...options,
      titleBarStyle: global.ISDARWIN ? 'hiddenInset' : 'hidden',
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        sandbox: false,
        nodeIntegration: false, // 禁用 Node.js 整合
        contextIsolation: true, // 启用上下文隔离
        webSecurity: false,
        preload: join(__dirname, '../preload/index.js')
      }
    })
    window.webContents.openDevTools()
    window.on('ready-to-show', () => {
      window.show()
    })
    window.on('maximize', () => {
      window.webContents.send('maximize', id)
    })
    window.on('minimize', () => {
      window.webContents.send('minimize', id)
    })
    window.on('restore', () => {
      window.webContents.send('restore', id)
    })
    window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (global.ISDEV && process.env['ELECTRON_RENDERER_URL']) {
      window.loadURL(process.env['ELECTRON_RENDERER_URL'] + id)
    } else {
      window.loadFile(join(__dirname, '../renderer/index.html'))
    }
    this.windows[id] = window
    return window
  }

  /**
   * get window by id
   * @param id
   * @returns
   */
  getWindow(id: string) {
    return this.windows[id]
  }

  /**
   * get all the windows
   * @returns
   */
  getAllWindows() {
    return this.windows
  }

  /**
   * maximize window
   * @param id
   */
  maximize(id: string) {
    const window = this.windows[id]
    if (window && window.maximizable) {
      window.maximize()
    }
  }

  /**
   * minimize window
   * @param id
   */
  minimize(id: string) {
    const window = this.windows[id]
    if (window && window.minimizable) {
      window.minimize()
    }
  }

  /**
   * restore window
   * @param id
   */
  restore(id: string) {
    const window = this.windows[id]
    if (window) {
      window.restore()
    }
  }

  /**
   * close window by id
   * @param id
   */
  close(id: string) {
    const window = this.windows[id]
    if (window) {
      window.close()
      delete this.windows[id]
    }
  }

  /**
   * close all windows
   */
  closeAllWindows() {
    Object.values(this.windows).forEach((window) => {
      window.close()
    })
    this.windows = {}
  }
}
