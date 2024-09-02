<template>
  <div class="simulator-body">
    <div class="simulator-body__content" :style="cssStyle">
      <img class="simulator-frame" src="../../assets/images/frame/iphone-x.png" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const iphoneX = ref({
  value: 'iPhone X ',
  label: 'iPhone X ',
  width: 375,
  height: 812,
  win_width: 431,
  win_height: 863,
  padding: '24px 28px 0px 28px',
  statusHei: 44,
  //   statusbarType: statusbarType.NOTCH,
  frame: '../../assets/images/frame/iphone-x.png',
  Dpr: 3,
  radius: '39px'
  //   platform: PLATFORMS.MOBILE.type
})

const cssStyle = computed(() => {
  return {
    width: iphoneX.value.width + 'px',
    height: iphoneX.value.height + 'px',
    minWidth: iphoneX.value.width + 'px',
    minHeight: iphoneX.value.height + 'px',
  }
})
</script>

<style lang="postcss" scoped>
.simulator-body {
  height: 100%;
  background: pink;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  overflow: overlay;
  .simulator-body__content {
    background: yellow;
    z-index: 0;

    .simulator-frame {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
