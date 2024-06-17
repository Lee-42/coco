<template>
  <div class="simulator-toolbar">
    <simulator-selector />
  </div>
</template>

<script setup lang="ts">
import SimulatorSelector from './simulator-selector.vue'
</script>

<style scoped>
.simulator-toolbar {
  height: 30px;
  background: rgb(244, 81, 108);
}
</style>
