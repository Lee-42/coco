<template>
  <div class="tab-panel">
    <n-tabs class="tab-indicator" type="line" size="small">
      <n-tab name="devtool">DEVTOOL</n-tab>
      <n-tab name="terminal"> TERMINAL </n-tab>
      <n-tab name="output"> OUTPUT </n-tab>
      <n-tab name="problem"> PROBLEM </n-tab>
    </n-tabs>
    <div class="tab-body">
      <DevTool v-if="activeTab == 'devtool'" />
      <Termianl v-if="activeTab == 'terminal'" />
      <Output v-if="activeTab == 'output'" />
      <Problem v-if="activeTab == 'problem'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTab } from 'naive-ui'
import DevTool from './devtool/index.vue'
import Termianl from './terminal/index.vue'
import Output from './output/index.vue'
import Problem from './problem/index.vue'
import { ref } from 'vue'

const activeTab = ref('devtool')
</script>
