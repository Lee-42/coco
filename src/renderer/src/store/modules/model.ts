// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    dockPanelList: []
  }),
  actions: {
    increment() {
      this.count++
    },
    addDockPanel(panel) {
      this.dockPanelList.push(panel)
    }
  }
})
