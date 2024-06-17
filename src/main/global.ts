import { app } from 'electron'
import { join } from 'path'
import * as os from 'os'

const platform = os.platform()
const isDev = process.env.NODE_ENV == 'development'
const ISDARWIN = platform === 'darwin'
const ISWIN32 = platform === 'win32'
const ISLINUX = platform === 'linux'

global.ISDEV = isDev
global.ISDARWIN = ISDARWIN
global.ISWIN32 = ISWIN32
global.ISLINUX = ISLINUX
global.APP_PATH = app.getAppPath()
global.RESOURCE_PATH = join(global.APP_PATH, '../')
global.USER_DATA_PATH = app.getPath('userData') + (ISWIN32 ? '\\' : '/')
global.openDevTool = false
global.PRELOAD_PATH = join(__dirname, '../preload/index.js')
global.IS_PROLOAD_LOADED = false
global.__static = isDev ? join(__dirname, '/static').replace(/\\/g, '\\\\') : ''
global.PDF_PATH = join(app.getPath('userData'), 'pdf')
