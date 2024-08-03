<template>
  <div class="explorer">
    <div class="explorer-tool">
      <span class="name">COCO</span>
      <div class="tools">
        <i class="tool-item codicon codicon-hover codicon-new-file" @click="newFile"></i>
        <i class="tool-item codicon codicon-hover codicon-new-folder" @click="newFolder"></i>
        <i class="tool-item codicon codicon-hover codicon-refresh" @click="refresh"></i>
        <i class="tool-item codicon codicon-hover codicon-collapse-all" @click="collapseAll"></i>
      </div>
    </div>
    <!-- The tree -->
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
      @click="click"
      @node-dblclick="dbClick"
      @node-right-click="rightClick"
    >
      <template #node="{ node }">
        <div id="custom-node-wrapper">
          <svg-icon v-if="node.isLeaf" class="custom-node-icon" :src="node.icon" />
          <svg-icon v-else class="custom-node-icon" :src="node.icon" />
          <span v-if="node.title" class="custom-node-text">{{ node.title }}</span>
          <!-- <n-input
            v-else
            ref="newInputRef"
            v-model:value="newInputVal"
            class="explorer-input"
            placeholder="A file or folder name must be provided."
            size="small"
            :spellcheck="false"
            @click.stop
            @blur="(e) => newInputOk(e, node)"
            @keyup.enter="(e) => newInputOk(e, node)"
          >
            <template #prefix>
              <svg-icon class="custom-node-icon" :src="newInputIcon"></svg-icon>
            </template>
          </n-input> -->
          <n-form
            v-else
            ref="renameFormRef"
            class="explorer-form"
            label-placement="left"
            :model="newForm"
            :rules="newForm"
          >
            <n-form-item path="text">
              <n-input
                v-model:value="renameForm.text"
                size="small"
                class="explorer-input"
                :spellcheck="false"
                placeholder=""
                @click.stop
                @blur="renameOk"
                @keyup.enter="renameOk"
              >
                <template #prefix>
                  <svg-icon class="custom-node-icon" :src="renameIcon"></svg-icon>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
        </div>
      </template>
    </VTree>
    <!-- rename form -->
    <n-form
      v-show="showRenameForm"
      ref="renameFormRef"
      class="explorer-form"
      label-placement="left"
      :model="renameForm"
      :rules="renameFormRules"
    >
      <n-form-item path="text">
        <n-input
          v-model:value="renameForm.text"
          size="small"
          class="explorer-input"
          :spellcheck="false"
          placeholder=""
          @click.stop
          @blur="renameOk"
          @keyup.enter="renameOk"
        >
          <template #prefix>
            <svg-icon class="custom-node-icon" :src="renameIcon"></svg-icon>
          </template>
        </n-input>
      </n-form-item>
    </n-form>
    <!-- contextmenu -->
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
import { ref, nextTick, computed } from 'vue'
import { ITreeNodeData, TreeNodeType } from './types'
import { explorerSortDefault } from '../../../../../utils/index'
import SvgIcon from '@renderer/components/base/svg-icon/index.vue'
import { NInput, NForm, NFormItem } from 'naive-ui'
import { merge, keyBy } from 'lodash-es'
import { iconGenerator, findAncestorByClass } from '@renderer/utils/index'
import { extname } from 'path-browserify'

let cacheTreeNode: {
  node: TreeNode | ITreeNodeData
  event: MouseEvent
}

const WORKSPACE_PATH = '/Volumes/T7/900'
// const WORKSPACE_PATH = '/Volumes/T7/desktop1'

const tree = ref()
const contextmenu = ref()

const newInputRef = ref()
const newInputVal = ref<string>('')

const newInputIcon = computed(() => {
  if (cacheTreeNode) {
    const { isLeaf } = cacheTreeNode.node
    return iconGenerator({ isLeaf, name: newInputVal.value })
  } else {
    return ''
  }
})

/**
 * Dynamically loading nodes
 * @param node TreeNode | renameOk
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

/**
 * click node
 * @param node
 */
const click = (node: TreeNode) => {
  if (node.type === TreeNodeType.input) return
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
      // todo delete for sure?
      await window.api.removeSync(key)
      tree.value.remove(key)
    } catch (err) {
      // todo log error
    }
  }
}

const renameFormRef = ref()
const showRenameForm = ref<boolean>(false)
const renameForm = ref({
  text: ''
})
const renameFormRules = {
  text: {
    required: true,
    message: 'A file or folder name must be provided.',
    trigger: ['input']
  }
}
const renameIcon = computed(() => {
  if (showRenameForm.value) {
    if (cacheTreeNode) {
      const { isLeaf } = cacheTreeNode.node
      return iconGenerator({ isLeaf, name: renameForm.value.text })
    } else {
      return ''
    }
  } else {
    return ''
  }
})
/**
 * rename node
 */
const rename = () => {
  if (cacheTreeNode) {
    const { event, node } = cacheTreeNode
    const { title, isLeaf } = node
    const t = event.target as HTMLElement
    t.appendChild(renameFormRef.value.$el)
    toggleNodeDomZIndex(t)
    showRenameForm.value = true
    nextTick(() => {
      renameForm.value.text = title
      let end = title.length
      if (isLeaf) {
        end = title.length - extname(title).length
      }
      const input = renameFormRef.value.$el.querySelector('.n-input__input-el') as HTMLInputElement
      input.focus()
      input.setSelectionRange(0, end)
    })
  }
}

