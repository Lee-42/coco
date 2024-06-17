<template>
  <div class="explorer">
    <div class="explorer-header"></div>
    <div ref="elplorerTreeRef" class="explorer-tree">
      <n-tree
        block-line
        expand-on-click
        :data="treeData"
        :show-line="false"
        :default-expanded-keys="defaultExpandedKeys"
        :on-update:expanded-keys="updateFolderIcon"
        virtual-scroll
        :style="{
          height: vTreeHeight
        }"
        :render-switcher-icon="renderSwitcherIcon"
        selectable
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted, onUpdated } from 'vue'
import { TreeOption, NTree } from 'naive-ui'
import { useResizeObserver } from '@vueuse/core'
import { fileIconGenerator } from '@renderer/utils/common'
import svgIcon from '@renderer/components/base/svg-icon/index.vue'

const DIRECTORY = '/Users/lee/Project/海南银行/小程序'

// console.log(window.node.fs.readFileSync(join(__dirname, './index.vue')))
onMounted(() => {
  const d = createData(DIRECTORY)
  treeData.value = d
})

/**
 * 创建树数据
 * @param level
 * @param baseKey
 */
function createData(dirPath): TreeOption[] | undefined {
  fs.readdirSync(dirPath).then((res) => {
    console.log('res: ', res)
  })
  // const dirs = fs.readdirSync(dirPath)
  // const result = dirs.map((d) => {
  //   const path = join(dirPath, d)
  //   const stat = fs.statSync(path)
  //   console.log('stat: ', stat.isDirectory())
  //   const isLeaf = !fs.statSync(path)
  //   return {
  //     label: d,
  //     key: path,
  //     isLeaf,
  //     children: [],
  //     prefix: () =>
  //       h(
  //         svgIcon,
  //         {
  //           name: isLeaf
  //             ? fileIconGenerator({ isLeaf, name: d })
  //             : fileIconGenerator({ isLeaf, expand: false })
  //         },
  //         { default: () => 'Prefix' }
  //       )
  //   }
  // })
  // return result
}

/**
 * 更新目录图标
 * @param _keys
 * @param _option
 * @param meta
 */
const updateFolderIcon = (
  _keys: Array<string | number>,
  _option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'expand' | 'collapse' | 'filter'
  }
) => {
  if (!meta.node) return
  switch (meta.action) {
    case 'expand':
      meta.node.prefix = () =>
        h(svgIcon, { name: fileIconGenerator({ isLeaf: false, expand: true }) })
      break
    case 'collapse':
      meta.node.prefix = () =>
        h(svgIcon, { name: fileIconGenerator({ isLeaf: false, expand: false }) })
      break
  }
}

/**
 * 渲染展开收起图标
 */
const renderSwitcherIcon = () => h(svgIcon, { name: 'arrow-right', size: '12' })

const treeData = ref(undefined)
const defaultExpandedKeys = ref(['40', '41'])
const elplorerTreeRef = ref(null)

const vTreeHeight = ref('0')
useResizeObserver(elplorerTreeRef, (entries) => {
  for (const entry of entries) {
    console.log('vTreeHeight: ', entry.contentRect.height)
    vTreeHeight.value = `${entry.contentRect.height}px`
  }
})
</script>

<style lang="postcss">
.explorer {
  height: 100%;
  display: flex;
  flex-direction: column;
  .explorer-header {
    height: 24px;
    background: purple;
  }
  .explorer-tree {
    height: calc(100% - 24px);
    .n-tree-node-wrapper {
      .n-tree-node {
        .n-tree-node-indent {
          width: 10px;
        }
        .n-tree-node-switcher {
          width: 20px !important;
          transition: none;
          .n-tree-node-switcher__icon {
            height: 12px;
            width: 12px;
          }
        }
        .n-tree-node-content {
          padding-left: 0px;
          .n-tree-node-content__prefix {
          }
          .n-tree-node-content__text {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
