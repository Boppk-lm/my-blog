<template>
  <el-menu mode="horizontal" class="el-menu-demo" :ellipsis="false" :default-active="active" router
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
    <el-menu-item index="log">
      <el-icon size="25">
        <SvgIcon iconName="icon-ColourSystemManagement-copy"></SvgIcon>
      </el-icon>
      开发历程
    </el-menu-item>
    <!-- 关于我 -->
    <el-menu-item index="me">
      <el-icon size="25">
        <SvgIcon iconName="icon-wogerenziliao-copy"></SvgIcon>
      </el-icon>
      关于我
    </el-menu-item>
  </el-menu>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'
defineProps(['active']) //接收父传来的地址
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


</style>