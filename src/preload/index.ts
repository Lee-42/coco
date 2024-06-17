import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import path from 'path'

const fs = {
  readdirSync: (path) => ipcRenderer.invoke('readdirSync', { path })
}

// Custom APIs for renderer
const api = {}

// Node api from render
const node = {
  path,
  fs
}

const electron = {
  ...electronAPI
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electron)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('node', node)
  } catch (error) {
    console.error(error)
  }
} else {
  //   // @ts-ignore (define in dts)
  window.electron = electron
  window.api = api
  window.node = node
}
