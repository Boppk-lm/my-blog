import { defineStore } from "pinia"

export interface LogItem {
    id: number
    // 日期  
    date: string
    // 标题
    title: string
    // 内容
    content: string
    // 简介 
    insight: string
}
export const useLogStore = defineStore('log', {
    state: (): { LogMap: LogItem[] } => ({
        LogMap: [{
            id: 0,
            date: '2025/06/20',
            title: '博客框架搭建与部署',
            content: '完成博客基础框架的开发，并通过GitHub Pages实现线上部署。',
            insight: '🚀 终于有自己的博客了，开心~ '
        },
        {
            id: 1,
            date: '2025/06/22',
            title: '自动化部署集成与组件引入',
            content: '实现博客自动化部署流程，并集成ElementPlus组件库及Less预处理器。',
            insight: '⚡ 自动化部署 好用！接下来搞定导航栏~'
        },
        {
            id: 2,
            date: '2025/06/23',
            title: '实现导航栏滚动隐藏效果',
            content: '成功给导航栏添加了滚动时自动隐藏/显示的交互效果，优化了视觉体验。',
            insight: '🎯 滚动隐藏实现，豪看！'
        },
        {
            id: 3,
            date: '2025/06/24',
            title: '导航栏组件封装',
            content: '完成导航栏样式及交互效果的组件化封装',
            insight: '📦 导航栏封装完成 下一步文章列表！'
        },
        {
            id: 4,
            date: '2025/06/26',
            title: '文章列表视觉设计',
            content: '完成博客文章列表的视觉样式开发，效果还不错。',
            insight: '✨ 整体还可以！ 个人卡片启动~'
        },
        {
            id: 5,
            date: '2025/06/27',
            title: '个人卡片与公告栏模块开发',
            content: '完成了个人介绍卡片及公告栏模块的基础功能实现。',
            insight: '😮‍💨 有点累了！勉强完成~'
        },
        {
            id: 6,
            date: '2025/06/28',
            title: '视觉体验升级',
            content: '优化了博客背景图设计，新增动态冒泡特效，并更新了Logo及网站图标(favicon)。',
            insight: '🖌️ 新的心情，新的开始~'
        },
        {
            id: 7,
            date: '2025/06/30',
            title: '关于我页面视觉升级',
            content: '完成个人介绍页面的全面优化，包括布局调整、视觉元素增强和细节打磨，显著提升了整体美感。',
            insight: '🫢 没想到... 我竟然是个i人！'
        },
        {
            id: 8,
            date: '2025/07/01',
            title: '实现标签云效果',
            content: '完成标签云模块，经技术评估后选择采用成熟第三方库实现，兼顾效率与质量。',
            insight: '🛌 越来越干不动啦~ 想摆烂了.'
        },
        {
            id: 9,
            date: '2025/07/18',
            title: '文章详情页开发重启',
            content: '成功完成文章详情界面的核心功能开发，实现内容展示与排版优化。',
            insight: '🚧  别问我 为什么这么长时间没进度.. '
        },
        {
            id: 10,
            date: '2025/07/20',
            title: '标题内容管理',
            content: '引入Pinia进行全局状态管理，并实现博客标题的动态渲染与持久化功能，提升数据流可维护性。',
            insight: '🧠 Pinia接管大脑！感觉和VueX差不多~'
        },
        {
            id: 11,
            date: '2025/07/21',
            title: '文章列表内容管理',
            content: '基于Pinia重构文章列表数据流，实现高效的状态管理与动态渲染，大幅提升数据加载性能与可维护性。',
            insight: '😭 拱啊 组件通信 你这个红蛋！'
        },
        {
            id: 12,
            date: '2025/07/23',
            title: '个人中心内容管理',
            content: '使用Pinia统一管理个人中心数据，同时优化了博客页脚的视觉设计。',
            insight: '💪  Me模块+页脚双杀~'
        },
        {
            id: 13,
            date: '2025/07/25',
            title: '核心功能状态管理',
            content: '基于Pinia完成开发历程与文章详情模块的全局状态管理，奠定了坚实的基础。',
            insight: '🎉 新的里程碑达成！接下来就是完善数据了~'
        },
        {
            id: 14,
            date: '2025/07/27',
            title: '开发历程数据里程碑',
            content: '全面完善博客开发历程的核心数据，为项目提供完整历史档案。',
            insight: '💻 console.log过的青春都作数！'
        }
        ]
    }),
    getters: {
        // 把数组倒过来
        reverseLogMap: (state): LogItem[] => {
            return [...state.LogMap].reverse()
        }
    }
})