<template>
  <div ref="editor" class="editor"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor'

const editor = ref()

const props = defineProps({
  path: {
    type: String,
    default: ''
  }
})

watch(
  props.path,
  (n) => {
    console.log('path: ', n)
  },
  {
    immediate: true
  }
)

onMounted(async () => {
  const value = await window.api.readFileSync(props.path, { encoding: 'utf-8' })
  const uri = monaco.Uri.file(props.path)
  let model = monaco.editor.getModel(uri)
  if (!model) {
    model = monaco.editor.createModel(value, '', uri)
  }
  monaco.editor.create(editor.value, {
    model,
    theme: 'vs-dark',
    automaticLayout: true
  })
})
</script>

<style lang="postcss" scoped>
.editor {
  height: 100%;
}
</style>
