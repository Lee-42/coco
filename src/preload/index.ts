import { contextBridge } from 'electron'
import electron from './electron'
import node from './node'
import api from './api'

contextBridge.exposeInMainWorld('electron', electron)
contextBridge.exposeInMainWorld('api', api)
contextBridge.exposeInMainWorld('node', node)
