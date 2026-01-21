<template>
  <div class="nav-wrapper" >
    <!-- PC端导航栏 -->
    <el-menu mode="horizontal" class="el-menu-demo  pc-nav" :ellipsis="false" :default-active="$route.path" router
      background-color="transparent" text-color="#fff" active-text-color="#fff">
      <!-- logo -->
      <el-menu-item index="/" class="no-underline">
        <img style="width: 180px" src="../assets/logo.png" alt="logo" />
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
    <!-- 移动端导航栏 -->
    <div class="mobile-nav-top">
      <img class="mobile-logo" src="../assets/logo.png" alt="logo" />
      <button class="mobile-menu-btn" @click="isOpen = true">☰</button>
    </div>
    <!--手机端全屏抽屉菜单 -->
    <transition name="fade">
      <!-- 遮罩层 -->
      <div v-if="isOpen" class="mobile-overlay" @click="isOpen = false">
        <!-- 抽屉菜单 -->
        <div v-if="isOpen" class="mobile-menu"  @click.stop>

          <div class="mobile-menu-header">
            <img class="mobile-logo-big" src="../assets/logo.png" alt="logo" />
            <button class="mobile-close" @click="isOpen = false">✕</button>
          </div>

          <ul class="mobile-menu-list">
            <li @click="goTo('/')" class="mobile-item">
              <SvgIcon iconName="icon-zhuye-copy" class="mobile-icon" />
              首页
            </li>

            <li @click="goTo('/log')" class="mobile-item">
              <SvgIcon iconName="icon-ColourSystemManagement-copy" class="mobile-icon" />
              开发历程
            </li>

            <li @click="goTo('/me')" class="mobile-item">
              <SvgIcon iconName="icon-wogerenziliao-copy" class="mobile-icon" />
              关于我
            </li>
          </ul>

        </div>
      </div>

    </transition>

  </div>

</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useRouter } from "vue-router";
const isOpen = ref(false);
const router = useRouter();
const goTo = (path: string) => {
  router.push(path);
  isOpen.value = false;
};
watch(() => isOpen.value, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'; // 禁止滚动
  } else {
    document.body.style.overflow = ''; // 恢复滚动
  }
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

/*鼠标悬浮时*/
.el-menu--horizontal .el-menu-item:not(.no-underline):hover::after {
  width: 80%;
}

/* 激活下划线*/
.el-menu--horizontal .el-menu-item.is-active:not(.no-underline)::after {
  width: 80%;
}

.pc-nav {
  display: flex;
}


/* 手机端顶部导航 */
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
    height: 120px;
    top: 0;
    backdrop-filter: blur(10px);
  }

  .mobile-logo {
    width: 140px;
  }

  .mobile-menu-btn {
    font-size: 28px;
    background: none;
    color: white;
    border: none;
  }
}


/* 手机端全屏抽屉菜单 */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 99998;
  backdrop-filter: blur(15px);
}
.mobile-menu {
  color: white;
  height: 60vh;
  display: flex;
  flex-direction: column;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
  height: 120px;
}

.mobile-logo-big {
  width: 140px;
}

.mobile-close {
  font-size: 30px;
  background: none;
  border: none;
  color: white;
}

.mobile-menu-list {
  padding: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  /* ⭐ 垂直平分（关键） */
}

.mobile-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-icon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
  font-size: 18px;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>