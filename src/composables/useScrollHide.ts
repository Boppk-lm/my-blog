//公共控制导航栏的显示与隐藏的方法
import { ref, onMounted, onBeforeUnmount } from 'vue'
export default function useScrollHide() {
    const isHidden = ref(false) // 控制导航栏显示或隐藏
    let lastScrollTop = 0 // 上次滚动位置

    const TOP_SAFE = 100 // 顶部 100px 内永远显示导航栏
    const MIN_DELTA = 6 // 抖动容差：单次滚动不足 6px 不算换方向

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        // 贴着顶部时不藏，避免一上来就抽走
        if (scrollTop < TOP_SAFE) {
            isHidden.value = false
            lastScrollTop = scrollTop
            return
        }

        const delta = scrollTop - lastScrollTop
        // 手指回弹、惯性滚动的细小抖动直接忽略
        if (Math.abs(delta) < MIN_DELTA) return

        isHidden.value = delta > 0 // 向下滚动隐藏，向上滚动显示
        lastScrollTop = scrollTop // 更新上次位置
    }
    onMounted(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })
    return {
        isHidden
    }
}
