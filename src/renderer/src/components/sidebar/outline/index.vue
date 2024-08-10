<template>
  <div class="outline">
    <n-button type="primary" size="small" @click="click">increment</n-button>
    {{ counter.count }}
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@renderer/store/modules/workspace'
import { NButton } from 'naive-ui'
const counter = useCounterStore()

const click = () => {
  counter.increment()
}
</script>
