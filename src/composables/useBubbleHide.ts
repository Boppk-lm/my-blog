import { onMounted } from 'vue'
export default function useBubbleHide() {
onMounted(() => {
  // 获取页面中的 .bubble-container 容器
  const container = document.querySelector('.bubble-container')
  if (!container) return

    // 创建 30 个泡泡
    for (let i = 0; i < 30; i++) {
      const bubble = document.createElement('div') // 创建一个 div
      bubble.className = 'bubble' // 设置 class，CSS 会识别样式

      const size = Math.random() * 20 + 10 // 随机大小：10~30px
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`

      bubble.style.left = `${Math.random() * 100}%` // 随机水平位置（百分比）
      bubble.style.animationDuration = `${4 + Math.random() * 4}s` // 4~8 秒的动画时间
        // 先快速出现前10个，后20个慢慢浮
  bubble.style.animationDelay = i < 10 ? '0s' : `${Math.random() * 3}s`
      container.appendChild(bubble) // 插入到容器中
    }
})
}


