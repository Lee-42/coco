<template>
  <div class="explorer">
    <div class="explorer-tool">
      <span class="name">COCO</span>
      <div class="tools">
        <i class="tool-item codicon codicon-refresh" @click="refresh"></i>
        <i class="tool-item codicon codicon-collapse-all" @click="collapseAll"></i>
      </div>
    </div>
    <n-input
      v-show="showRenameInput"
      ref="renameInputRef"
      v-model:value="renameInputVal"
      class="explorer-input"
      placeholder=""
      size="small"
      :spellcheck="false"
      @click.stop
      @blur="renameInputOk"
      @keyup.enter="renameInputOk"
    >
      <template #prefix>
        <svg-icon
          class="custom-node-icon"
          :src="'file:///Volumes/T7/desktop1/default_folder.svg'"
        ></svg-icon>
      </template>
    </n-input>
    <VTree
      id="vtree"
      ref="tree"
      v-contextmenu:contextmenu
      :animation="false"
      :use-padding="true"
      :node-indent="10"
      :node-min-height="22"
      :load="loadNodes"
      :loading="false"
      :auto-load="autoLoad"
      @click="click"
      @node-dblclick="dbClick"
      @node-right-click="rightClick"
    >
      <template #node="{ node }">
        <div id="custom-node-wrapper">
          <svg-icon v-if="node.isLeaf" class="custom-node-icon" :src="node.icon" />
          <svg-icon v-else class="custom-node-icon" :src="node.icon" />
          <span v-if="node.title" class="custom-node-text">{{ node.title }}</span>
          <n-input
            v-else
            ref="newInputRef"
            v-model:value="newInputVal"
            class="explorer-input"
            placeholder=""
            size="small"
            :spellcheck="false"
            @click.stop
            @blur="(e) => newInputOk(e, node)"
            @keyup.enter="(e) => newInputOk(e, node)"
          >
            <template #prefix>
              <svg-icon class="custom-node-icon" :src="node.icon"></svg-icon>
            </template>
          </n-input>
        </div>
      </template>
    </VTree>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="openDisk">在finder打开</v-contextmenu-item>
      <v-contextmenu-item @click="rename">重命名</v-contextmenu-item>
      <v-contextmenu-item @click="newFolder">新建文件夹</v-contextmenu-item>
      <v-contextmenu-item @click="newFile">新建文件</v-contextmenu-item>
      <v-contextmenu-item @click="remove">删除</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script lang="ts" setup>
import VTree, { TreeNode } from '@wsfe/vue-tree'
import { ref, nextTick } from 'vue'
import { ITreeNodeData, TreeNodeType } from './types'
import { explorerSortDefault } from '../../../../../utils/index'
import SvgIcon from '@renderer/components/base/svg-icon/index.vue'
import { NInput } from 'naive-ui'
import { merge, keyBy } from 'lodash-es'
// import { extname } from 'path'

const WORKSPACE_PATH = '/Volumes/T7/900'
// const WORKSPACE_PATH = '/Volumes/T7/desktop1'
// const WORKSPACE_PATH = '/Users/lee/Project/coco'
const tree = ref()
const contextmenu = ref()

const renameInputRef = ref()
const showRenameInput = ref<boolean>(false)
const renameInputVal = ref<string>('')

const newInputRef = ref()
const newInputVal = ref<string>('')

const autoLoad = ref<boolean>(true)

let cacheTreeNode: {
  node: TreeNode | ITreeNodeData
  event: MouseEvent
}

/**
 * Dynamically loading nodes
 * @param node TreeNode | renameInputOk
 * @param resolve Function
 * @param _reject Function
 */
const loadNodes = async (node: TreeNode | ITreeNodeData, resolve, _reject) => {
  if (node === null) {
    const nodes = explorerSortDefault(await window.api.getTreeData(WORKSPACE_PATH))
    resolve(nodes)
  } else {
    const { key } = node
    const nodes = explorerSortDefault(await window.api.getTreeData(key))
    resolve(nodes)
  }
}

