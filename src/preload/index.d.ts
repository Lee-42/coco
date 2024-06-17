import { ElectronAPI } from '@electron-toolkit/preload'

// 定义 window.node 对象的类型
interface NodeAPI {
  path: typeof import('path') // path 模块的类型定义
  fs: typeof import('fs-extra') // fs-extra 模块的类型定义，可选的，根据你的需求决定是否需要暴露
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      appReady: function
    }
    node: NodeAPI
  }
}
