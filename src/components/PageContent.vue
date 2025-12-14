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
@media (max-width: 768px) {
  .count {
    padding: 0;
  }
}
</style>