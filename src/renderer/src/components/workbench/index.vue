<template>
  <n-split class="workbench" direction="horizontal" size="200px">
    <template #1>
      <side-bar />
    </template>
    <template #2>
      <n-split direction="vertical">
        <template #1>
          <dock-panel />
        </template>
        <template #2>
          <tab-panel />
        </template>
      </n-split>
    </template>
  </n-split>
</template>

<script setup lang="ts">
import { NSplit } from 'naive-ui'
import SideBar from '../sidebar/index.vue'
import DockPanel from '../dock-panel/index.vue'
import TabPanel from '../tab-panel/index.vue'
</script>

<style>
.workbench {
  height: 100%;
}
</style>
