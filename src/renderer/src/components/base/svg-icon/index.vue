<template>
  <img :src="props.src" />
</template>

<script lang="ts" setup>
const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})
</script>

<style lang="postcss">
img {
  width: 100%;
  padding: 0px 2px;
  box-sizing: border-box;
}
</style>
