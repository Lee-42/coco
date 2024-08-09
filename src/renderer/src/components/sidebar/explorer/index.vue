<template>
  <!-- tabindex="0" -->
  <div ref="explorerRef" class="explorer">
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
      :show-line="true"
      :checkable="checkStatus.checkable"
      :selectable="true"
      :cascade="false"
      @click="click"
      @node-dblclick="dbClick"
      @node-right-click="rightClick"
    >
      <template #node="{ node }">
        <div id="custom-node-wrapper">
          <svg-icon v-if="node.isLeaf" class="custom-node-icon" :src="node.icon" />
          <svg-icon v-else class="custom-node-icon" :src="node.icon" />
          <span v-if="node.key" class="custom-node-text">{{ node.title }}</span>
          <n-form
            v-else
            ref="formRef"
            class="explorer-form"
            label-placement="left"
            :model="form"
            :rules="rules"
          >
            <n-form-item path="text">
              <n-input
                v-model:value="form.text"
                size="small"
                class="explorer-input"
                :spellcheck="false"
                placeholder=""
                @click.stop
                @blur="(e) => newOk(e, node)"
                @keyup.enter="(e) => newOk(e, node)"
              >
                <template #prefix>
                  <svg-icon class="custom-node-icon" :src="icon || node.icon"></svg-icon>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
        </div>
      </template>
      <template #expandIcon>
        <i class="custom-expand-icon codicon codicon-chevron-right"></i>
      </template>
    </VTree>
    <!-- rename form -->
    <n-form
      v-show="showRenameForm"
      ref="formRef"
      class="explorer-form"
      label-placement="left"
      :model="form"
      :rules="rules"
    >
      <n-form-item path="text">
        <n-input
          v-model:value="form.text"
          size="small"
          class="explorer-input"
          :spellcheck="false"
          placeholder=""
          @click.stop
          @blur="renameOk"
          @keyup.enter="renameOk"
        >
          <template #prefix>
            <svg-icon class="custom-node-icon" :src="icon"></svg-icon>
          </template>
        </n-input>
      </n-form-item>
    </n-form>
    <!-- contextmenu -->
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="openDisk">在finder打开</v-contextmenu-item>
      <v-contextmenu-item @click="rename">重命名</v-contextmenu-item>
      <v-contextmenu-item @click="newNode(false)">新建文件夹</v-contextmenu-item>
      <v-contextmenu-item @click="newNode(true)">新建文件</v-contextmenu-item>
      <v-contextmenu-item @click="remove">删除</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script lang="ts" setup>
import VTree, { TreeNode } from '@wsfe/vue-tree'
import { ref, nextTick, computed } from 'vue'
import { ITreeNodeData, TreeNodeType, CheckStatusProps } from './types'
import { explorerSortDefault, explorerInsertDefault } from '../../../../../utils/index'
import SvgIcon from '@renderer/components/base/svg-icon/index.vue'
import { NInput, NForm, NFormItem } from 'naive-ui'
import { merge, keyBy } from 'lodash-es'
import { iconGenerator, findAncestorByClass, mitter } from '@renderer/utils/index'
import { extname } from 'path-browserify'
import { join } from 'path-browserify'
import useClickOutside from '@renderer/hooks/useClickOutside'
import useClickInside from '@renderer/hooks/useClickInside'

let cacheTreeNode: {
  node: TreeNode | ITreeNodeData | null
  event: MouseEvent
}

const WORKSPACE_PATH = '/Volumes/T7/900'
// const WORKSPACE_PATH = '/Volumes/T7/mini_program_demo'

const tree = ref()
const contextmenu = ref()
const explorerRef = ref()

const explorerFocus = ref<boolean>(false)
const checkStatus = ref<CheckStatusProps>({
  checkable: false,
  checkType: ''
})
const checkedKeys = ref<Set<string>>(new Set())
mitter.on('keydown', (key) => {
  if ((key === 'mod' || key === 'shift') && explorerFocus.value) {
    checkStatus.value.checkType = key
    checkStatus.value.checkable = true
    checkedKeys.value = new Set(tree.value.getCheckedKeys())
  } else {
    checkStatus.value.checkType = ''
    checkStatus.value.checkable = true
    checkedKeys.value = new Set()
    tree.value.setCheckedKeys([])
  }
})
mitter.on('keyup', (key) => {
  if (key === 'mod' || key === 'shift') {
    checkStatus.value.checkType = ''
    checkStatus.value.checkable = false
  }
})

