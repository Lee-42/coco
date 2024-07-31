import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
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
    plugins: [vue()]
  }
})