/**
 * toggle node dom z-index
 * @param element
 * @param className
 */
const toggleNodeDomZIndex = (element: HTMLElement) => {
  const dom = findAncestorByClass(element, 'vtree-tree-node__indent-wrapper')
  if (dom) {
    const { zIndex } = dom.style
    if (zIndex === '3') {
      dom.style.zIndex = ''
    } else {
      dom.style.zIndex = '3'
    }
  }
}

/**
 * rename ok
 * @param e MouseEvent | KeyboardEvent
 */
const renameOk = (e: FocusEvent | KeyboardEvent) => {
  if (e.type === 'keyup') {
    const input = renameFormRef.value.$el.querySelector('.n-input__input-el') as HTMLInputElement
    input.blur()
    return
  }
  toggleNodeDomZIndex(e.target as HTMLElement)
  const newName = renameForm.value.text
  renameFormRef.value.restoreValidation()
  showRenameForm.value = false
  const { node } = cacheTreeNode
  if (node) {
    const { title, isLeaf } = node
    if (!newName || newName === title) return
    console.log(renameForm.value.text)
    // TODO folder need to append to the right place and collapse
    if (isLeaf) {
      // TODO file append to the right place
    } else {
      // TODO folder need to append to the right place and collapse
    }
  }
}

/**
 * new folder
 */
let timer
const newFolder = () => {
  // select node operation
  if (cacheTreeNode) {
    const { node } = cacheTreeNode
    const { key } = node
    const newNode: ITreeNodeData = {
      isLeaf: false,
      key: '',
      title: ''
    }
    cacheTreeNode.node = newNode
    tree.value.setExpand(key, true)
    timer = setInterval(() => {
      const node = tree.value.getNode(key)
      if (node.expand) {
        newInputVal.value = ''
        tree.value.prepend(newNode, key)
        nextTick(() => {
          newInputRef.value.focus()
        })
        clearInterval(timer)
      }
    }, 100)
  } else {
    // root directory operations
    console.log('root')
  }
}

/**
 * new file
 */
const newFile = () => {
  if (cacheTreeNode) {
    const { node } = cacheTreeNode
    const { key } = node
    const newNode: ITreeNodeData = {
      isLeaf: true,
      key: '',
      title: ''
    }
    cacheTreeNode.node = newNode
    tree.value.setExpand(key, true)
    timer = setInterval(() => {
      const node = tree.value.getNode(key)
      if (node.expand) {
        newInputVal.value = ''
        tree.value.prepend(newNode, key)
        nextTick(() => {
          newInputRef.value.focus()
        })
        clearInterval(timer)
      }
    }, 100)
  }
}

// const expand = (node: TreeNode | ITreeNodeData) => {
//   // tree.value.setExpand('/Volumes/T7/900/app1', true)
// }

/**
 * new ok
 * @param e MouseEvent | KeyboardEvent
 */
const newInputOk = (_e: FocusEvent | KeyboardEvent, node: TreeNode) => {
  console.log('newInputOk: ', _e)
  // const value =
  newInputVal.value = '1'
  tree.value.setSelected(node.id)
  tree.value.remove(node.id)
  // let new = e.target.
}
</script>

<style lang="postcss">
@import '@wsfe/vue-tree/dist/style.css';

.explorer {
  height: 100%;
  /* Additional features */
  .explorer-tool {
    height: 22px;
    border-bottom: 1px solid rgb(207, 207, 207);
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
        margin-left: 6px;
      }
    }
  }

  .vtree-tree__wrapper {
    height: calc(100% - 22px);
    z-index: 0;
    .vtree-tree__scroll-area {
      overflow: overlay;

      .vtree-tree__block-area {
        .vtree-tree-node__indent-wrapper:hover {
          background: #ebf5ff;
          z-index: 99;
        }

        .vtree-tree-node__indent-wrapper {
          position: relative;
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
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: visible; /* danger */
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
            }
          }
        }
      }

      /* add a blank node */
      .vtree-tree__block-area::after {
        content: '1';
        width: 100%;
        height: 40px;
        font-size: 0px;
      }
    }
  }
}

.explore:hover {
  /* visibility: visible; */
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
    margin-right: 1px;
  }

  .custom-node-text {
    color: #333333;
    font-size: 14px;
    font-weight: 500;
    flex: 1;
  }
}

/* explorer form */
.explorer-form {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;

  .n-form-item {
    .n-form-item-blank {
      min-height: 22px;
    }
    .n-form-item-feedback-wrapper {
      padding: 0;
      .n-form-item-feedback {
        background: var(--n-feedback-text-color-error);
        padding: 4px;
        .n-form-item-feedback__line {
          /* color: var(--n-text-color); */
          color: white;
          font-size: 12px;
        }
      }
    }
  }
  .explorer-input {
    height: 22px;
    border-radius: 0px;
    .n-input-wrapper {
      padding: 0;
      .n-input__prefix {
        margin: 0px;
      }
      .n-input__input-el {
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
</style>
