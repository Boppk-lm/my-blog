<template>
    <!-- 背景图 -->
    <div class="hero-header" :style="{ backgroundImage: `url(${bg})` }">
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
import useBubbleHide from '../composables/useBubbleHide';
const props = withDefaults(defineProps<{
    title: string,
    bg: string,
    bubble?: boolean   // 控制冒泡效果
}>(),{
    bubble: true
})
// 只有 bubble = true 时才启用冒泡效果
if (props.bubble !== false) {
    useBubbleHide()
}
</script>

<style lang="less" scoped>
.hero-header {
    position: relative;
    border-radius: 8px;
    width: 100%;
    height: 750px; /* 建议设置固定高度 */
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    padding: 0 !important;
    background-size: cover;
    /* 图片覆盖整个区域 */
    background-position: center;
    /* 图片居中 */
    background-repeat: no-repeat;
    /* 禁止重复 */
    aspect-ratio: 16 / 9;
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
        margin-top: 300px;
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
    /* 📱 移动端自动变矮 */
@media (max-width: 768px) {
    .hero-header {
        height: 300px; /* 你也可以调成 400 */
    }
}
</style>