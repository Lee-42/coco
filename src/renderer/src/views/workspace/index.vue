<template>
  <CodeLayout
    ref="codeLayout"
    class="workspace"
    :layout-config="config"
    :main-menu-config="menuData"
    @dragger-drag-split="handleDraggerDragSplit"
    @can-load-layout="loadInnerLayout"
  >
    <!-- dockpanel -->
    <template #centerArea>
      <SplitLayout ref="splitLayout" @panel-close="onPanelClose" @panel-active="onPanelActive">
        <template #tabContentRender="{ panel }">
          <DockPanel :data="panel.data" />
        </template>
        <template #tabEmptyContentRender="{ grid }">
          <EmptyGrid :grid="grid" />
        </template>
      </SplitLayout>
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
      <template v-if="panel.name === 'explorer.no_folder_opened'">
        <NoFolderOpened />
      </template>
      <template v-else-if="panel.name === 'explorer.folder'">
        <Explorer />
      </template>
      <template v-else-if="panel.name === 'explorer.outline'">
        <Outline />
      </template>
      <template v-else-if="panel.name === 'search'">
        <CodeLayoutScrollbar>
          <img src="../assets/images/placeholder5.png" />
        </CodeLayoutScrollbar>
      </template>
      <template v-else-if="panel.name === 'bottom.ports'">
        <img src="../assets/images/placeholder3.png" />
      </template>
      <template v-else-if="panel.name === 'bottom.terminal'">
        <img src="./assets/images/placeholder4.png" />
      </template>
      <template v-else-if="panel.name === 'components.simulator'">
        <Simulator />
      </template>
      <span v-else>Panel {{ panel.name }}, no content</span>
    </template>
    <template #statusBar>
      <StatusBar />
    </template>
  </CodeLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, h, onBeforeUnmount, toRaw } from 'vue'
import {
  CodeLayout,
  CodeLayoutScrollbar,
  SplitLayout,
  type CodeLayoutSplitNInstance,
  type CodeLayoutConfig,
  type CodeLayoutInstance,
  type CodeLayoutPanelInternal,
  CodeLayoutSplitNPanelInternal
} from 'vue3-drag-split-layout'
import NoFolderOpened from '@renderer/components/sidebar/no-folder-opened/index.vue'
import Explorer from '@renderer/components/sidebar/explorer/index.vue'
import Outline from '@renderer/components/sidebar/outline/index.vue'
import DockPanel from '@renderer/components/dock-panel/index.vue'
import EmptyGrid from '@renderer/components/empty-grid/index.vue'
import Simulator from '@renderer/components/simulator/index.vue'

import StatusBar from '@renderer/components/statusbar/index.vue'
import TitleBarIcon from '@renderer/components/titlebar/titlebar-icon.vue'
import TitleBarMenu from '@renderer/components/titlebar/titlebar-menu.vue'
import TitleBarCenter from '@renderer/components/titlebar/titlebar-center.vue'
import TitleBarRight from '@renderer/components/titlebar/titlebar-right.vue'
import menuData from './menu'
import { mitter } from '@renderer/utils/index'
import { TreeNode } from '@wsfe/vue-tree'
import SvgIcon from '@renderer/components/base/svg-icon/index.vue'

const props = defineProps({
  enableSave: {
    type: Boolean,
    default: false
  }
})

const splitLayout = ref<CodeLayoutSplitNInstance>()
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
  secondarySideBar: true,
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

function onPanelClose(_panel: CodeLayoutPanelInternal, resolve: () => void) {
  // todo 靠左原则, 重新选择panel
  const grid = _panel.parentGroup
  const children = grid!.children
  const index = _panel.getIndexInParent()
  const active = children[index - 1] || children[index + 1]
  resolve()
  setTimeout(() => {
    grid?.setActiveChild(active)
  }, 0)
}

