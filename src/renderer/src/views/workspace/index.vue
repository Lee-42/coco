<template>
  <div class="workspace">
    <titlebar />
    <n-split id="workspace-body" direction="horizontal" class="workspace-body">
      <template #1>
        <simulator />
      </template>
      <template #2>
        <workbench />
      </template>
    </n-split>
  </div>
</template>

<script setup lang="ts">
import Titlebar from '../../components/titlebar/index.vue'
import Workbench from '../../components/workbench/index.vue'
import Simulator from '../../components/simulator/index.vue'
import { NSplit } from 'naive-ui'
</script>

<style scoped>
.workspace {
  height: 100%;
  display: flex;
  flex-direction: column;

  .workspace-body {
    flex: 1;
    position: relative;
    overflow-y: overlay;
    overflow-x: hidden;
  }
}
</style>
