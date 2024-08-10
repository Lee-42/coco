<template>
  <div ref="editor" id="editor" class="editor"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as monaco from 'monaco-editor'

const editor = ref()

onMounted(() => {
  monaco.editor.create(document.getElementById('editor'), {
    value: 'console.log("Hello, world")',
    language: 'javascript',
    theme: 'vs-dark'
  })
})
</script>

<style lang="postcss" scoped>
.editor {
  height: 100%;
}
</style>