function onPanelActive(
  lastActivePanel: CodeLayoutSplitNPanelInternal,
  panel: CodeLayoutSplitNPanelInternal
) {
  console.log({
    lastActivePanel,
    panel
  })
}

function onResetAll() {
  localStorage.setItem('CodeLayoutDemoSaveConfig', '')
  localStorage.setItem('CodeLayoutDemoSaveData', '')
  localStorage.setItem('SplitLayoutData', '')
  codeLayout.value?.clearLayout()
  splitLayout.value?.clearLayout()
  loadLayout()
  loadInnerLayout()
}

function loadInnerLayout() {
  if (splitLayout.value) {
    const data = localStorage.getItem('SplitLayoutData')
    // 加载布局
    if (props.enableSave && data) {
      console.log('加载布局')
      splitLayout.value.loadLayout(JSON.parse(data), (panel) => {
        const nameObj = JSON.parse(panel.name) as TreeNode
        return {
          ...panel,
          title: nameObj.title,
          closeType: 'close',
          iconSmall: () => h(SvgIcon, { src: nameObj.icon, style: { width: '22px' } }),
          data: {
            type: 'editor',
            path: panel.name.path
          }
        }
      })
    }
    mitter.on('add-panel', async (node: TreeNode) => {
      const { key, title, icon } = node
      const grid = splitLayout.value?.getActiveGird()
      grid
        .addPanel({
          title,
          tooltip: key,
          name: key,
          iconSmall: () => h(SvgIcon, { src: icon, style: { width: '22px' } }),
          closeType: 'close',
          data: {
            type: 'image',
            path: key
          }
        })
        .activeSelf()
    })
  }
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
            panel.iconLarge = () => h('i', { class: 'codicon codicon-files' })
            break
          case 'search':
            panel.title = 'Search'
            panel.tooltip = 'Search'
            panel.iconLarge = () => h('i', { class: 'codicon codicon-files' })
            break
          case 'explorer.file':
            panel.title = 'vue3-drag-split-layout'
            panel.tooltip = 'vue3-drag-split-layout'
            panel.actions = [
              {
                name: 'test',
                icon: () => h('i', { class: 'codicon codicon-files' }),
                onClick() {
                  //
                }
              },
              {
                name: 'test2',
                icon: () => h('i', { class: 'codicon codicon-files' }),
                onClick() {
                  //
                }
              }
            ]
            panel.iconSmall = () => h('i', { class: 'codicon codicon-files' })
            break
          case 'explorer.outline':
            panel.title = 'OUTLINE'
            panel.tooltip = 'Outline'
            panel.actions = [
              {
                name: 'test',
                icon: () => h('i', { class: 'codicon codicon-files' }),
                onClick() {
                  //
                }
              },
              {
                name: 'test2',
                icon: () => h('i', { class: 'codicon codicon-files' }),
                onClick() {
                  //
                }
              }
            ]
            panel.iconSmall = () => h('i', { class: 'codicon codicon-files' })
            break
          case 'bottom.ports':
            panel.title = 'PORTS'
            panel.tooltip = 'Ports'
            panel.iconSmall = () => h('i', { class: 'codicon codicon-files' })
            break
          case 'bottom.terminal':
            panel.title = 'TERMINAL'
            panel.tooltip = 'Terminal'
            panel.iconSmall = () => h('i', { class: 'codicon codicon-files' })
            panel.actions = [
              {
                name: 'test',
                icon: () => h('i', { class: 'codicon codicon-files' }),
                onClick() {
                  //
                }
              },
              {
                name: 'test2',
                icon: () => h('i', { class: 'codicon codicon-files' }),
                onClick() {
                  //
                }
              }
            ]
            break
        }
        return panel
      })
    } else {
      primarySidebar()
      secondarySideBar()
      bottomLayout()
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

/**
 * 主侧边栏
 */
function primarySidebar() {
  const cl = codeLayout.value!
  const groupExplorer = cl.addGroup(
    {
      title: 'Explorer',
      tooltip: 'Explorer',
      name: 'explorer',
      badge: '2',
      iconLarge: () => h('i', { class: 'codicon codicon-files' })
    },
    'primarySideBar'
  )
  cl.addGroup(
    {
      title: 'Search',
      tooltip: 'Search',
      name: 'search',
      tabStyle: 'single',
      iconLarge: () => h('i', { class: 'codicon codicon-files' })
    },
    'primarySideBar'
  )

  const no_folder_opened = true
  if (no_folder_opened) {
    groupExplorer.addPanel({
      title: 'NO FOLDER OPENED',
      tooltip: 'NO FOLDER OPENED',
      name: 'explorer.no_folder_opened',
      noHide: true,
      startOpen: true,
      iconSmall: () => h('i', { class: 'codicon codicon-files' }),
      actions: []
    })
  } else {
    groupExplorer.addPanel({
      title: 'vue3-drag-split-layout',
      tooltip: 'vue3-drag-split-layout',
      name: 'explorer.folder',
      noHide: true,
      startOpen: true,
      iconSmall: () => h('i', { class: 'codicon codicon-files' }),
      actions: [
        {
          name: 'test',
          icon: () => h('i', { class: 'codicon codicon-files' }),
          onClick() {
            //
          }
        },
        {
          name: 'test2',
          icon: () => h('i', { class: 'codicon codicon-files' }),
          onClick() {
            //
          }
        }
      ]
    })
  }

  groupExplorer.addPanel({
    title: 'OUTLINE',
    tooltip: 'Outline',
    name: 'explorer.outline',
    iconSmall: () => h('i', { class: 'codicon codicon-files' }),
    actions: [
      {
        name: 'test',
        icon: () => h('i', { class: 'codicon codicon-files' }),
        onClick() {
          //
        }
      },
      {
        name: 'test2',
        icon: () => h('i', { class: 'codicon codicon-files' }),
        onClick() {
          //
        }
      }
    ]
  })
}

function secondarySideBar() {
  const cl = codeLayout.value!
  const groupComponent = cl.addGroup(
    {
      title: 'components',
      tooltip: 'components',
      name: 'components',
      iconLarge: () => h('i', { class: 'codicon codicon-device-mobile' })
    },
    'secondarySideBar'
  )

  groupComponent.addPanel({
    title: 'simulator',
    tooltip: 'simulator',
    name: 'components.simulator',
    noHide: true,
    startOpen: true,
    iconSmall: () => h('i', { class: 'codicon codicon-device-mobile' }),
    actions: []
  })
}

/**
 * 底部布局
 */
function bottomLayout() {
  const cl = codeLayout.value!
  const bottomGroup = cl.getRootGrid('bottomPanel')
  bottomGroup.addPanel({
    title: 'PORTS',
    tooltip: 'Ports',
    name: 'bottom.ports',
    startOpen: true,
    iconSmall: () => h('i', { class: 'codicon codicon-files' }),
    accept: ['bottomPanel']
  })
  bottomGroup.addPanel({
    title: 'TERMINAL',
    tooltip: 'Terminal',
    name: 'bottom.terminal',
    actions: [
      {
        name: 'test',
        icon: () => h('i', { class: 'codicon codicon-files' }),
        onClick() {
          //
        }
      },
      {
        name: 'test2',
        icon: () => h('i', { class: 'codicon codicon-files' }),
        onClick() {
          //
        }
      }
    ]
  })
}

function saveLayout() {
  if (props.enableSave) {
    localStorage.setItem('CodeLayoutDemoSaveData', JSON.stringify(codeLayout.value?.saveLayout()))
    localStorage.setItem('CodeLayoutDemoSaveConfig', JSON.stringify(toRaw(config)))
    localStorage.setItem('SplitLayoutData', JSON.stringify(splitLayout.value?.saveLayout()))
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
