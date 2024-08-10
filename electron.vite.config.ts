import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import monacoEditorPluginModule from 'vite-plugin-monaco-editor'

const isObjectWithDefaultFunction = (
  module: unknown
): module is { default: typeof monacoEditorPluginModule } =>
  module != null &&
  typeof module === 'object' &&
  'default' in module &&
  typeof module.default === 'function'

const monacoEditorPlugin = isObjectWithDefaultFunction(monacoEditorPluginModule)
  ? monacoEditorPluginModule.default
  : monacoEditorPluginModule

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
    plugins: [vue(), monacoEditorPlugin({})]
  }
})
