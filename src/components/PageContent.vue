<template>
  <div class="count">
    <router-view></router-view>
  </div>
</template>
<script setup lang='ts'>
</script>

<style lang="less" scoped>
.count {
  margin-top: 10px;
  padding-left: 15%;
  padding-right: 15%;
}
@media (max-width: 1200px) {
  /* 平板 / 小笔记本：两侧留白收窄，别把正文挤成一条缝 */
  .count {
    padding-left: 6%;
    padding-right: 6%;
  }
}
@media (max-width: 768px) {
  .count {
    padding: 0;
  }
}
</style>