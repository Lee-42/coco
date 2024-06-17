<template>
  <TipWrapper class="cache-cleaner" title="清除缓存">
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
      <n-button size="tiny">
        <svg-icon name="stack"></svg-icon>
      </n-button>
    </n-dropdown>
  </TipWrapper>
</template>

<script setup lang="ts">
import TipWrapper from '@renderer/components/base/tip-wrapper/index.vue'
import { NButton, NDropdown } from 'naive-ui'
import { ref } from 'vue'

const options = ref([
  {
    label: '清除模拟器缓存',
    key: 'simulator'
  },
  {
    label: '清除编译缓存',
    key: 'compile'
  },
  {
    label: '清除项目文件列表缓存',
    key: 'exploer'
  },
  {
    label: '清除所有缓存',
    key: 'all'
  }
])

const handleSelect = (key: string) => {
  console.log(`清除${key}`)
}
</script>
