<template>
  <!-- 导航栏 -->
  <div class="nav-bar" :class="{ hide: isHidden }">
    <NavBar :active="active" />
  </div>
  <el-container>
    <!-- 顶部封面 -->
    <HeroHeader :bg="postBg" :title="title">
      <template #subtitle>
        <p>{{ string }}</p>
      </template>
    </HeroHeader>
    <el-main>
      <!-- 页面显示 -->
      <PageContent />
    </el-main>
    <el-footer>
      <!-- 页尾 -->
      <Footer />
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
const name = 'post'
import postBg from '../assets/post_bg.png';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import PageContent from '../components/PageContent.vue';
import HeroHeader from '../components/HeroHeader.vue';
import { ref } from 'vue'
const active = ref('post')  //控制导航栏地址
//导入封装控制导航栏的函数
import useScrollHide from '../composables/useScrollHide';
const { isHidden } = useScrollHide()
//使用pinia控制标题
import { useHideStore } from '../stores';
const hidestore = useHideStore()
const title = ref(hidestore.TitleMap[name].hide)
const string = ref(hidestore.TitleMap[name].string[0])
</script>

<style lang="less" scoped>
@import '../less/nav.less';

// 控制背景
.el-header {
  background-image: url('../assets/post_bg.png');
}
</style>
<!-- 非 scoped 样式：用于动态插入的泡泡 -->
<style lang="less">
@import '../less/bubble.less';
</style>