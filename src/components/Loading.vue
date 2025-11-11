<template>
    <!-- 过渡组件transition包裹加载动画，实现淡入淡出效果 -->
    <transition name="fade">
        <div v-if="isLoading" class="loading">
            <div class="dots-container">
                <div class="dots">
                    <div class="dot">
                    </div>
                    <div class="dot">
                    </div>
                    <div class="dot">
                    </div>
                </div>
                <div class="underline"></div> <!-- 下划线 -->
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '../router'

const isLoading = ref(true)

// 路由切换加载动画控制
onMounted(() => {
    router.beforeEach(() => {
        isLoading.value = true
    })
    router.afterEach(() => {
        isLoading.value = false
    })
})
</script>

<style scoped lang="less">
.loading {
    position: fixed; /*相对于浏览器定位*/
    inset: 0;
    background-color: #f8fbff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

/* 外层容器，包含小球和下划线 */
.dots-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dots {
    display: flex;
    gap: 12px;
    margin-bottom: 10px;

    /* 小球和下划线间距 */
    .dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #4fa3f7, #00bcd4);
        animation: pulse 1.5s infinite ease-in-out;
    }
}

/* 下划线 */
.underline {
    width: 90px;
    height: 3px;
    background-color: #ccc;
    border-radius: 2px;
}

/* 给每个小球加不同的延迟 */
.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.3s;
}

.dot:nth-child(3) {
    animation-delay: 0.6s;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.6;
    }

    50% {
        transform: scale(1.3);
        opacity: 1;
    }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0; /* 开始或结束时透明 */
}
</style>
