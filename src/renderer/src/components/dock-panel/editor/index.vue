<template>
  <div :id="`editor-${path}`" ref="editor" class="editor"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as monaco from 'monaco-editor'

const editor = ref()

const props = defineProps({
  path: {
    type: String,
    default: ''
  }
})

onMounted(async () => {
  const value = await window.api.readFileSync(props.path, { encoding: 'utf-8' })
  const uri = monaco.Uri.file(props.path)
  const model = monaco.editor.createModel(value, '', uri)
  monaco.editor.create(document.getElementById(`editor-${props.path}`)!, {
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
