//公共控制导航栏的显示与隐藏的方法
import { ref, onMounted, onBeforeUnmount } from 'vue'
export default function useScrollHide() {
    const isHidden = ref(false) // 控制导航栏显示或隐藏
    let lastScrollTop = 0 // 上次滚动位置
    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        if (scrollTop > lastScrollTop) {
            // 向下滚动，隐藏导航栏
            isHidden.value = true
        } else {
            // 向上滚动，显示导航栏
            isHidden.value = false
        }

        lastScrollTop = scrollTop // 更新上次位置
    }
    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })
    return {
        isHidden
    }
}