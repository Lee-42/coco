<template>
  <NThemeEditor>
    <n-config-provider id="app" :theme-overrides="themeOverrides">
      <router-view />
    </n-config-provider>
  </NThemeEditor>
</template>

<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, NThemeEditor } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  Button: {},
  Tabs: {
    tabFontSizeSmall: '12px'
  },
  Tree: {
    lineHeight: '1',
    nodeHeight: '22px',
    nodeWrapperPadding: '0',
    nodeBorderRadius: '0'
  },
  Drawer: {
    borderRadius: '0'
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  .n-layout {
    height: 100%;
  }
}
</style>
