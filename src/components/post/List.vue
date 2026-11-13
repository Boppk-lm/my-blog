<template>
  <!-- custom和v-slot实现可选择跳转 -->
  <router-link :to="`/post/${ListMap.id}`" custom v-slot="{ navigate }"> <!-- 传入id -->
    <div class="list">
      <!-- 封面 -->
      <div class="cover" @click="navigate">
        <img :src="coverUrl(ListMap.cover)" alt="" loading="lazy">
        <div class="mask">
          <el-icon size="25">
            <SvgIcon iconName="icon-dianji"></SvgIcon>
          </el-icon>
        </div> <!-- 遮罩 -->
      </div>
      <!-- 内容 -->
      <div class="box">
        <!-- 标题 -->
        <!-- <el-tooltip :content=ListMap.title placement="top"> -->
        <div class="title" @click="navigate">
          {{ ListMap.title }}
        </div>
        <!-- </el-tooltip> -->
        <!-- 简介 -->
        <div class="content">
          <el-icon size="22">
            <SvgIcon iconName="icon-yinhao"></SvgIcon>
          </el-icon>
          <span>{{ ListMap.content }} </span>
        </div>
        <!-- 文章信息 -->
        <div class="info">
          <!-- 头像 -->
          <div class="name">
            <el-avatar :size="32" :src="nameAvatar" />
            <span> {{ ListMap.name }}</span>
          </div>
          <!-- 日期 -->
          <div class="date">
            <el-icon size="20">
              <SvgIcon iconName="icon-riqi1"></SvgIcon>
            </el-icon>
            <span> {{ ListMap.date }}</span>
          </div>
        </div>
        <!-- 标签 -->
        <div class="taglist">
          <div class="tag" @click="goToClass(ListMap.tagId)">
            <el-icon size="20">
              <SvgIcon iconName="icon-weibiaoti-_huabanfuben"></SvgIcon>
            </el-icon>
            <span>{{ ListMap.tag }}</span>
          </div>
        </div>
      </div>
    </div>

  </router-link>
</template>

<script setup lang='ts'>
import nameAvatar from '@/assets/name.webp'
// 动态导入封面：webp / png / jpg 都收，方便本地直接丢原图预览
const images = import.meta.glob('../../assets/cover/*.{webp,png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>

// md 里写 cover15.png 或 cover15 都能用：
// 优先取同名 webp（CI 压缩后的产物），没有再退回原图
const COVER_EXTS = ['webp', 'png', 'jpg', 'jpeg']
function coverUrl(name: string): string {
  if (!name) return ''
  const stem = name.replace(/\.[^.]+$/, '')
  for (const ext of COVER_EXTS) {
    const hit = images[`../../assets/cover/${stem}.${ext}`]
    if (hit) return hit
  }
  return ''
}
// 接受父组件的元素
defineProps(['ListMap'])
// 跳转到分类页面
import { useRouter } from 'vue-router';
const router = useRouter()
function goToClass(tagId: number) {
  router.push(`/class/${tagId}`)
}
</script>

<style lang="less" scoped>
//自定义晃动动画
@keyframes tiltShake {
  0% {
    transform: rotate(0deg) scale(1);
  }

  30% {
    transform: rotate(-2deg) scale(1.03);
  }

  60% {
    transform: rotate(2deg) scale(1.03);
  }

  100% {
    transform: rotate(0deg) scale(1);
  }
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
    transition: opacity 0.3s;

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
      transition: opacity 0.5s;
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
      font-family: "阿里巴巴普惠体 Light";
    }

    .title:hover {
      color: #409eff;
      transition: color 0.2s;
    }

    .content {
      // 多行内容省略
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      /* 显示的行数 */
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 15px;
    }

    .info {
      margin-top: 5px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between; //两端对齐
      align-items: center;
      font-size: 14px;

      .name,
      .date {
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
        align-items: center;
        transition: all 0.3s ease;
        // 默认状态
        background-color: #f2f2f2;

        // 悬浮状态
        &:hover {
          background-color: #409eff1a;
          color: #409eff;
          // transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        span {
          margin-left: 3px; // 让文字和头像之间留一点间距
        }
      }
    }

  }
}
// 手机端：固定 160px 太紧，标题一长或摘要换行就会顶出卡片
@media (max-width: 768px) {
  .list .box {
    height: auto;
    min-height: 150px;
  }
}
</style>