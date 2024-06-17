<template>
  <div class="project">
    <div class="project-header">
      <TrafficLight />
    </div>
    <div class="project-body">
      <div class="body-left">
        <div class="left-header">
          <img src="../../assets/images/app_logo.png" alt="" />
          <div>
            <span>渠道一体化开发工具</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
      <div class="body-right">
        <div class="search">
          <n-input size="small" placeholder="Search projects"></n-input>
          <n-tabs class="tab-switch" type="segment" size="small">
            <n-tab name="lists">
              <svg-icon name="menu"></svg-icon>
            </n-tab>
            <n-tab name="icons">
              <svg-icon name="icons"></svg-icon>
            </n-tab>
          </n-tabs>
        </div>
        <div class="list"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrafficLight from '@renderer/components/traffic-light/index.vue'
import { NInput, NTabs, NTab } from 'naive-ui'
</script>

<style scoped>
.project {
  height: 100%;
  display: flex;
  flex-direction: column;
  .project-header {
    height: 24px;
    background: rgb(219, 219, 219);
  }
  .project-body {
    flex: 1;
    display: flex;

    .body-left {
      width: 220px;
      background: rgb(219, 219, 219);
      .left-header {
        height: 48px;
        display: flex;
        align-items: center;
        padding: 10px 6px;
        img {
          width: 40px;
          height: 40px;
        }
        div {
          margin-left: 10px;
          font-size: 12px;
          color: rgb(62, 62, 62);
          display: flex;
          flex-direction: column;
          span {
            margin: 3px 0;
          }
        }
      }
    }

    .body-right {
      width: 100%;
      .search {
        padding: 20px 10px;
        display: flex;
        align-items: center;
        background: yellow;

        .tab-switch {
          width: 60px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
