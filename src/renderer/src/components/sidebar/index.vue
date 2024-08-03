<template>
  <div class="sidebar">
    <n-tabs type="line" placement="left" class="sidebar-tabs">
      <n-tab name="files">
        <i class="codicon codicon-files"></i>
      </n-tab>
      <n-tab name="search"> <i class="codicon codicon-search"></i> </n-tab>
      <n-tab name="debug-alt-small"> <i class="codicon codicon-debug-alt-small"></i> </n-tab>
    </n-tabs>
    <div class="sidebar-content">
      <Explorer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTab } from 'naive-ui'
import Explorer from './explorer/index.vue'
</script>

<style lang="postcss" scoped>
.sidebar {
  height: 100%;
  display: flex;
  .sidebar-tabs {
    width: auto;
    &:deep(.n-tabs-tab) {
      padding: 8px;
    }
    &:deep(.n-tabs-bar) {
      left: 0px;
    }
    .codicon {
      font-size: 22px;
    }
  }
  .sidebar-content {
    flex: 1;
  }
}
</style>
