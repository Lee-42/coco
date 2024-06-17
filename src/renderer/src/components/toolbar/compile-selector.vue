<template>
  <tip-wrapper class="compile-selector" title="编译" text-align="start">
    <div class="compile-selector-content">
      <n-button size="tiny" @click="compile()">
        <svg-icon name="refresh"></svg-icon>
      </n-button>
      <n-select v-model:value="value" size="tiny" :options="options">
        <template #header> 不知道放些什么 </template>
        <template #action> 如果你点开了这个例子，你可能需要它 </template>
      </n-select>
    </div>
  </tip-wrapper>
</template>

<script setup lang="ts">
import TipWrapper from '@renderer/components/base/tip-wrapper/index.vue'
import { NButton, NSelect } from 'naive-ui'
import { ref } from 'vue'

const value = ref(null)
const options = ref([
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: 'song0',
    disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song1'
  },
  {
    label: 'Norwegian Wood',
    value: 'song2'
  },
  {
    label: "You Won't See",
    value: 'song3',
    disabled: true
  }
])

const compile = () => {
  console.log('compile')
}
</script>

<style scoped>
.compile-selector {
  width: 200px;
  .compile-selector-content {
    display: flex;
  }
}
</style>
