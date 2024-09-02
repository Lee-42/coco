<template>
  <SplitLayout
    ref="splitLayout"
    class="dock-panel"
    @panel-close="onPanelClose"
    @panel-active="panelActive"
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
      <Empty />
    </template>
  </SplitLayout>
</template>

<script lang="ts" setup>
import {
  SplitLayout,
  type CodeLayoutSplitNInstance,
  type CodeLayoutPanelInternal
} from 'vue3-drag-split-layout'
import { ref, h, onMounted } from 'vue'
import TestContent1 from './text/Useage.vue?raw'
import TestContent2 from './text/README.md?raw'
import IconVue from './text/IconVue.vue'
import IconMarkdown from './text/IconMarkdown.vue'
import Empty from './empty/index.vue'
import Editor from './editor/index.vue'
import { mitter } from '@renderer/utils/index'

const splitLayout = ref<CodeLayoutSplitNInstance>()

function onPanelClose(_panel: CodeLayoutPanelInternal, resolve: () => void) {
  resolve()
}

console.log('loadInnerLayout')

// onMounted(() => {
//   loadInnerLayout()
// })

function loadInnerLayout() {
  console.log('loadInnerLayout')
  if (splitLayout.value) {
    const grid = splitLayout.value.getRootGrid()
    // 分割面板1
    const split1 = grid.addGrid({
      name: 'split1'
    })
    const p1 = split1.addPanel({
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
    split1.activePanel = p1
    const p2 = split1.addPanel({
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
    split1.activePanel = p2

    /***********分割面板2********/
    // const split2 = grid.addGrid({
    //   name: 'split2'
    // })
    // split2.addPanel({
    //   title: 'BasicUseage.vue',
    //   tooltip:
    //     'F:\\Programming\\WebProjects\\vue3-drag-split-layout\\examples\\views\\BasicUseage.vue',
    //   name: 'file1',
    //   closeType: 'close',
    //   iconSmall: () => h(IconVue),
    //   data: {
    //     value: TestContent1,
    //     language: 'vue',
    //     path: 'F:\\Programming\\WebProjects\\vue3-drag-split-layout\\examples\\views\\BasicUseage.vue'
    //   }
    // })
  }
}

function panelActive() {
  // console.log('panelActive')
}
</script>
