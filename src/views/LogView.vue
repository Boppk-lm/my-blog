<template>

  <el-container>
    <!-- 导航栏 -->
    <div class="nav-bar" :class="{ hide: isHidden }">
      <NavBar :active="active" />
    </div>
    <el-header>
      <!-- 背景图 -->
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
  <!-- 回到顶部 -->
  <el-backtop :bottom="100" :visibility-height="10" :right="5">
    <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        border-radius: 10%;
        color: #666666;
      ">
      <el-icon>
        <ArrowUpBold />
      </el-icon>
    </div>
  </el-backtop>
</template>

<script setup lang='ts'>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import PageContent from '../components/PageContent.vue';
import { ref } from 'vue'
const active = ref('log')  //控制导航栏地址
//导入封装控制导航栏的函数
import useScrollHide from '../composables/useScrollHide';
const {isHidden} = useScrollHide()
</script>

<style lang="less" scoped>
@import '../less/nav.less';
// 控制背景
.el-header {
  background-image: url('../assets/log_bg.jpg');
}
</style>