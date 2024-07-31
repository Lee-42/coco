const watcherIpc = () => {
  window.electron.ipcRenderer.sendSync('init-watcher', '')
}

export { watcherIpc }
