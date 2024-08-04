import { App } from 'vue'
import 'vue3-drag-split-layout/lib/vue3-drag-split-layout.css'
import vue3SplitLayout from 'vue3-drag-split-layout'

const useLayout = (app: App) => {
  app.use(vue3SplitLayout)
}
export { useLayout }
