<template>
  <CodeLayout
    ref="codeLayout"
    class="workspace"
    :layout-config="config"
    @dragger-drag-split="handleDraggerDragSplit"
  >
    <!-- dockpanel -->
    <template #centerArea>
      <dock-panel />
    </template>
    <!-- titlebar -->
    <template #titleBarIcon>
      <TitleBarIcon />
    </template>
    <template #titleBarMenu>
      <TitleBarMenu />
    </template>
    <template #titleBarCenter>
      <TitleBarCenter />
    </template>
    <template #titleBarRight>
      <TitleBarRight />
    </template>
    <template #panelRender="{ panel }">
      <template v-if="panel.name === 'explorer.file'">
        <Explorer />
      </template>
      <template v-else-if="panel.name === 'explorer.outline'">
        <Outline />
      </template>
      <template v-else-if="panel.name === 'search'">
        <CodeLayoutScrollbar>
          <img src="./assets/images/placeholder5.png" />
        </CodeLayoutScrollbar>
      </template>
      <template v-else-if="panel.name === 'bottom.ports'">
        <img src="./assets/images/placeholder3.png" />
      </template>
      <template v-else-if="panel.name === 'bottom.terminal'">
        <img src="./assets/images/placeholder4.png" />
      </template>
      <span v-else>Panel {{ panel.name }}, no content</span>
    </template>
    <template #statusBar>
      <StatusBar />
    </template>
    <template #secondarySideBar> </template>
  </CodeLayout>
</template>

<script setup lang="ts">
import IconFile from './assets/icons/IconFile.vue'
import IconSearch from './assets/icons/IconSearch.vue'
import { ref, reactive, onMounted, nextTick, h, onBeforeUnmount, toRaw } from 'vue'
import Explorer from '@renderer/components/sidebar/explorer/index.vue'
import Outline from '@renderer/components/sidebar/outline/index.vue'
import {
  CodeLayout,
  CodeLayoutScrollbar,
  type CodeLayoutConfig,
  type CodeLayoutInstance
} from 'vue3-drag-split-layout'
import DockPanel from '@renderer/components/dock-panel/index.vue'
import StatusBar from '@renderer/components/statusbar/index.vue'
import TitleBarIcon from '@renderer/components/titlebar/titlebar-icon.vue'
import TitleBarMenu from '@renderer/components/titlebar/titlebar-menu.vue'
import TitleBarCenter from '@renderer/components/titlebar/titlebar-center.vue'
import TitleBarRight from '@renderer/components/titlebar/titlebar-right.vue'
import { mitter } from '@renderer/utils/index'

const props = defineProps({
  enableSave: {
    type: Boolean,
    default: false
  }
})

const codeLayout = ref<CodeLayoutInstance>()

const defaultCodeLayoutConfig: CodeLayoutConfig = {
  primarySideBarSwitchWithActivityBar: true,
  primarySideBarPosition: 'left',
  primarySideBarWidth: 20,
  primarySideBarMinWidth: 170,
  activityBarPosition: 'side',
  secondarySideBarWidth: 20,
  secondarySideBarMinWidth: 170,
  bottomPanelHeight: 30,
  bottomPanelMinHeight: 40,
  bottomAlignment: 'center',
  panelHeaderHeight: 24,
  panelMinHeight: 150,
  titleBar: true,
  titleBarShowCustomizeLayout: true,
  activityBar: true,
  primarySideBar: true,
  secondarySideBar: false,
  bottomPanel: true,
  statusBar: true,
  menuBar: true,
  bottomPanelMaximize: false
}
const config = reactive<CodeLayoutConfig>({
  ...defaultCodeLayoutConfig,
  onResetDefault() {
    for (const key in defaultCodeLayoutConfig) {
      ;(config as Record<string, any>)[key] = (defaultCodeLayoutConfig as Record<string, any>)[key]
    }
  },
  onDropToPanel(reference, referencePosition, panel, dropTo) {
    if (reference.name === 'explorer.file' && panel.name === 'explorer.outline') {
      return false
    }
    return false
  }
})

const handleDraggerDragSplit = (a, b) => {
  // console.log(a, b)
}

function onResetAll() {
  localStorage.setItem('CodeLayoutDemoSaveConfig', '')
  localStorage.setItem('CodeLayoutDemoSaveData', '')
  codeLayout.value?.clearLayout()
  loadLayout()
}

