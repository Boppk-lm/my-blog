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
      {
        id: 2,
        cover: 'cover.png',
        title: '近期任务汇报：找工作与 Vue3 重构之路',
        content: '汇报一下近期的状态：找工作+重构 Vue2 项目 正好手头有一个 Vue2 的老项目，打算用 Vue3 重新开发一遍，顺便重新熟悉一下 axios',
        name: '南下',
        date: '2025-08-09',
        tag: '生活随笔',
        tagId: 1,
        post: ` 
\`\`\`txt
路还长，一步一步来吧~
\`\`\`

## 📌 近日任务现状

最近准备暂时暂停博客的更新，开始集中精力找工作。

正好手头有一个 **Vue2** 的老项目，打算用 **Vue3** 重新开发一遍，顺便重新熟悉一下 **axios**。

说实话，心里挺忐忑的，感觉自己什么都还不会，还得背好多八股文，讨厌八股文，要是实在找不到就算了。

自己长大了，也得承担起责任了，不能一直赖在家里。

出去进厂也不错，有了马泥，心里也能踏实些。

那句话怎么说来着，不知道我顶不顶的住啊~ 哈哈

> 🚶‍♂️ 人生嘛，就是一步一步走，走到哪算哪。

    `
      },
      {
        id: 3,
        cover: 'cover.png',
        title: 'Vue3 重构大事件后台管理系统总结',
        content: '最近把之前写的大事件后台管理系统从 Vue2 重构到 Vue3，顺便熟悉了 Pinia、Axios、Element Plus 等技术，并整理了心得体会。',
        name: '南下',
        date: '2025-08-20',
        tag: '前端开发',
        tagId: 2,
        post: `
\`\`\`txt
还记得第一次跟着教程一点一点敲代码的自己~
\`\`\`
# 🚀 Vue3 重构大事件后台管理系统

最近，我把之前基于 **Vue2** 的大事件后台管理系统，重新用 **Vue3 + TypeScript + Pinia** 进行了重构。这既是一次练手项目，也是一次系统性复习和巩固前端知识的过程。



## ❓ 为什么要重构？

- **项目老旧**：Vue2 版本依赖较多，语法逐渐落后，不利于维护和扩展。  
- **练习 Vue3 思维**：组合式 API、\`<script setup>\`、响应式机制更适合中大型项目。  
- **熟悉生态**：Pinia 替代 Vuex、Axios 拦截器、Element Plus 等是当前主流方案。  
- **增强项目经验**：既能展示 Vue3 项目经验，也能作为简历亮点。  



## 🛠️ 技术栈

- **Vue3 + Vite + TypeScript**  
- **Pinia** — 状态管理（取代 Vuex）  
- **Element Plus** — UI 组件库  
- **Axios** — 请求/响应拦截器，统一处理 Token 与错误提示  
- **Vue Router** — 路由控制与守卫  



## 📦 主要功能

1. **用户模块**
   - 登录 / 注册 /退出
   - Pinia 存储 Token 与用户信息
   - 请求接口获取用户资料，全局响应式展示
  

2. **头像上传**
   - 支持上传头像
   - Base64 预览 + 服务端更新

3. **文章分类**
   - 新建文章名称和类别等
   - 表单校验 + 接口提交

4. **整体布局**
   - 顶部导航 + 左侧菜单 + 主体内容 + 底部版权
   - 使用 Element Plus 容器实现响应式布局

## 🐞 遇到的坑 & 解决方案

- **Pinia 异步更新**
  - 刚开始 \`console.log(UserStore.userinfo)\` 打印为空
  - 解决：调用时必须 \`await UserStore.getUserinfo()\`
  - 就算 \`userinfo\` 方法里已经是用了 \`await\` ，但在调用时还要再用 \`await \` 保证它是同步的

- **类型定义缺失**
  - 一开始接口返回 \`any\`，缺少约束
  - 解决：补充 \`UserItem\`、\`MenuItem\` 等接口类型
  - Ts的接口、泛型真的好麻烦啊...

- **样式覆盖**
  - Element Plus 默认样式与项目风格冲突
  - 解决：使用 scoped + less 定制局部样式
  -  依旧自定义样式



## ✨ 收获与反思

- 更加熟悉 **Vue3 组合式 API + Pinia**  
- **TypeScript** 带来的类型约束减少了低级 bug  
- 项目覆盖了 **登录、权限、菜单、用户模块**，可作为作品展示  
- 路由权限、安全性、代码抽象仍有待优化  



## 🎯 下一步计划

接下来暂时没有特别明确的方向，可能会去尝试一下 **后端**，也可能探索 **移动端 / 微信小程序**，  
更大概率还是会继续做几个前端项目。说实话，我现在有点迷茫了。 




## ✨ 总结
这次 Vue3 重构让我对前端整体流程有了更清晰的认识。虽然项目并没有完全写完，我主要实现了核心模块，把重点功能练习了一遍，其余部分大多是一些模板化的增删改查。  
但即便如此，我仍然把这个过程视为学习路上的一个阶段性成果。   
        
> 🌱 学习是一场长期投资，脚踏实地才会慢慢见到收获。 

  `
      }
,
      {
        id: 4,
        cover: 'cover5.png',
        title: '进厂了-没想到最后还是这条路',
        content: '最终还是选择了进厂，先攒点钱吧。站班很累，不知道能不能坚持下去。',
        name: '南下',
        date: '2025-09-1',
        tag: '生活随笔',
        tagId: 1,
        post: `
\`\`\`txt
不想长大，大人的烦恼太多了~
\`\`\`
# 📖 未来规划
前端的路一时走不通了，可能是我还不够努力吧。思来想去，还是进了厂。  
至少先有点收入，学点技能，先干一年再做打算。  

不过说实话，站班确实很辛苦，一天要站十几个小时。下班后几乎没有精力做别的事情，有时也会怀疑自己的未来。  
但好在身边遇到的人都挺友善的，这让我心里轻松不少。希望自己能慢慢积累，多掌握点技术，给未来多些选择。  

ps：厂里的饭还是不错的，就是有点小贵。 
        
> 💪 名为生活的大风车啊，我要和你大战三百回合！ 

  `
      }


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