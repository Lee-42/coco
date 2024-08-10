<template>
  <SplitLayout
    ref="splitLayout"
    class="dock-panel"
    @panel-close="onPanelClose"
    @can-load-layout="loadInnerLayout"
  >
    <template #tabContentRender="{ panel }">
      <!-- <vue-monaco-editor
        v-if="panel.name.startsWith('file')"
        v-model:value="panel.data.value"
        :language="panel.data.language"
        :path="panel.data.path"
        theme="vs-dark"
        :options="MONACO_EDITOR_OPTIONS"
      /> -->
      <Editor />
    </template>
    <template #tabEmptyContentRender="{ grid }">
      <h2 :style="{ margin: 0 }">Empty Grid</h2>
    </template>
  </SplitLayout>
</template>

<script lang="ts" setup>
import {
  SplitLayout,
  type CodeLayoutSplitNInstance,
  type CodeLayoutPanelInternal
} from 'vue3-drag-split-layout'
import { ref, h } from 'vue'
import TestContent1 from './text/Useage.vue?raw'
import TestContent2 from './text/README.md?raw'
import IconVue from './text/IconVue.vue'
import IconMarkdown from './text/IconMarkdown.vue'
import Editor from './editor/index.vue'

const splitLayout = ref<CodeLayoutSplitNInstance>()

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true
}

function onPanelClose(_panel: CodeLayoutPanelInternal, resolve: () => void) {
  resolve()
}

function loadInnerLayout() {
  if (splitLayout.value) {
    const grid = splitLayout.value.getRootGrid()
    const splitLeft = grid.addGrid({
      name: 'split1'
    })
    const splitRight = grid.addGrid({
      name: 'split2'
    })
    splitRight.addPanel({
      title: 'BasicUseage.vue',
      tooltip:
        'F:\\Programming\\WebProjects\\vue3-drag-split-layout\\examples\\views\\BasicUseage.vue',
      name: 'file1',
      closeType: 'close',
      iconSmall: () => h(IconVue),
      data: {
        value: TestContent1,
        language: 'vue',
        path: 'F:\\Programming\\WebProjects\\vue3-drag-split-layout\\examples\\views\\BasicUseage.vue'
      }
    })
    splitLeft.addPanel({
      title: 'CodeLayoutHelp.md',
      tooltip: 'F:\\Programming\\WebProjects\\vue3-drag-split-layout\\CodeLayoutHelp.md',
      name: 'file2',
      data: {
        value: TestContent2,
        language: 'markdown',
        path: 'F:\\Programming\\WebProjects\\vue3-drag-split-layout\\CodeLayoutHelp.md'
      },
      closeType: 'close',
      iconSmall: () => h(IconMarkdown)
    })
  }
}
</script>
