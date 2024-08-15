<template>
  <div>{{ data.path }} - {{ data.type }}</div>
  <div v-if="data.type === 'editor'" ref="editor" class="dock-panel"></div>
  <div v-if="data.type === 'image'" ref="editor" class="dock-panel">
    <img :src="'file://' + data.path" />
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import * as monaco from 'monaco-editor'

const props = defineProps({
  data: {
    type: Object,
    default: null
  }
})

let monacoInstane
const editor = ref()

watch(
  () => props.data,
  async (n) => {
    const { path, type } = n
    if (type === 'editor') {
      const value = await window.api.readFileSync(path, { encoding: 'utf-8' })
      const uri = monaco.Uri.file(path)
      let model = monaco.editor.getModel(uri)
      if (!model) {
        model = monaco.editor.createModel(value, '', uri)
      }
      if (!monacoInstane) {
        monacoInstane = monaco.editor.create(editor.value, {
          model,
          theme: 'vs-dark',
          automaticLayout: true
        })
      } else {
        monacoInstane.setModel(model)
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="postcss" scoped>
.dock-panel {
  height: 100%;

  > img {
    max-height: 100%;
    max-width: 100%;
    object-fit: scale-down;
    zoom: normal;
  }
}
</style>
