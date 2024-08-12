<template>
  <div id="editor" ref="editor" class="editor"></div>
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
  console.log('path: ', props.path)
  const uri = monaco.Uri.parse(props.path)
  const value = await window.api.readFileSync(props.path, { encoding: 'utf-8' })
  monaco.editor.create(document.getElementById('editor')!, {
    automaticLayout: true,
    theme: 'vs-dark',
    value,
    uri
  })
})
</script>

<style lang="postcss" scoped>
.editor {
  height: 100%;
}
</style>