useClickOutside(explorerRef, () => {
  explorerFocus.value = false
  tree.value.clearChecked()
})
useClickInside(explorerRef, () => (explorerFocus.value = true))

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
  const { key } = node
  const { checkType, checkable } = checkStatus.value
  if (checkable) {
    const _cks = checkedKeys.value
    if (checkType === 'mod') {
      // 点选
      if (_cks.has(key)) {
        _cks.delete(key)
      } else {
        _cks.add(key)
      }
      console.log('点选: ', _cks)
    } else if (checkType === 'shift') {
      // const fTreeData = tree.value.getFlatData()
      // 片选
      console.log('片选')
    }
    checkedKeys.value = _cks
    tree.value.setCheckedKeys([..._cks], true)
  } else {
    // tree.value.setExpand(node.id, !node.expand)
  }
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
  cacheTreeNode = {
    node,
    event: e
  }
  contextmenu.value.show({ top: e.pageY, left: e.pageX })
}

/**
 * refresh tree
 */
mitter.on('refresh', (_e) => {
  refresh()
})
mitter.on('collapse-all', (_e) => {
  collapseAll()
})
mitter.on('pass-filled', (_e) => {
  checkStatus.value.checkable = !checkStatus.value.checkable
})
mitter.on('checklist', (_e) => {
  tree.value.setCheckedKeys(
    ['/Volumes/T7/900/app2', '/Volumes/T7/900/app3', '/Volumes/T7/900/app4'],
    true
  )
  console.log('getCheckedKeys: ', tree.value.getCheckedKeys())
})

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

