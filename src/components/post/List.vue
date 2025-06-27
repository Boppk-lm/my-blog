<template>
  <!-- custom和v-slot实现可选择跳转 -->
  <router-link to="/post" custom v-slot="{navigate}">
    <div class="list">
    <!-- 封面 -->
   <div class="cover" @click="navigate">
    <img src="../../assets/cover/cover1.png" alt="">
      <div class="mask">
            <el-icon size="25">
          <SvgIcon iconName="icon-dianji"></SvgIcon>
        </el-icon>
      </div> <!-- 遮罩 -->
    </div>
    <!-- 内容 -->
    <div class="box">
      <!-- 标题 -->
      <div class="title"  @click="navigate">
        《lvdamengの博客》系统技术解析:纯静态博客
      </div>
      <!-- 简介 -->
      <div class="content">
             <el-icon size="22">
          <SvgIcon iconName="icon-yinhao"></SvgIcon>
        </el-icon>
         《lvdamengの博客》是一款基于前后端分离架构的现代化博客平台,致力于为内容创作者和读者提供安全、便捷、功能丰富的博客服务。项目采用 Node.js 作为后端开发语言，搭配轻量级框架 effic，前端基于 Vue2 实现用户交互（前端代码未在本目录中）。系统集内容管理、用户互动、数据存储、第三方服务集成等功能于一体，支持多端访问，尤其适合个人博主、企业资讯发布等场景。 
      </div>
    <!-- 文章信息 -->
      <div class="info">
        <!-- 头像 -->
       <div class="name">
         <el-avatar :size="32"
        :src="nameAvatar"
      />
      <span>南下</span>
       </div>
       <!-- 日期 -->
       <div class="date">
           <el-icon size="20">
          <SvgIcon iconName="icon-riqi1"></SvgIcon>
        </el-icon>
      <span>2025-6-26</span>
       </div>
      </div>
      <div class="taglist">
        <div class="tag">
               <el-icon size="20">
          <SvgIcon iconName="icon-weibiaoti-_huabanfuben"></SvgIcon>
        </el-icon>
           前端开发日志
        </div>
      </div>
    </div>
    </div>

  </router-link>
</template>

<script setup lang='ts'>
import nameAvatar  from '@/assets/name.jpg'
</script>

<style lang="less" scoped>
//自定义晃动动画
@keyframes tiltShake {
  0%   { transform: rotate(0deg) scale(1); }
  30%  { transform: rotate(-2deg) scale(1.03); }
  60%  { transform: rotate(2deg) scale(1.03); }
  100% { transform: rotate(0deg) scale(1); }
}
.list {
  border-radius: 10px;
  .cover {
  position: relative;
  overflow: hidden; //溢出隐藏
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  width: 100%;
  height: 160px;
  transition: opacity 0.3s ;
  img {
    width: 100%;
    height: 160px;
    transition: transform 0.3s;
  }
  .mask {
    position: absolute;
    text-align: center;
    line-height: 160px;
    left: 0;
    top: 0;
    width: 100%;
    height: 160px;
    background-color: rgba(0, 0, 0, .3);
    opacity: 0; //透明度
    transition: opacity 0.5s ;
    z-index: 1;
  }
  &:hover {
  .mask {
    opacity: 1;
  }
  img {
    animation: tiltShake 0.8s ease;
  }
}
}

.box {
  padding: 10px;
  width: 100%;
  height: 160px;
  color: rgb(153, 153, 153);
  .title {
    //单行内容省略
    white-space: nowrap;
    /* 禁止文本换行 */
    overflow: hidden;
    /* 隐藏溢出内容 */
    text-overflow: ellipsis;
    /* 显示省略符号 */
    font-size: 20px;
    font-weight: 700;
    color: #000;
    cursor: pointer;
  }
  .title:hover {
    color: #409eff;
    transition: color 0.2s;
  }
  .content {
  // 多行内容省略
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;     /* 显示的行数 */
  overflow: hidden;
  text-overflow: ellipsis; 
  }
  .info {
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between; //两端对齐
    align-items: center;
    font-size: 14px;
    .name,.date {
    display: flex;
    align-items: center;
    }
      span {
      margin-left: 8px; // 让文字和头像之间留一点间距
    }
  }
  .taglist {
    display: flex;
    font-size: 15px;
    .tag {
      display: flex;
      margin-left: 5px;
      cursor: pointer;
    }
  }
  
}
}
</style>