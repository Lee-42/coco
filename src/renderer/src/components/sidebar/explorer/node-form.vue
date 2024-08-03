<template>
  <n-form ref="form" class="node-form" label-placement="left" :model="formModel" :rules="formRules">
    <n-form-item path="text">
      <n-input
        v-model:value="formModel.text"
        size="small"
        class="node-input"
        :spellcheck="false"
        placeholder=""
        @click.stop
        @blur="finish"
        @keyup.enter="finish"
      >
        <template #prefix>
          <svg-icon class="custom-node-icon" :src="icon"></svg-icon>
        </template>
      </n-input>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { NodeForm } from './types'
import { iconGenerator } from '@renderer/utils/index'

const form = ref()
const props = withDefaults(defineProps<NodeForm>(), {
  message: 'A file or folder name must be provided.'
})

const formModel = ref({
  text: ''
})

const formRules = {
  text: {
    required: true,
    message: props.message,
    trigger: ['input']
  }
}

const icon = computed(() => {
  if (props.nodeInfo) {
    const { isLeaf } = props.nodeInfo
    return iconGenerator({ isLeaf, name: form.value.text })
  } else {
    return ''
  }
})

const finish = (e: FocusEvent | KeyboardEvent) => {
  if (e.type === 'keyup') {
    const input = form.value.$el.querySelector('.n-input__input-el') as HTMLInputElement
    input.blur()
    return
  } else {
    // todo
  }
}
</script>

<style lang="postcss" scoped>
.node-form {
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
          /* color: var(--n-text-color); */
          color: white;
          font-size: 12px;
        }
      }
    }
  }
  .node-input {
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
</style>