function loadLayout() {
  //Load base layout
  if (codeLayout.value) {
    const data = localStorage.getItem('CodeLayoutDemoSaveData')
    if (props.enableSave && data) {
      //If load layout from data, need fill panel data
      codeLayout.value.loadLayout(JSON.parse(data), (panel) => {
        switch (panel.name) {
          case 'explorer':
            panel.title = 'Explorer'
            panel.tooltip = 'Explorer'
            panel.badge = '2'
            panel.iconLarge = () => h(IconFile)
            break
          case 'search':
            panel.title = 'Search'
            panel.tooltip = 'Search'
            panel.iconLarge = () => h(IconSearch)
            break
          case 'explorer.file':
            panel.title = 'vue3-drag-split-layout'
            panel.tooltip = 'vue3-drag-split-layout'
            panel.actions = [
              {
                name: 'test',
                icon: () => h(IconSearch),
                onClick() {}
              },
              {
                name: 'test2',
                icon: () => h(IconFile),
                onClick() {}
              }
            ]
            panel.iconSmall = () => h(IconSearch)
            break
          case 'explorer.outline':
            panel.title = 'OUTLINE'
            panel.tooltip = 'Outline'
            panel.actions = [
              {
                name: 'test',
                icon: () => h(IconSearch),
                onClick() {}
              },
              {
                name: 'test2',
                icon: () => h(IconFile),
                onClick() {}
              }
            ]
            panel.iconSmall = () => h(IconSearch)
            break
          case 'bottom.ports':
            panel.title = 'PORTS'
            panel.tooltip = 'Ports'
            panel.iconSmall = () => h(IconSearch)
            break
          case 'bottom.terminal':
            panel.title = 'TERMINAL'
            panel.tooltip = 'Terminal'
            panel.iconSmall = () => h(IconSearch)
            panel.actions = [
              {
                name: 'test',
                icon: () => h(IconSearch),
                onClick() {}
              },
              {
                name: 'test2',
                icon: () => h(IconFile),
                onClick() {}
              }
            ]
            break
        }
        return panel
      })
    } else {
      //No data, create new layout
      const groupExplorer = codeLayout.value.addGroup(
        {
          title: 'Explorer',
          tooltip: 'Explorer',
          name: 'explorer',
          badge: '2',
          iconLarge: () => h(IconFile)
        },
        'primarySideBar'
      )
      codeLayout.value.addGroup(
        {
          title: 'Search',
          tooltip: 'Search',
          name: 'search',
          tabStyle: 'single',
          iconLarge: () => h(IconSearch)
        },
        'primarySideBar'
      )

      const bottomGroup = codeLayout.value.getRootGrid('bottomPanel')

      const explorer = groupExplorer.addPanel({
        title: 'COCO',
        tooltip: 'COCO',
        name: 'explorer.file',
        noHide: true,
        startOpen: true,
        iconSmall: () => h(IconSearch),
        actions: [
          {
            name: 'refresh',
            icon: () => h('i', { class: 'codicon codicon-refresh' }),
            onClick() {
              mitter.emit('refresh')
            }
          },
          {
            name: 'collapse-all',
            icon: () => h('i', { class: 'codicon codicon-collapse-all' }),
            onClick() {
              mitter.emit('collapse-all')
            }
          },
          {
            name: 'pass-filled',
            icon: () => h('i', { class: 'codicon codicon-pass-filled' }),
            onClick() {
              mitter.emit('pass-filled')
            }
          },
          {
            name: 'checklist',
            icon: () => h('i', { class: 'codicon codicon-checklist' }),
            onClick() {
              mitter.emit('checklist')
            }
          }
        ]
      })

      const outline = groupExplorer.addPanel({
        title: 'OUTLINE',
        tooltip: 'Outline',
        name: 'explorer.outline',
        iconSmall: () => h(IconSearch),
        actions: [
          {
            name: 'test',
            icon: () => h(IconSearch),
            onClick() {
              //
            }
          },
          {
            name: 'test2',
            icon: () => h(IconFile),
            onClick() {
              //
            }
          }
        ]
      })

      // setInterval(() => {
      //   console.log(explorer.getIndexInParent())
      //   console.log(outline.getIndexInParent())
      // }, 3000)

      bottomGroup.addPanel({
        title: 'PORTS',
        tooltip: 'Ports',
        name: 'bottom.ports',
        startOpen: true,
        iconSmall: () => h(IconSearch),
        accept: ['bottomPanel']
      })
      bottomGroup.addPanel({
        title: 'TERMINAL',
        tooltip: 'Terminal',
        name: 'bottom.terminal',
        actions: [
          {
            name: 'test',
            icon: () => h(IconSearch),
            onClick() {}
          },
          {
            name: 'test2',
            icon: () => h(IconFile),
            onClick() {}
          }
        ]
      })
    }
  }
  //Load layout config
  if (props.enableSave) {
    const data = localStorage.getItem('CodeLayoutDemoSaveConfig')
    if (data) {
      const dataObj = JSON.parse(data)
      for (const key in dataObj) {
        ;(config as Record<string, any>)[key] = (dataObj as Record<string, any>)[key]
      }
    }
  }
}
function saveLayout() {
  if (props.enableSave) {
    localStorage.setItem('CodeLayoutDemoSaveData', JSON.stringify(codeLayout.value?.saveLayout()))
    localStorage.setItem('CodeLayoutDemoSaveConfig', JSON.stringify(toRaw(config)))
  }
}

onMounted(() => {
  nextTick(() => {
    loadLayout()
  })
  window.addEventListener('beforeunload', saveLayout)
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveLayout)
  saveLayout()
})

defineExpose({
  onResetAll
})
</script>

<style lang="postcss" scoped>
.workspace {
  height: 100%;
}
</style>