// #region rename
const formRef = ref()
const showRenameForm = ref<boolean>(false)
const form = ref({
  text: ''
})
const rules = {
  text: {
    required: true,
    message: 'A file or folder name must be provided.',
    trigger: ['input', 'blur']
  }
}
const icon = computed(() => {
  if (showRenameForm.value) {
    if (cacheTreeNode) {
      const { isLeaf } = cacheTreeNode.node
      return iconGenerator({ isLeaf, name: form.value.text })
    } else {
      return ''
    }
  } else {
    return ''
    // const node = tree.value ?? tree.value.getNode('')
    // if (node) {
    //   const { isLeaf } = node
    //   return iconGenerator({ isLeaf, name: form.value.text })
    // } else {
    //   return ''
    // }
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
    t.appendChild(formRef.value.$el)
    showRenameForm.value = true
    nextTick(() => {
      toggleNodeDomZIndex(formRef.value.$el)
      form.value.text = title
      let end = title.length
      if (isLeaf) {
        end = title.length - extname(title).length
      }
      const input = formRef.value.$el.querySelector('.n-input__input-el') as HTMLInputElement
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
  console.log('dom: ', dom)
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
    const input = formRef.value.$el.querySelector('.n-input__input-el') as HTMLInputElement
    input.blur()
    return
  }
  toggleNodeDomZIndex(formRef.value.$el)
  const newName = form.value.text
  formRef.value.restoreValidation()
  showRenameForm.value = false
  const { node } = cacheTreeNode
  if (node) {
    const { title, isLeaf, _parent, id } = node as TreeNode
    const newNode: ITreeNodeData = {
      isLeaf,
      title: newName,
      icon: iconGenerator({ isLeaf, name: newName }),
      key: ''
    }
    let children
    if (!newName || newName === title) return
    if (!_parent) {
      children = tree.value.getTreeData()
      newNode.key = join(WORKSPACE_PATH, newName)
      newNode.id = join(WORKSPACE_PATH, newName)
    } else {
      children = _parent.children
      newNode.key = join(_parent.key, newName)
      newNode.id = join(_parent.key, newName)
    }
    if (isLeaf) {
      window.api.renameSync(id, newNode.id as string)
      const index = explorerInsertDefault(children, newNode)
      const _id = children[index].id
      tree.value.insertBefore(newNode, _id)
      tree.value.remove(id)
    } else {
      // TODO folder need to append to the right place and collapse
      window.api.renameSync(id, newNode.id as string)
      const index = explorerInsertDefault(children, newNode)
      const _id = children[index].id
      tree.value.insertAfter(newNode, _id)
      tree.value.remove(id)
      tree.value.setLoaded(newNode.id, false)
      tree.value.setExpand(newNode.id, false)
    }
  }
}
// #endregion

// #region newFolder
const newNode = async (isLeaf: boolean) => {
  const { node } = cacheTreeNode

  function waitExpanded(key) {
    return new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        if (tree.value.getNode(key).expand) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    })
  }

  function fileInsertIndex(items: ITreeNodeData[]) {
    let index
    index = items.length
    for (let i = 0; i < items.length; i++) {
      if (items[i].isLeaf) {
        index = i
        break
      }
    }
    return index
  }

  const newNode: ITreeNodeData = {
    isLeaf,
    icon: iconGenerator({ isLeaf, name: '' }),
    key: ''
  }

  if (node) {
    const { children, key } = node
    tree.value.setExpand(key, true)
    await waitExpanded(key)
    if (isLeaf) {
      // console.log('node: ', node)
      // todo append to the filelist first location
      if (children) {
        const index = fileInsertIndex(children)
        const _id = children[index].id
        tree.value.insertBefore(newNode, _id)
      }
    } else {
      tree.value.prepend(newNode, key)
    }
  } else {
    // todo how to focus outside
  }
  nextTick(() => {
    toggleNodeDomZIndex(formRef.value.$el)
    form.value.text = ''
    const input = formRef.value.$el.querySelector('.n-input__input-el') as HTMLInputElement
    input.focus()
  })
}

const newOk = (e: FocusEvent | KeyboardEvent, newNode: TreeNode) => {
  console.log('newOk: ', newNode)
  const { id, isLeaf, _parent } = newNode
  if (e.type === 'keyup') {
    const input = formRef.value.$el.querySelector('.n-input__input-el') as HTMLInputElement
    input.blur()
    return
  }
  toggleNodeDomZIndex(formRef.value.$el)
  tree.value.remove(id)
  const newName = form.value.text
  if (newName) {
    const newNode: ITreeNodeData = {
      isLeaf,
      title: newName,
      icon: iconGenerator({ isLeaf, name: newName }),
      key: ''
    }
    let children
    if (!_parent) {
      children = tree.value.getTreeData()
      newNode.key = join(WORKSPACE_PATH, newName)
      newNode.id = join(WORKSPACE_PATH, newName)
    } else {
      children = _parent.children
      newNode.key = join(_parent.key, newName)
      newNode.id = join(_parent.key, newName)
    }
    if (!isLeaf) {
      // TODO new file and insert to the right place
      window.api.ensureDirSync(newNode.key)
      const index = explorerInsertDefault(children, newNode)
      const _id = children[index].id
      tree.value.insertAfter(newNode, _id)
      tree.value.remove(id)
      tree.value.setLoaded(newNode.id, false)
      tree.value.setExpand(newNode.id, false)
    } else {
      window.api.ensureFileSync(newNode.key)
    }
  }
}

const explorerBlockClick = (e: MouseEvent) => {
  console.log('explorerBlockClick: ', e)
  // tree.value.clearChecked()
  // cacheTreeNode.node = null
}
// #endregion
</script>

<style lang="postcss">
@import '@wsfe/vue-tree/dist/style.css';

.explorer {
  height: 100%;
  box-sizing: border-box;
  border: 1px solid transparent;
  /* &:focus {
    border: 1px solid red;
  } */
}

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
  height: 100%;
  z-index: 0;
  .vtree-tree__scroll-area {
    overflow-y: overlay;

    .vtree-tree__block-area {
      overflow-x: clip;
      .vtree-tree-node__indent-wrapper:hover {
        background: var(--code-layout-color-highlight);
        z-index: 99;
      }

      .vtree-tree-node__indent-wrapper {
        padding-left: 10px;
        & > svg {
          width: 2px !important;
          padding-left: 4px;
        }

        position: relative;
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
          /* position: relative; */
          overflow-x: clip;
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
          .vtree-tree-node__checkbox_wrapper {
            /* display: none; */
          }
          .vtree-tree-node__title {
            height: 22px;
            line-height: 22px;
            margin-left: 0px;
            padding-left: 0px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow-x: clip;
          }
          .vtree-tree-node__title:hover {
            /* background: var(--code-layout-color-highlight); */
            background: transparent;
          }

          .vtree-tree-node__title_selected {
            background: transparent;
          }
          /* In order to cool the entire node when selecting a node, it is now implemented by modifying the source code */
          /* .vtree-tree-node__title_selected:after {
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            position: absolute;
            z-index: -1;
            background: var(--code-layout-color);
            border: 1px solid var(--code-layout-color-highlight);
            box-sizing: border-box;
          } */
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

/* custom tree node */
#custom-node-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  display: flex;

  .custom-node-icon {
    width: 20px;
    margin-right: 1px;
  }

  /* .custom-node-content { */
  .custom-node-text {
    font-size: 14px;
    font-weight: 500;
    flex: 1;
    color: var(--code-layout-color-text);
    overflow-x: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* } */
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
          color: var(--code-layout-color-text);
          font-size: 12px;
          white-space: break-spaces; /* automatic line wrap */
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

/* $wrapper_selected: rgba(0, 120, 212, 0.8) */

.vtree-tree-node__indent-wrapper_selected {
  box-sizing: border-box;
  background: rgba(0, 120, 212, 0.5);
  /* border: 1px solid var(--code-layout-color-highlight); */
}
</style>