// const renderCustomNode = (node: TreeNode | ITreeNodeData) => {
//   const { title, isLeaf, type } = node
//   if (title === 'node_modules') {
//     console.log(node)
//   }
//   return h('div', { id: 'custom-node-wrapper' }, [
//     isLeaf
//       ? h(SvgIcon, { class: 'custom-node-icon', name: 'default_file' })
//       : h(SvgIcon, { class: 'custom-node-icon', name: 'default_folder' }),
//     type === TreeNodeType.input
//       ? h(NInput, {
//           class: 'explorer-input',
//           defaultValue: '',
//           placeholder: ''
//         })
//       : h('span', { class: 'custom-node-text' }, title)
//   ])
// }

/**
 * expand node
 * @param node
 */
// const expand = (node: TreeNode | ITreeNodeData) => {
//   console.log('expand: ', node)
// }

/**
 * click node
 * @param node
 */
// 模拟收起逻辑
// let cacheNode
// if (node.key == '/Volumes/T7/900/app0') {
//   cacheNode = node
//   setTimeout(() => {
//     console.log('手动收起app0')
//     tree.value.setExpand(cacheNode.key, false)
//     tree.value.setLoaded(cacheNode.key, false)
//   }, 10000)
// }
const click = (node: TreeNode) => {
  if (node.type === TreeNodeType.input) return
  // tree.value.setLoaded(node.key, false)
  tree.value.setSelected(node.key, true)
}

/**
 * double click node
 * @param node
 */
const dbClick = (node: TreeNode | ITreeNodeData) => {
  console.log(node)
}

/**
 * right click node
 * @param node
 * @param e
 */
const rightClick = (node: TreeNode | ITreeNodeData, e: MouseEvent) => {
  // tree.value.setSelected(node.key, true)
  cacheTreeNode = {
    node,
    event: e
  }
  contextmenu.value.show({ top: e.pageY, left: e.pageX })
}

/**
 * refresh tree
 */
const refresh = async () => {
  // const treeData = tree.value.getTreeData()
  // console.log('treeData: ', treeData)
  // tree.value.setData([])
  // autoLoad.value = false
  // autoLoad.value = true

  console.time('>>>>>>>>refresh')

  /**
   * Replace elements of B with elements of A
   * @param O oldArr
   * @param N newArr
   */
  function mergeArray(O, N) {
    const OMap = keyBy(O, 'key')
    // 遍历数组B，按需替换元素
    const C = N.map((element) => merge({}, element, OMap[element.key]))
    return C
  }

  const _oldTreeData = tree.value.getTreeData()
  async function recursionTreeNode(nodes) {
    const promises = nodes.map(async (node) => {
      const { expand, children, key } = node
      if (expand && children.length > 0) {
        const newChild = explorerSortDefault(await window.api.getTreeData(key))
        return {
          ...node,
          children: await recursionTreeNode(mergeArray(children, newChild))
        }
      } else {
        return node
      }
    })
    return Promise.all(promises)
  }
  const newRootTreeData = explorerSortDefault(await window.api.getTreeData(WORKSPACE_PATH))
  const mergeTreeData = mergeArray(_oldTreeData, newRootTreeData)

  recursionTreeNode(mergeTreeData).then((newTreeData) => {
    console.timeEnd('>>>>>>>>refresh')
    tree.value.setData(newTreeData)
    tree.value.scrollTo(getSelectedKey(), 'center')
  })
}

/**
 * Collapse all nodes
 */
const collapseAll = () => {
  tree.value.setExpandAll(false)
}

/**
 * Get selected nodes
 */
const getSelectedKey = () => {
  return tree.value.getSelectedKey()
}

/**
 * get node
 * @param key
 */
// const getNode = (key: string | number): TreeNode | null => {
//   return tree.value.getNode(key)
// }

/**
 * open in disk
 */
const openDisk = () => {
  const key = getSelectedKey()
  if (key) {
    window.api.showItemInFolder(key)
  }
}

/**
 * remove node
 */
