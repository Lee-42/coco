import { App } from 'vue'
import { BrowserWindowConstructorOptions } from 'electron'
import {
  createRouter,
  Router,
  NavigationFailure,
  RouteRecordRaw,
  RouteLocationPathRaw,
  RouteLocationNamedRaw,
  createWebHistory
} from 'vue-router'
import Login from '../views/login/index.vue'
import Project from '../views/project/index.vue'
import Workspace from '../views/workspace/index.vue'

interface eRouter extends Router {
  open(
    to: RouteLocationPathRaw | RouteLocationNamedRaw
  ): Promise<NavigationFailure | void | undefined>
  minimize(
    to: RouteLocationPathRaw | RouteLocationNamedRaw
  ): Promise<NavigationFailure | void | undefined>
  maximize(
    to: RouteLocationPathRaw | RouteLocationNamedRaw
  ): Promise<NavigationFailure | void | undefined>
  restore(
    to: RouteLocationPathRaw | RouteLocationNamedRaw
  ): Promise<NavigationFailure | void | undefined>
  close(
    to: RouteLocationPathRaw | RouteLocationNamedRaw
  ): Promise<NavigationFailure | void | undefined>
}
interface _BrowserWindowConstructorOptions extends BrowserWindowConstructorOptions {
  start?: boolean
}
// 创建一个新的类型，将 RouteRecordRaw 的属性与自定义属性进行交叉
export type WindowRouteRecordRaw = RouteRecordRaw & {
  meta: _BrowserWindowConstructorOptions
}
const routes: WindowRouteRecordRaw[] = [
  {
    path: '/login',
    component: Login,
    meta: {
      width: 330,
      height: 470,
      resizable: true
    }
  },
  {
    path: '/project',
    component: Project,
    meta: {
      width: 800,
      height: 600,
      resizable: true
    }
  },
  {
    path: '/workspace:id',
    component: Workspace,
    meta: {
      width: 1200,
      height: 800,
      resizable: true,
      devtool: true,
      keepAlive: true,
      start: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
}) as eRouter

router.open = async (to: RouteLocationPathRaw | RouteLocationNamedRaw) => {
  const args = routes.find((r) => {
    return r.path === to.path
  })
  delete args?.component
  window.electron.ipcRenderer.send('open', {
    ...args,
    ...to
  })
}
router.minimize = async (to: RouteLocationPathRaw | RouteLocationNamedRaw) => {
  const args = routes.find((r) => {
    return r.path === to.path
  })
  delete args?.component
  window.electron.ipcRenderer.send('minimize', {
    ...args,
    ...to
  })
}
router.maximize = async (to: RouteLocationPathRaw | RouteLocationNamedRaw) => {
  const args = routes.find((r) => {
    return r.path === to.path
  })
  delete args?.component
  window.electron.ipcRenderer.send('maximize', {
    ...args,
    ...to
  })
}
router.restore = async (to: RouteLocationPathRaw | RouteLocationNamedRaw) => {
  const args = routes.find((r) => {
    return r.path === to.path
  })
  delete args?.component
  window.electron.ipcRenderer.send('restore', {
    ...args,
    ...to
  })
}
router.close = async (to: RouteLocationPathRaw | RouteLocationNamedRaw) => {
  const args = routes.find((r) => {
    return r.path === to.path
  })
  delete args?.component
  window.electron.ipcRenderer.send('close', {
    ...args,
    ...to
  })
}

const useRouter = (app: App) => {
  app.use(router)
  // const startWindow = routes.find((r) => r.meta.start)
  // let path
  // if (startWindow) {
  //   path = startWindow.path
  // } else {
  //   path = routes[0].path
  // }
  // router.open({
  //   path
  // })
  // router.close({
  //   path: ''
  // })
}

export { router, useRouter }
