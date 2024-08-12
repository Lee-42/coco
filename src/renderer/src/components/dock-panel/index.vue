<template>
  <Editor :path="props.panel.data.path" />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Editor from './editor/index.vue'

const props = defineProps({
  panel: null
})

onMounted(() => {
  console.log('panel: ', props.panel)
})
</script>
