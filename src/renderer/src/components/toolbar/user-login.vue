<template>
  <tip-wrapper class="user-login" :title="isLogin ? 'lee' : '去登录'">
    <n-button v-if="isLogin" size="tiny" @click="goLogin()">
      <svg-icon name="user"></svg-icon>
    </n-button>
    <n-dropdown v-else trigger="click" :options="options" @select="handleSelect">
      <n-button size="tiny"><svg-icon name="user"></svg-icon></n-button>
    </n-dropdown>
  </tip-wrapper>
</template>

<script setup lang="ts">
import TipWrapper from '../base/tip-wrapper/index.vue'
import { NButton } from 'naive-ui'
import { ref } from 'vue'

const isLogin = ref(false)

const options = ref([
  {
    label: '退出登录',
    key: 'logout'
  }
])

const goLogin = () => {
  console.log('去登录')
}
const handleSelect = (key) => {
  if (key === 'logout') {
    console.log('退出登录')
  }
}
</script>
