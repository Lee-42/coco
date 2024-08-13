<template>
  <Editor :path="props.panel.data.path" />
</template>

<script lang="ts" setup>
import Editor from './editor/index.vue'

const props = defineProps({
  panel: null
})
</script>
