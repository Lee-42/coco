import { contextBridge } from 'electron'
import electron from './electron'
import node from './node'
import api from './api'
import './ipc'

contextBridge.exposeInMainWorld('electron', electron)
contextBridge.exposeInMainWorld('node', node)
contextBridge.exposeInMainWorld('api', api)
