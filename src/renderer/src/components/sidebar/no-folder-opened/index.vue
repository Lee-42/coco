<template>
  <div class="no-folder-opened">
    <p>You have not yet opened a folder.</p>
    <n-button type="primary" size="small" block @click="openFolder">打开目录</n-button>
    <p>
      Opening a folder will close all currently!open editors. To keep them open,
      <a> add a folder </a>
      instead.
    </p>
    <p>You can clone a repository locally.</p>
    <n-button type="primary" size="small" block>Clone Repository</n-button>
    <p>To learn more about how to use Git andsource control in VS Code <a> read our docs.</a></p>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { router } from '@renderer/router/index'

const openFolder = () => {
  console.log('123')
  window.api.showOpenDialog({
      title: '123'
    })
    .then((canceled, filePaths, bookmarks) => {
      console.log({
        canceled,
        filePaths,
        bookmarks
      })
    })

  router.open({
    path: '/workspace123456'
  })
}
</script>

<style lang="postcss" scoped>
.no-folder-opened {
  padding: 0 20px;
  > p {
    margin: 15px 0px;
    line-height: 1.5;
    font-size: 13px;
    font-weight: 500;
    color: rgb(235, 235, 235);
  }
}
</style>
