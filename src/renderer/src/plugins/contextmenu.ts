import { App } from 'vue'
import contextmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'

const useContentMenu = (app: App) => {
  app.use(contextmenu)
}

export { useContentMenu }
