<template>
  <tip-wrapper class="simulator" title="模拟器">
    <n-button type="primary" size="tiny">
      <svg-icon name="simulator"></svg-icon>
    </n-button>
  </tip-wrapper>
  <tip-wrapper class="editor" title="编辑器">
    <n-button type="primary" size="tiny">
      <svg-icon name="editor"></svg-icon>
    </n-button>
  </tip-wrapper>
  <tip-wrapper class="devtool" title="调试器">
    <n-button type="primary" size="tiny">
      <svg-icon name="devtool"></svg-icon>
    </n-button>
  </tip-wrapper>
</template>

<script setup lang="ts">
import TipWrapper from '@renderer/components/base/tip-wrapper/index.vue'
import { NButton } from 'naive-ui'
</script>
