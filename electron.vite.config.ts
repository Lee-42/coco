import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@src': resolve('src'),
        '@renderer': resolve('src/renderer/src'),
        '@main': resolve('src/main/src'),
        '@utils': resolve('src/utils')
      }
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [
          resolve(__dirname, './src/renderer/src/assets/icon/ide-icons')
          // resolve(__dirname, './src/renderer/src/assets/icon/vscode-icons')
        ],
        // 指定symbolId格式
        symbolId: '[name]'
      })
    ]
  }
})
