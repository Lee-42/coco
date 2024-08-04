<template>
  <div class="workspace">
    <titlebar />
    <n-split
      id="workspace-body"
      direction="horizontal"
      class="workspace-body"
      :size="defaultWorkbenchSize"
      @update:size="handleSize"
    >
      <template #1>
        <workbench />
      </template>
      <template #2>
        <simulator />
      </template>
    </n-split>
  </div>
</template>

<script setup lang="ts">
import Titlebar from '../../components/titlebar/index.vue'
import Workbench from '../../components/workbench/index.vue'
import Simulator from '../../components/simulator/index.vue'
import { NSplit } from 'naive-ui'
import { ref, onMounted } from 'vue'

const defaultWorkbenchSize = ref('')

const defaultSimulatorPaneSize = 300

onMounted(() => {
  calcWorkbenchSize()
})

const calcWorkbenchSize = (value?: string) => {
  defaultWorkbenchSize.value = value ? value : window.innerWidth - defaultSimulatorPaneSize + 'px'
}

const handleSize = (value) => calcWorkbenchSize(value)
</script>

<style lang="postcss" scoped>
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