const remove = async () => {
  const { node } = cacheTreeNode
  if (node) {
    const { key } = node
    try {
      await window.api.removeSync(key)
      tree.value.remove(key)
    } catch (err) {
      // todo log error
    }
  }
}

/**
 * rename node
 */
const rename = () => {
  if (cacheTreeNode) {
    const { event, node } = cacheTreeNode
    const { title } = node
    const t = event.target as HTMLElement
    t.appendChild(renameInputRef.value.$el)
    renameInputVal.value = title
    showRenameInput.value = true
    nextTick(() => {
      renameInputRef.value.focus()
      renameInputRef.value.select()
    })
  }
}

/**
 * new folder
 */
const newFolder = () => {
  console.log('new folder')
  if (cacheTreeNode) {
    const { node, _event } = cacheTreeNode
    const { key } = node
    const newNode: ITreeNodeData = {
      isLeaf: false,
      key: '123123123123',
      title: ''
    }
    tree.value.prepend(newNode, key)
    nextTick(() => {
      newInputRef.value.focus()
    })
  }
}

/**
 * new file
 */
const newFile = () => {
  console.log('new file')
}

/**
 * rename ok
 * @param e MouseEvent | KeyboardEvent
 */
const renameInputOk = (_e: FocusEvent | KeyboardEvent) => {
  console.log('renameInputOk')
  // TODO append to the right place
  showRenameInput.value = false
  renameInputVal.value = ''
}

/**
 * new ok
 * @param e MouseEvent | KeyboardEvent
 */
const newInputOk = (e: FocusEvent | KeyboardEvent, node: TreeNode) => {
  console.log('node: ', node)
  // const value =
  tree.value.setSelected(node.id)
  tree.value.remove(node.id)
}
</script>

<style lang="postcss">
@import '@wsfe/vue-tree/dist/style.css';

.explorer {
  height: 100%;
  /* Additional features */
  .explorer-tool {
    height: 22px;
    border-bottom: 1px solid grey;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    .name {
      font-size: 14px;
      font-weight: 600;
      color: grey;
    }
    .tools {
      .tool-item {
        padding-left: 4px;
      }
    }
  }

  .vtree-tree__wrapper {
    .vtree-tree__scroll-area {
      overflow: overlay;

      .vtree-tree__block-area {
        .vtree-tree-node__indent-wrapper:hover {
          background: #ebf5ff;
        }

        .vtree-tree-node__indent-wrapper {
          /* svg {
            width: 4px !important;
          } */
          /* drop flag */
          .vtree-tree-node__drop {
            height: 1px;
          }
          .vtree-tree-node__drop:first-child {
            position: absolute;
            top: 0px;
            /* background: blue; */
          }
          .vtree-tree-node__drop:last-child {
            position: absolute;
            bottom: 0px;
          }

          /* tree node */
          .vtree-tree-node__wrapper {
            position: relative;
            .vtree-tree-node__square {
              height: 100%;
              z-index: 1;
              & > i {
                transition: none;
              }
              & > i:after {
                border: 5px solid transparent;
                border-left: 5px solid grey;
                transform: translateX(2.5px);
              }
            }
            .vtree-tree-node__title {
              height: 22px;
              line-height: 22px;
              margin-left: 0px;
              padding-left: 0px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .vtree-tree-node__title_selected:after {
              content: '';
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: #d4e7fc;
              position: absolute;
              z-index: 0;
              /* border: 1px solid #4e9ff8; */
            }
          }
        }
      }
    }
  }
}

/* custom tree node */
#custom-node-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  display: flex;

  .custom-node-icon {
    width: 22px;
    margin-right: 2px;
  }

  .custom-node-text {
    color: #333333;
    font-size: 14px;
    font-weight: 500;
    flex: 1;
  }
}

/* explorer input */
.explorer-input {
  height: 22px;
  border-radius: 0px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  .n-input-wrapper {
    padding: 0;
    .n-input__prefix {
      padding-right: 1px;
    }
    .n-input__input-el {
      height: 22px;
      line-height: 21px;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
