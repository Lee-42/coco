<template>
  <div class="explorer">
    <VTree ref="basicTreeRef" />
  </div>
</template>

<script lang="ts" setup>
import VTree from '@wsfe/vue-tree'

const WORKSPACE_PATH = '/Volumes/T7'

console.log('111')
console.log(
  'window.node.fs.readdirSync(WORKSPACE_PATH): ',
  window.node.fs.readdirSync(WORKSPACE_PATH)
)
</script>
