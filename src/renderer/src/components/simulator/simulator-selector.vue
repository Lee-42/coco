<template>
  <div class="simalator-selector">
    <n-button @click="add">+</n-button>
    <span @click="() => handleClick()">
      <!-- {{ $store.getters.device.label }}
      {{ $store.getters.displayScale.label }}
      {{ $store.getters.fontSize.label }} -->
      {{ store.state.count }}
    </span>
  </div>
</template>

<script setup lang="ts">
// import { simulatorMenu } from './menu'
// import { PLATFORMS } from '@renderer/utils/constants'
import { useStore } from 'vuex'
import { NButton } from 'naive-ui'

const store = useStore()

console.log('store: ', store)

// const props = defineProps({
//   isInWorkSpace: {
//     type: Boolean,
//     default: true
//   }
// })

const handleClick = async () => {
  // let ns = await simulatorMenu()
}
const add = () => {
  store.dispatch('increment')
}
</script>
