import { app } from 'electron'
import { join } from 'path'

class Plugin {
  constructor() {
    this.loadedPlugins = []
  }

  get pluginPaths() {
    const appPath = app.getAppPath()
    const userDataPath = app.getPath('userData')

    const paths = [join(userDataPath, './plugins')]

    if (process.env.NODE_ENV === 'development') {
      paths.push(join(appPath, './../plugins'))
    }

    return paths
  }

  // ...
}
