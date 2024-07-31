import './assets/style/index.css'
import { useContentMenu } from './plugins'
import { useRouter } from './router/index'
import { useStore } from './store/index'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
useRouter(app)
useContentMenu(app)
useStore(app)

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  //   window.ipcRenderer.on('main-process-message', (_event, message) => {
  //     console.log(message)
  //   })
})
