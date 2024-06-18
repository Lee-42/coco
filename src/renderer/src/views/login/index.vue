<template>
  <div class="login">
    <div class="login-header">
      <span class="title">渠道一体化开发工具</span>
      <span class="version">v1.0.0</span>
    </div>
    <TrafficLight />
    <n-form ref="formRef" class="login-form" :label-width="80" :model="loginForm" :rules="rules">
      <n-form-item path="username">
        <n-input v-model:value="loginForm.username" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item path="age">
        <n-input v-model:value="loginForm.password" type="password" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item path="age">
        <n-select
          v-model:value="loginForm.environment"
          filterable
          :options="options"
          :menu-props="{
            style: {
              '--n-height': '100px'
            }
          }"
        >
          <template #header>
            <div class="environment-select-header">
              <a class="config" @click="goEnvironment">环境配置</a>
            </div>
          </template>
        </n-select>
      </n-form-item>
      <n-form-item>
        <n-button block type="primary" size="large" attr-type="button" @click="handleLogin">
          登录
        </n-button>
      </n-form-item>
      <n-form-item>
        <div class="login-form-footer">
          <n-checkbox size="large" label="自动登录" />
          <div style="position: relative; right: 0px">
            <n-button
              style="margin-right: 15px"
              size="small"
              attr-type="button"
              @click="loginOffline"
            >
              离线登录
            </n-button>
            <n-button size="small" attr-type="button" @click="quit"> 退出 </n-button>
          </div>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import TrafficLight from '@renderer/components/traffic-light/index.vue'
import '../../../../../test/performance/index'
import { log } from './utils'
import '../../../../utils/base/common/performance'

import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSelect,
  SelectOption,
  SelectGroupOption,
  NCheckbox
} from 'naive-ui'
import { router } from '@renderer/router/index'
import { ref } from 'vue'

const formRef = ref(null)

const loginForm = ref({
  username: '',
  password: '',
  environment: '',
  autologin: false
})

const rules = ref({})

const options: Array<SelectOption | SelectGroupOption> = [
  {
    label: 'Drive My Car',
    value: 'song1'
    // disabled: true
  },
  {
    label: 'Drive My Car',
    value: 'song2'
  },
  {
    label: 'Drive My Car',
    value: 'song3'
  },
  {
    label: 'Drive My Car',
    value: 'song4'
  },
  {
    label: 'Drive My Car',
    value: 'song5'
  }
]

const handleLogin = () => {
  console.log(loginForm.value)
}
const goEnvironment = () => {}

const loginOffline = () => {
  router.open({
    path: '/project'
  })
}

const quit = () => {
  log()
  console.log(typeof import.meta === 'object' && import.meta.url)
}
</script>

<style scoped>
.login {
  .login-header {
    height: 100px;
    box-sizing: border-box;
    padding: 50px 0 0 30px;
    .title {
      font-size: 20px;
      font-weight: 500;
    }
    .version {
      font-size: 12px;
      display: block;
      margin-top: 15px;
    }
  }
  .login-form {
    padding: 0 30px;
    margin-top: 55px;
    .n-form-item.n-form-item--top-labelled {
      grid-template-rows: none;
    }
  }
}
</style>

<style>
.environment-select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .config {
    cursor: pointer;
  }
}
.login-form-footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
