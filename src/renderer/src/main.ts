import './assets/style/index.css'
import { useSvgIcon } from './plugins/svg-icon'
import { useRouter } from './router/index'
import { useStore } from './store/index'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
useRouter(app)
useSvgIcon(app)
useStore(app)

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  //   window.ipcRenderer.on('main-process-message', (_event, message) => {
  //     console.log(message)
  //   })
})
