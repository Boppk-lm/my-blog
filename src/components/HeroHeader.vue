<template>
    <!-- 背景图 -->
    <div class="hero-header" ref="heroRef">
        <!-- 背景层：先铺小图，大图加载完再切换 -->
        <div class="hero-bg" :style="{ backgroundImage: currentBg }"></div>
        <!-- 泡泡容器 -->
        <div class="bubble-container"></div>
        <!-- 文字容器 -->
        <div class="header-content">
            <h1>{{ title }}</h1>
            <p>
                <slot name="subtitle"></slot>
            </p>  
        </div>
    </div>
</template>

<script setup lang='ts'>
//导入封装泡泡效果
import { onMounted,ref } from 'vue';
import useBubbleHide from '../composables/useBubbleHide';
const props = withDefaults(defineProps<{
    title: string,
    bg: string,
    bubble?: boolean   // 控制冒泡效果
    smallBg: string,   // 小图（新增）
}>(),{
    bubble: true
})
// 只有 bubble = true 时才启用冒泡效果
if (props.bubble !== false) {
    useBubbleHide()
}
const currentBg = ref(`url(${props.smallBg})`); // 初始为小图
const heroRef = ref<HTMLElement | null>(null); 
onMounted(() => {
    const img = new Image();
    img.src = props.bg;
    img.onload = () => {
        currentBg.value = `url(${props.bg})`; // 加载完成后切换为大图
        if (heroRef.value) {
            heroRef.value.classList.add('loaded'); // 添加已加载类
        }
    };
});
</script>

<style lang="less" scoped>
.hero-header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 8px;
    width: 100%;
    height: 750px; /* 建议设置固定高度 */
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    padding: 0 !important;
    aspect-ratio: 16 / 9;

    // 背景图由 .hero-bg 承载，blur 才不会波及里面的文字
    .hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        // 放大一点，让模糊产生的边缘羽化被容器裁掉，避免露白边
        transform: scale(1.06);
        filter: blur(12px);
        transition: filter 0.7s ease;
    }

    &.loaded .hero-bg {
        filter: blur(0);
    }
    /* 16:9宽高比 */

    // 条纹叠加层
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
            repeating-linear-gradient(45deg,
                rgba(255, 255, 255, 0.08) 0,
                rgba(255, 255, 255, 0.08) 1px,
                transparent 1px,
                transparent 6px); // 条纹背景
    }

    // 图上文字
    .header-content {
        position: relative;
        text-align: center;
        z-index: 2;

        h1 {
            font-size: 48px;
            font-weight: 500;
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
            letter-spacing: 2px;
            margin: 0;
        }

        p {
            margin-top: 16px;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.85);
            text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
        }
    }

    // 泡泡容器
    .bubble-container {
        position: absolute;
        inset: 0; //充满盒子
        overflow: hidden;
        z-index: 3;
        pointer-events: none;

    }

}
    /* 平板 / 小笔记本：封面不要占满整个首屏 */
@media (max-width: 1200px) {
    .hero-header {
        height: 560px;
         .header-content {
        h1 {
            font-size: 36px;
         }
        p {
            font-size: 16px;
        }
    }
}
}
    /* 📱 移动端自动变矮 */
@media (max-width: 768px) {
    .hero-header {
        height: 300px; /* 你也可以调成 400 */
         .header-content {
            margin-top: 50px;
        h1 {
            font-size: 24px;
         }
        p {
            font-size: 12px;
        }
    }
}
}
</style>