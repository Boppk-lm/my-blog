<template>

  <el-container>
    <el-header>
    <!-- 导航栏 -->
      <NavBar></NavBar>
    </el-header>
    <el-main>
      <!-- 页面显示 -->
    <PageContent></PageContent>
   
    </el-main>
    <el-footer>
   <!-- 页尾 -->
      <Footer></Footer>
    </el-footer>

  </el-container>
</template>

<script setup lang='ts'>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import PageContent from '../components/PageContent.vue';
</script>

<style lang="less" scoped>
.el-header {
  padding: 0 !important;
  background-image: url('../assets/home_bg.jpg');
  background-size: cover;       /* 图片覆盖整个区域 */
  background-position: center;  /* 图片居中 */
  background-repeat: no-repeat; /* 禁止重复 */
  height: 700px;               /* 建议设置固定高度 */
}
.el-main { 
   padding: 0 !important;
}
.el-footer {
    padding: 0 !important;
}
</style>