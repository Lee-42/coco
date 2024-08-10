// // src/store/index.js
// import { createStore } from 'vuex'

// export const useStore = (app: App) => {
//   const store = createStore({
//     state: {
//       count: 0
//     },
//     mutations: {
//       increment(state) {
//         state.count++
//       },
//       decrement(state) {
//         state.count--
//       }
//     },
//     actions: {
//       increment({ commit }) {
//         commit('increment')
//       },
//       decrement({ commit }) {
//         commit('decrement')
//       }
//     },
//     getters: {
//       count: (state) => state.count
//     }
//   })
//   app.use(store)
// }

import { App } from 'vue'
import { createPinia } from 'pinia'

export const useStore = (app: App) => {
  const pinia = createPinia()
  app.use(pinia)
}

export default { useStore }
