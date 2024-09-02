<template>
  <div class="simulator-selector">
    <n-select
      v-model:value="value"
      class="selector-item"
      size="tiny"
      placeholder="机型"
      :options="options"
    />
    <n-select
      v-model:value="value"
      class="selector-item"
      size="tiny"
      placeholder="缩放"
      :options="options"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NSelect } from 'naive-ui'

const value = ref(null)
const options = [
  {
    label: 'iphoneX',
    value: 'iphoneX'
  },
  {
    label: 'iphone14',
    value: 'iphone14'
  }
]
</script>

<style lang="postcss" scoped>
.simulator-selector {
  display: flex;
  z-index: 1;
  .selector-item {
    /* width: 100px; */
  }
}
</style>
