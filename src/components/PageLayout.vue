<template>
  <!-- 导航栏 -->
  <div class="nav-bar" :class="{ hide: isHidden }">
    <NavBar :active="active" />
  </div>
  <el-container>
    <!-- 顶部封面 -->
    <HeroHeader :bg="bg" :title="title" :bubble="bubble" :small-bg="smallBg">
      <template #subtitle>
        <slot name="subtitle" />
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
  <el-backtop :bottom="100" :visibility-height="10" :right="16">
    <div
        style="
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
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
import PageContent from './PageContent.vue';
import HeroHeader from './HeroHeader.vue';
import useScrollHide from '../composables/useScrollHide';

// 五个页面只有这几个参数不同，其余结构完全一致
withDefaults(defineProps<{
  bg: string          // 封面大图
  smallBg: string     // 封面小图（先显示这个）
  title: string       // 封面标题
  active: string      // 导航栏高亮项
  bubble?: boolean    // 要不要冒泡动画
}>(), {
  bubble: true
})

const { isHidden } = useScrollHide()

</script>

<style lang="less" scoped>
@import '../less/nav.less';
</style>
<!-- 非 scoped 样式：用于动态插入的泡泡 -->
<style lang="less">
@import '../less/bubble.less';
</style>
