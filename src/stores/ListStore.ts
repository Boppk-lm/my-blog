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
        post: `
                  <h3><a id="_0"></a>建站缘由</h3>
                                                                <p>说实话，我也不知道该说些什么，我觉得自己是一个语言很匮乏的人。</p>
                                                                 <p>脑袋里有很多声音，但都汇不成一句话...</p>
                                                                <p>非要说建站缘由的话，谁不想有个属于自己的网站呢？我也不例外。</p>
                                                                      <p>当然，目前还在发育阶段，只是个静态博客。</p>
                                                                         <p>不过它以后会慢慢成熟的。</p>
                                                                         <p>说真的，现在挺焦虑的！</p>
                                                                <p>也不知道自己能不能继续从事这个行业，毕竟现在的工作不太好找。</p>
                                                                <p>未来的事，谁知道呢.</p>
                                                                   <p>但不论如何，我都会把这个网站坚持下去的，就算是送给未来自己的礼物吧~</p>
                                                                     <p>字数真的好少，哈哈，看来我要多读点书了。</p>
                                                                <blockquote>
                                                                        <p>纪念一下 我的第一篇博客文章~ </p>
                                                                </blockquote>`
      },
      {
        id: 1,
        cover: 'cover2.png',
        title: '《lvdamengの开发日志》技术解析:纯静态博客',
        content: '基于 Vue 3 + Vite 构建的纯静态博客系统，无需后端，支持按需加载与模块化开发。文章将详解页面结构、动画实现、静态资源管理与自动部署流程，全面解析《lvdamengの开发日志》背后的技术实现。',
        name: '南下',
        date: '2025-07-30',
        tag: '前端开发',
        post: ` 
              <pre> <code>一个简单、纯净、完全由我控制的前端博客项目</code></pre>
        <h3>🧭 项目背景</h3>
        <p>作为一名前端开发者，我一直想要一个属于自己的博客：不用服务器、不依赖数据库、不必担心后台崩溃。于是，我从零开始动手搭建了这个纯静态博客项目，目前部署在 GitHub Pages 上，结构简洁，性能极佳。<p/>
          <h3>⚙️ 技术栈一览</h3>
          <ul>
            <li>框架：Vue 3 + Vite</li>
            <li>语言：TypeScript</li>
            <li>样式：Tailwind CSS</li>
            <li>构建：Vite</li>
            <li>内容：目前使用 JSON + Vue 单文件组件（尚未引入 Markdown）</li>
            <li>部署：GitHub Pages（自动化 CI/CD 流程）</li>
          </ul>
               <h3>💡 功能与结构简述</h3>
          <ul>
            <li>首页：展示文章卡片，封面图使用 import.meta.glob 动态导入</li>
            <li>文章系统：通过 JSON 管理元数据（标题、封面、简介等）</li>
            <li>样式：Tailwind CSS</li>
            <li>时间轴：基于文章日期前端渲染，实现年分类归档</li>
            <li>封面图懒加载：优化首页加载性能</li>
            <li>冒泡动效：使用纯 CSS + JS 实现背景动效，提升视觉体验</li>
          </ul>
                      <h3>🌈 动效设计：冒泡效果</h3>
             <p>目前博客的主要视觉增强是一个简约的气泡动画，通过 requestAnimationFrame 实现平滑动画，结合随机轨迹与透明度，保证不抢眼但有动感。</p>
             <pre> <code> function createBubble() {
  const bubble = document.createElement('div')
  bubble.className = 'bubble'
  bubble.style.left = '${Math.random() * 100}%'
  // ...动画逻辑略
}</code></pre>
  <h3>🚀 GitHub Pages 自动部署流程</h3>
  <p>目前使用 GitHub Pages 进行部署，流程非常轻量：</p>
        <ol>
            <li>代码推送至 main 分支</li>
            <li>GitHub Pages 自动构建并发布 /dist 内容</li>
            <li>样式：Tailwind CSS</li>
            <li>可选地配置自定义域名（如 lvmeng.dev）</li>
          </ol>
            <p>无需服务器、无数据库，只要你推送代码，它就在线。</p>
                      <h3>🎯 目前存在的限制</h3>
          <ul>
            <li>暂未使用 Markdown 撰写文章（当前文章均为 JSON + Vue 模板编写）</li>
            
     <li>SEO 表现有限（因是纯前端 SPA）</li>
          <li>评论、统计等功能尚未添加</li>
          </ul>
                           <h3>🛣️ 后续计划</h3>
          <ul>
            <li>⏳ 引入 Markdown 支持，实现更高效的写作方式</li>
            
     <li>⏳ 文章详情页支持目录、锚点、代码高亮等</li>
          <li>⏳ 加入轻量评论系统（如 Waline）</li>
            <li>⏳ 增加分类标签</li>
          </ul>
                                                                <blockquote>
                                                                <p>一个简单、纯净、完全由我控制的前端博客项目</p>
                                                                </blockquote>
    `
      },
    ]
  }),
  actions: {
  },
  getters: {
    listLength: (state) => state.ListMap.length
  }
})