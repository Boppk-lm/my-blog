<template>
  <div class="nav-wrapper">
    <!-- PC端导航栏 -->
    <el-menu mode="horizontal" class="el-menu-demo  pc-nav" :ellipsis="false" :default-active="$route.path" router
      background-color="transparent" text-color="#fff" active-text-color="#fff">
      <!-- logo -->
      <el-menu-item index="/" class="no-underline">
        <img style="width: 180px" src="../assets/logo.webp" alt="logo" />
      </el-menu-item>
      <!-- 首页 -->
      <el-menu-item index="/">
        <el-icon size="25">
          <SvgIcon iconName="icon-zhuye-copy"></SvgIcon>
        </el-icon>
        首页
      </el-menu-item>
      <!-- 开发历程 -->
      <el-menu-item index="/log">
        <el-icon size="25">
          <SvgIcon iconName="icon-ColourSystemManagement-copy"></SvgIcon>
        </el-icon>
        开发历程
      </el-menu-item>
      <!-- 关于我 -->
      <el-menu-item index="/me">
        <el-icon size="25">
          <SvgIcon iconName="icon-wogerenziliao-copy"></SvgIcon>
        </el-icon>
        关于我
      </el-menu-item>
    </el-menu>

    <!-- 移动端顶栏：常驻，滚过封面后变白底 -->
    <div class="mobile-nav-top">
      <img class="mobile-logo" src="../assets/logo.webp" alt="logo" />
      <button class="mobile-menu-btn" aria-label="打开菜单" @click="isOpen = true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    </div>

    <!-- 手机端抽屉菜单：从右侧滑入 -->
    <transition name="slide">
      <div v-if="isOpen" class="mobile-overlay" @click="isOpen = false">
        <nav class="mobile-menu" @click.stop>
          <div class="mobile-menu-header">
            <span class="mobile-menu-title">导航</span>
            <button class="mobile-close" aria-label="关闭菜单" @click="isOpen = false">
              <span class="close-disc">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
            </button>
          </div>

          <ul class="mobile-menu-list">
            <li v-for="item in menuItems" :key="item.path" class="mobile-item"
              :class="{ active: $route.path === item.path }" @click="goTo(item.path)">
              <span class="mobile-bar"></span>
              <SvgIcon :iconName="item.icon" class="mobile-icon" />
              <span>{{ item.name }}</span>
            </li>
          </ul>

          <p class="mobile-menu-foot">LvDaMengの开发日志</p>
        </nav>
      </div>
    </transition>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRouter } from "vue-router";
import SvgIcon from './iconfont/SvgIcon.vue';

const isOpen = ref(false);
const router = useRouter();

// 三个入口只写一份，PC 和抽屉都从这取
const menuItems = [
  { path: '/', name: '首页', icon: 'icon-zhuye-copy' },
  { path: '/log', name: '开发历程', icon: 'icon-ColourSystemManagement-copy' },
  { path: '/me', name: '关于我', icon: 'icon-wogerenziliao-copy' },
]

const goTo = (path: string) => {
  router.push(path);
  isOpen.value = false;
};
// 抽屉打开时锁滚动，顺手支持 ESC 关闭（桌面调试方便）
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') isOpen.value = false
}
watch(() => isOpen.value, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'; // 禁止滚动
    window.addEventListener('keydown', onKeydown);
  } else {
    document.body.style.overflow = ''; // 恢复滚动
    window.removeEventListener('keydown', onKeydown);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<style lang="less" scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
  margin-right: auto;
}

/* 透明 */
.el-menu--horizontal {
  border-bottom-color: transparent !important;

}

/* 移除悬浮和选中时的背景色 */
.el-menu--horizontal .el-menu-item:hover,
.el-menu--horizontal .el-menu-item.is-active {
  background-color: transparent !important;
}

/* 添加下划线效果 */
.el-menu--horizontal .el-menu-item {
  font-family: "阿里妈妈数黑体 Bold" !important;
  position: relative;
  border-bottom: transparent !important;
}

.el-menu--horizontal .el-menu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #fff;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

/*鼠标悬浮时*/.el-menu--horizontal .el-menu-item:not(.no-underline):hover::after {
  width: 80%;
}

/* 激活下划线*/
.el-menu--horizontal .el-menu-item.is-active:not(.no-underline)::after {
  width: 80%;
}

.pc-nav {
  display: flex;
}

/* 手机端顶栏默认隐藏 */
.mobile-nav-top {
  display: none;
}

@media (max-width: 768px) {

  /* 手机端隐藏 PC 导航 */
  .pc-nav {
    display: none !important;
  }

  .mobile-nav-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    box-sizing: border-box;
    /* 原来的毛玻璃：不铺底色，只把底下的封面糊一层 */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .mobile-logo {
    width: 120px;
    height: auto;
    display: block;
    /* logo 图本身四周有大量透明留白，盒子比顶栏高，
       不加这句会挡住顶栏下方一条区域的点击 */
    pointer-events: none;
  }

  .mobile-menu-btn {
    /* 视觉上 24px，点击区撑到 44px，符合触摸标准 */
    width: 44px;
    height: 44px;
    margin-right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: none;
    border: none;
    /* 白图标压在照片上会发飘，靠一层阴影提亮，不用黑色 */
    color: #fff;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
}

/* ------- 手机端抽屉菜单（浅色毛玻璃侧滑面板） ------- */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 99998;
  /* 遮罩只负责压暗，面板单独浮在它上面 */
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-end;
}

.mobile-menu {
  width: 78vw;
  max-width: 320px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 12px calc(16px + env(safe-area-inset-bottom));
  padding-top: env(safe-area-inset-top);
  /* 浅色毛玻璃：白 84% + 模糊，深色字才压得住 */
  background-color: rgba(255, 255, 255, 0.84);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border-radius: 16px 0 0 16px;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
  color: #26323d;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  flex: 0 0 auto;
  padding-left: 4px;
}

.mobile-menu-title {
  font-size: 12px;
  color: #9aa1aa;
  letter-spacing: 2px;
}

.mobile-close {
  width: 44px;
  height: 44px;
  margin-right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* 视觉上 32px 圆底，点击区还是外面那 44px */
.close-disc {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  color: #5b6470;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  flex: 1;
}

.mobile-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 12px;
  margin-bottom: 4px;
  border-radius: 12px;
  font-size: 17px;
  color: #333c48;
  cursor: pointer;
  transition: background-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  /* 当前所在页高亮 */
  &.active {
    background-color: #e7f0fd;
    color: #1f3a5f;
    font-weight: 600;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

/* 当前页左侧竖条，没选中时占位保持左边对齐 */
.mobile-bar {
  width: 3px;
  height: 16px;
  border-radius: 2px;
  margin-right: 10px;
  background-color: transparent;
  flex: 0 0 auto;

  .mobile-item.active & {
    background-color: #409eff;
  }
}

.mobile-icon {
  width: 22px;
  height: 22px;
  margin-right: 12px;
  flex: 0 0 auto;
}

.mobile-menu-foot {
  flex: 0 0 auto;
  margin: 0;
  padding-top: 12px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.08);
  text-align: center;
  font-size: 12px;
  color: #a0a7b0;
  pointer-events: auto;
}

/* 从右侧滑入，不再是一起淡入 */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease;
}

.slide-enter-active .mobile-menu,
.slide-leave-active .mobile-menu {
  transition: transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .mobile-menu,
.slide-leave-to .mobile-menu {
  transform: translateX(100%);
}
</style>
