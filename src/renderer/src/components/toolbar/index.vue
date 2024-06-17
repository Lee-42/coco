<template>
  <div class="toolbar">
    <UserLogin />
    <LayoutControler />
    <CompileSelector />
    <CacheCleaner />
    <AppUploader />
    <ProjectDetail />
  </div>
</template>

<script setup lang="ts">
import UserLogin from './user-login.vue'
import LayoutControler from './layout-controler.vue'
import CompileSelector from './compile-selector.vue'
import CacheCleaner from './cache-cleaner.vue'
import AppUploader from './app-uploader.vue'
import ProjectDetail from './project-detail/index.vue'
</script>

<style scoped>
.toolbar {
  padding: 10px;
  display: flex;
}
</style>
