<template>
  <div v-if="show" :style="fixedStyle" class="traffic-light">
    <div v-if="min" class="light-item" @click="handleLight('minimize')">
      <i class="codicon codicon-chrome-minimize"></i>
    </div>
    <div v-if="max && isMax" class="light-item" @click="handleLight('restore')">
      <i class="codicon codicon-chrome-restore"></i>
    </div>
    <div v-if="max && !isMax" class="light-item" @click="handleLight('maximize')">
      <i class="codicon codicon-chrome-maximize"></i>
    </div>
    <div v-if="close" class="light-item close" @click="handleLight('close')">
      <i class="codicon codicon-chrome-close"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { router } from '@renderer/router/index'
import { useRoute } from 'vue-router'
import { IpcRendererEvent } from 'electron'

const route = useRoute()

const props = defineProps({
  showSetting: {
    type: Boolean,
    default: false
  },
  min: {
    type: Boolean,
    default: true
  },
  max: {
    type: Boolean,
    default: true
  },
  close: {
    type: Boolean,
    default: true
  },
  position: {
    type: String,
    default: 'right'
  }
})

const isMax = ref(false)
const show = ref(true)

const fixedStyle = computed(() => (props.position === 'right' ? { right: 0 } : { left: 0 }))

onMounted(() => {
  window.electron.ipcRenderer.on('maximize', (_e: IpcRendererEvent, args: object) => {
    console.log(args)
    // let { key } = args
    // if (key === this.$route.path + this.$store.state.project.id || '') {
    //   this.isMax = true
    // }
  })
})

const handleLight = (type: 'minimize' | 'maximize' | 'restore' | 'close') => {
  const lightStrategy = {
    minimize: (path: string, _query: object) => {
      router.minimize({
        path
      })
    },
    maximize: (path: string, _query: object) => {
      isMax.value = true
      router.maximize({
        path
      })
    },
    restore: (path: string, _query: object) => {
      isMax.value = false
      router.restore({
        path
      })
    },
    close: (path: string, _query: object) => {
      router.close({
        path
      })
    }
  }
  const { path, query } = route
  lightStrategy[type](path, query)
}
</script>

<style lang="postcss" scoped>
.traffic-light {
  background: pink;
  height: 24px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;

  .light-item {
    height: 100%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .light-item:hover {
    background-color: grey;
  }

  .close:hover {
    background: rgb(201, 49, 49);
  }
}
</style>
