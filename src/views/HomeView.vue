<template>
  
  <el-container>
   <!-- 导航栏 -->
  <div class="nav-bar" :class="{ hide: isHidden }">
    <NavBar />
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
  <el-backtop :bottom="100" :visibility-height="100" :right="5">
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isHidden = ref(false) // 控制导航栏显示或隐藏
let lastScrollTop = 0 // 上次滚动位置

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  if (scrollTop > lastScrollTop) {
    // 向下滚动，隐藏导航栏
    isHidden.value = true
  } else {
    // 向上滚动，显示导航栏
    isHidden.value = false
  }

  lastScrollTop = scrollTop // 更新上次位置
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
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
.nav-bar {
  position: fixed; /* 固定在页面最顶部 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 999; /* 保证浮在最上层 */
  transition: transform 0.5s ease, background-color 0.5s ease; /* 平滑动画 */
  background-color: rgba(0, 0, 0, 0); /* 初始透明 */
}

.nav-bar.hide {
  transform: translateY(-100%); /* 向上滑动自己，把导航栏“藏起来” */
    background-color: rgba(0, 0, 0, 0.3); /* 向上收缩时，渐显出灰色背景 */
}
</style>