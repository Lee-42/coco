<template>
  <div class="tip-wrapper">
    <slot></slot>
    <h5
      class="tip-title"
      :style="{
        textAlign
      }"
    >
      {{ props.title }}
    </h5>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps } from 'vue'

const props = defineProps({
  title: {
    type: [String, Number],
    default: ''
  },
  textAlign: {
    type: String as PropType<'center' | 'start' | 'end'>,
    default: 'center'
  }
})
</script>

<style scoped>
.tip-wrapper {
  display: inline-block;
  text-align: center;
  margin: 0 4px;
  .tip-title {
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
