/* eslint-disable no-var */
declare global {
  namespace globalThis {
    var ISDEV: boolean
    var ISDARWIN: boolean
    var ISWIN32: boolean
    var ISLINUX: boolean
    var APP_PATH: string
    var RESOURCE_PATH: string
    var USER_DATA_PATH: string
    var openDevTool: boolean
    var PRELOAD_PATH: string
    var __static: string
    var PDF_PATH: string
    var IS_PROLOAD_LOADED: boolean

    // var getName: { (): void }
    // interface Console {
    //   someFn(): void
    // }
  }
}
export {}
