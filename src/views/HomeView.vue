<template>
  <!-- 导航栏 -->
  <div class="nav-bar" :class="{ hide: isHidden }">
    <NavBar :active="active" />
  </div>

  <el-container>
    <!-- 顶部封面 -->
    <HeroHeader :bg="homeBg" :title="title" :bubble="false" :small-bg="smallBg">
      <template #subtitle>
        <span ref="typingText"></span>
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
const name = 'home'
import homeBg from '../assets/home_bg.png';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
import PageContent from '../components/PageContent.vue';
import HeroHeader from '../components/HeroHeader.vue';
import { ref, onMounted, onUnmounted, reactive } from 'vue';
const active = ref('/')  //控制导航栏地址
//导入封装控制导航栏的函数
import useScrollHide from '../composables/useScrollHide';
const { isHidden } = useScrollHide()
//打字机效果
import Typed from 'typed.js';
const typingText = ref<null | HTMLElement>(null)
onMounted(() => {
  if (typingText.value) {
    const typed = new Typed(typingText.value, {
      strings: string,
      typeSpeed: 100,
      backSpeed: 70,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    })
    // 可选：在组件卸载时销毁 typed 实例，防止内存泄漏
    onUnmounted(() => typed.destroy())
  }
})
//使用pinia控制标题
import { useHideStore } from '../stores';
const hidestore = useHideStore()
const title = ref(hidestore.TitleMap[name].hide)
const string = reactive(hidestore.TitleMap[name].string)
const smallBg = `${homeBg}?width=400&quality=60`;
console.log(smallBg)
console.log("homeBg =", homeBg);
</script>

<style lang="less" scoped>
@import '../less/nav.less';
</style>
