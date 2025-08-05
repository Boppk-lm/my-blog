export interface ListItem {
  id: number
  // 封面
  cover: string
  // 标题
  title: string
  // 简介
  content: string
  // 名字
  name: string
  // 日期
  date: string
  // 分类
  tag: string
  // 分类id
  tagId: number
  // 文章
  post: string
}
import { defineStore } from "pinia"
export const useListStore = defineStore('list', {
  state: (): { ListMap: ListItem[] } => ({
    ListMap: [
      {
        id: 0,
        cover: 'cover1.png',
        title: '我的建站缘由',
        content: '我一直都想有个自己的网站，在里面我可以记录一些东西，虽然现在它还只是个静态的，但我相信不久以后，它会慢慢变的更好的，就如你我一样。',
        name: '南下',
        date: '2025-07-28',
        tag: '生活随笔',
        tagId: 1,
        post: `
## 📘  建站缘由

说实话，一开始也不知道该写些什么。  
脑子里有很多想法，却都难以组织成一句完整的话。

如果非要说建站的理由——谁不想拥有一个属于自己的网站呢？我也不例外。

现在它还很稚嫩，只是一个静态博客，但我希望它能慢慢成长，变得更加丰富、完整。

老实说，这段时间我还挺焦虑的。  
不知道未来是否还能继续走在前端这条路上，毕竟现在找工作确实不容易。  
未来会怎样，我也没答案。

但不管怎样，我会坚持更新这个博客。  
就当是送给未来的自己一份礼物吧。

字不多，话也简，但我想这正是一个开始。

> 纪念我的第一篇博客文章 🌱

        `
      },
      {
        id: 1,
        cover: 'cover2.png',
        title: '《lvdamengの开发日志》技术解析:纯静态博客',
        content: '基于 Vue 3 + Vite 构建的纯静态博客系统，无需后端，支持按需加载与模块化开发。文章将详解页面结构、动画实现、静态资源管理与自动部署流程，全面解析《lvdamengの开发日志》背后的技术实现。',
        name: '南下',
        date: '2025-07-30',
        tag: '前端开发',
        tagId: 2,
        post: ` 
\`\`\`txt
一个简单、纯净、完全由我控制的前端博客项目
\`\`\`

## 🧭 项目背景

作为一名前端开发者，我一直想要一个属于自己的博客：不依赖服务器，不用数据库，也不担心后台崩溃。  
于是我从零开始搭建了这个纯静态博客，目前部署在 GitHub Pages 上，结构简洁，性能出色。

## ⚙️ 技术栈一览

- 框架：Vue 3 + Vite
- 语言：TypeScript
- 样式：Tailwind CSS
- 构建工具：Vite
- 内容管理：文章内容现已全部使用 Markdown 编写，提升了写作效率和内容维护性
- 部署方式：GitHub Pages，支持自动 CI/CD

## 💡 核心功能

- 首页展示文章卡片，封面图片动态导入（\`import.meta.glob\`）
- 文章数据通过 JSON 统一管理元数据，内容以 Markdown 格式存储
- 时间轴按日期动态渲染
- 路由懒加载，优化加载速度
- 背景冒泡动画，纯 CSS + JS 实现，轻量且美观

## 🌈 动效设计：冒泡效果

博客目前主要的视觉动效是一个简洁的气泡动画，通过 \`requestAnimationFrame\` 实现流畅的动画效果，随机轨迹和透明度保证不干扰阅读体验。

\`\`\`ts
onMounted(() => {
  // 获取页面中的 .bubble-container 容器
  const container = document.querySelector('.bubble-container')
  if (!container) return

  // 创建 30 个泡泡
  for (let i = 0; i < 30; i++) {
    const bubble = document.createElement('div') // 创建一个 div
    bubble.className = 'bubble' // 设置 class，CSS 会识别样式

    const size = Math.random() * 20 + 10 // 随机大小：10~30px
    bubble.style.width = \`\${size}px\`
    bubble.style.height = \`\${size}px\`

    bubble.style.left = \`\${Math.random() * 100}%\` // 随机水平位置（百分比）
    bubble.style.animationDuration = \`\${4 + Math.random() * 4}s\` // 4~8 秒的动画时间
    // 先快速出现前10个，后20个慢慢浮
    bubble.style.animationDelay = i < 10 ? '0s' : \`\${Math.random() * 3}s\`
    container.appendChild(bubble) // 插入到容器中
  }
})
\`\`\`

## 🚀 GitHub Pages 自动部署流程
1. 代码推送到 \`main\` 分支
2. GitHub Pages 自动构建并发布 \`/dist\` 目录内容
3. 支持自定义域名配置（不过暂时还没有）

无需服务器和数据库，只需推送代码，网站自动在线。

## 🎯 目前存在的不足

- SEO 优化空间有限，属于纯前端 SPA
- 评论和访问统计功能尚未集成

## 🛠️ 后续计划

- 集成轻量级评论系统（例如 Waline）
- 增加更多分类和标签功能
- 支持文章目录、锚点导航和代码高亮

> 一个简单、纯净、完全由我控制的前端博客项目
    `
      },
    ]
  }),
  actions: {
  },
  getters: {
    listLength: (state) => state.ListMap.length,
    tagLength: (state) => {
      // 利用 Set 统计唯一的 tagId 数量
      const uniqueTagIds = new Set(state.ListMap.map(item => item.tagId))
      return uniqueTagIds.size
    }
  }
})