<template>
  <n-form
    v-show="visible"
    ref="form"
    class="node-input"
    label-placement="left"
    size="small"
    :model="model"
    :rules="rules"
  >
    <n-form-item path="text">
      <n-input
        v-model:value="model.text"
        :spellcheck="false"
        placeholder=""
        @click.stop
        @blur="confirm"
        @keyup.enter="confirm"
      >
        <template #prefix>
          <svg-icon class="icon" :src="icon"></svg-icon>
        </template>
      </n-input>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { NodeFormEmits, NodeFormProps, NodeModelProps } from './types'
import SvgIcon from '@renderer/components/base/svg-icon/index.vue'
import { iconGenerator } from '@renderer/utils/index'

defineOptions({
  name: 'node-input'
})

const props = withDefaults(defineProps<NodeFormProps>(), {
  visible: false
})

const emits = defineEmits<NodeFormEmits>()

const form = ref()
const model = ref<NodeModelProps>({
  text: props.node.title as string
})

const icon = computed(() => {
  const i = iconGenerator({ isLeaf: props.node.isLeaf, name: model.value.text as string })
  return i
})

const rules = {
  text: {
    required: true,
    message: 'A file or folder name must be provided.',
    trigger: ['input', 'blur']
  }
}

const confirm = () => {
  emits('confirm', {
    ...props.node,
    icon: icon.value,
    title: model.value.text
  })
}
</script>

<style lang="postcss">
.node-input {
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  .n-form-item {
    .n-form-item-blank {
      background: pink;
      min-height: 22px;
      .n-input {
        height: 22px;
        border-radius: 0px;
        .n-input-wrapper {
          padding: 0;
          .n-input__prefix {
            margin: 0px;
            .icon {
              width: 20px;
              margin-right: 1px;
            }
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

    .n-form-item-feedback-wrapper {
      padding: 0;
      .n-form-item-feedback {
        background: var(--n-feedback-text-color-error);
        padding: 4px;
        .n-form-item-feedback__line {
          color: var(--code-layout-color-text);
          font-size: 12px;
          white-space: break-spaces; /* automatic line wrap */
        }
      }
    }
  }
}
</style>
