<template>
  <TipWrapper title="上传">
    <n-button size="tiny" @click="upload()"> </n-button>
  </TipWrapper>
  <n-drawer
    v-model:show="active"
    :width="200"
    :height="200"
    placement="top"
    :trap-focus="false"
    :block-scroll="false"
    :show-mask="false"
    to="#workspace-body"
  >
    <n-drawer-content title="斯通纳">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import TipWrapper from '@renderer/components/base/tip-wrapper/index.vue'
import { NButton, NDrawer, NDrawerContent } from 'naive-ui'
import { ref } from 'vue'

const active = ref(false)

const upload = () => {
  console.log('上传')
  active.value = true
}
</script>
