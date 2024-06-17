import 'virtual:svg-icons-register'
import { App } from 'vue'
import svgIcon from '../components/base/svg-icon/index.vue'

export const useSvgIcon = (app: App) => {
  app.component('svg-icon', svgIcon)
}
