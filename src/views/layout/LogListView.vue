<template>
  <div class="loglist">
    <el-timeline style="max-width: 100%" center>
      <el-timeline-item center :timestamp=item.date placement="top" v-for="item in LogMap" :key="item.id">
        <el-card class="log-card">
          <div class="card-content">
            <div class="left">
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </div>
            <div class="right">
              <p class="insight">{{ item.insight }}</p>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>

  </div>
</template>

<script setup lang='ts'>
//使用pinia控制开发历程 
import { useLogStore } from '../../stores';
import type { LogItem } from '../../stores/LogStore';
const LogStore = useLogStore()
const LogMap: LogItem[] = LogStore.reverseLogMap
</script>

<style lang="less" scoped>
.loglist {
  .log-card {
    .card-content {
      display: flex;
      justify-content: space-between;
    }

    .left {
      width: 65%;
    }

    .right {
      width: 25%;
      padding-left: 20px;
      border-left: 1px dashed #ccc;
      color: #555;
      font-style: italic;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }

  .el-timeline {
    border-left: 3px solid #cbd5e1;
    padding-left: 20px;
  }
}
</style>