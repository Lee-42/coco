<template>
  <n-layout-header class="titlebar">
    <TrafficLight />
    <Menu />
    <toolbar />
  </n-layout-header>
</template>

<script setup lang="ts">
import { NLayoutHeader } from 'naive-ui'
import Menu from '../menu/index.vue'
import toolbar from '../toolbar/index.vue'
import TrafficLight from '@renderer/components/traffic-light/index.vue'
</script>

<style scoped>
.titlebar {
  border-bottom: 1px solid rgb(224, 224, 230);
}
</style>
