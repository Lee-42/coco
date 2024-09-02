<template>
  <div class="simulator">
    <SimulatorSelector />
    <SimulatorBody />
  </div>
</template>

<script lang="ts" setup>
import SimulatorSelector from './simulator-selector.vue'
import SimulatorBody from './simulator-body.vue'
</script>

<style lang="postcss" scoped>
.simulator {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
