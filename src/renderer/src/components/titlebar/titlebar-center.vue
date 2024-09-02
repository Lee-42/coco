<template>
  <div class="titlebar-center">
    titlebar-center
    <n-button size="tiny" type="primary" @click="refresh">refresh</n-button>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { mitter } from '@renderer/utils/index'

const refresh = () => {
  mitter.emit('refresh')
}
</script>
