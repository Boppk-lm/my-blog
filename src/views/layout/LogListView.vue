<template>
  <div class="loglist">
    <el-timeline style="max-width: 100%" center>
      <template v-for="row in rows" :key="row.key">
        <!-- 年份分隔 -->
        <el-timeline-item v-if="row.type === 'year'" type="primary" size="large">
          <div class="year-label">{{ row.year }}</div>
        </el-timeline-item>
        <!-- 日志条目 -->
        <el-timeline-item v-else :timestamp="row.item.date" placement="top">
          <el-card class="log-card">
            <div class="card-content">
              <div class="left">
                <h4>{{ row.item.title }}</h4>
                <p>{{ row.item.content }}</p>
              </div>
              <div class="right">
                <p class="insight">{{ row.item.insight }}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </template>
    </el-timeline>

    <!-- 下拉线 -->
    <div v-if="showExpand" class="expand-line" @click="expanded = true">
      <span>再来一些</span>
      <i class="arrow"></i>
    </div>
    <div v-else-if="allShown" class="expand-line" style="pointer-events: none;">
      <span>到底了~</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
//使用pinia控制开发历程
import { computed, ref } from 'vue';
import { useLogStore } from '../../stores';
import type { LogItem } from '../../stores/LogStore';
const LogStore = useLogStore()
// store 里已经按日期新 → 旧排好
const LogMap = LogStore.sortedLogMap

// 一次先显示多少条
const LIMIT = 15
const expanded = ref(false)

// 时间轴里混着「年份标题」和「日志条目」两种行
type Row =
  | { type: 'year'; year: string; key: string }
  | { type: 'log'; item: LogItem; key: string }

const rows = computed<Row[]>(() => {
  const visible = expanded.value ? LogMap : LogMap.slice(0, LIMIT)
  const out: Row[] = []
  let year = ''
  for (const item of visible) {
    const y = item.date.slice(0, 4)
    if (y !== year) {
      year = y
      out.push({ type: 'year', year: y, key: `year-${y}` })
    }
    out.push({ type: 'log', item, key: item.date })
  }
  return out
})

const showExpand = computed(() => !expanded.value && LogMap.length > LIMIT)
const allShown = computed(() => expanded.value && LogMap.length > LIMIT)
</script>

<style lang="less" scoped>
.loglist {
  .year-label {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    letter-spacing: 1px;
  }

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

  // 展开 / 到底了
  .expand-line {
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: #999;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .arrow {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #999;
    transition: transform 0.3s;
  }
}
// 移动端适配
@media (max-width: 768px) {
  .loglist {
     // 整体向左收一点
    .el-timeline {
      padding-left: 10px;
    }
    .log-card {
      width: 95%; //在移动端会压缩可用宽度
// 使用 95% 作为安全边距，避免视觉裁切
      .card-content {
        flex-direction: column;
      }

      .left,
      .right {
        width: 100%;
        padding: 0;
        border: none;
      }

      .right {
        border-top:  1px dashed #ccc;
      }
    }
  }
}
</style>
