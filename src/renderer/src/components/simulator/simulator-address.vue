<template>
  <div class="simulator-address">
    <n-input
      size="tiny"
      placeholder="Enter the URL in the input to access the page"
      round
    ></n-input>
  </div>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui'
</script>

<style scoped>
.simulator-address {
  /* background: rgb(238, 110, 131); */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}
</style>
