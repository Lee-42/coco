<template>
  <div class="explorer">
    <VTree
      ref="tree"
      :node-indent="10"
      :node-min-height="21"
      :use-padding="true"
      :selectable="true"
      :render="renderCustomNode"
    />
  </div>
</template>

<script lang="ts" setup>
import VTree, { TreeNode } from '@wsfe/vue-tree'
import { ref, onMounted, h } from 'vue'
import type { ITreeNodeData } from './types'
import { explorerSortDefault } from '../../../../../utils/index'
import SvgIcon from '@renderer/components/base/svg-icon/index.vue'

const WORKSPACE_PATH = '/Volumes/T7'
const tree = ref()

onMounted(async () => {
  const nodes = explorerSortDefault(await window.api.getTreeData(WORKSPACE_PATH))
  tree.value.setData(nodes)
})

const renderCustomNode = (node: TreeNode | ITreeNodeData) => {
  return h(SvgIcon, { name: 'bug' }, node.title)
}
</script>

<style>
@import '@wsfe/vue-tree/dist/style.css';
</style>
