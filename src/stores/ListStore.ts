export  interface ListItem {
    id:number
    // 封面
    cover:string
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
    post:string
}
import { defineStore } from "pinia"
export  const useListStore = defineStore('list', {
    state: (): { ListMap: ListItem[] } => ({
        ListMap: [
            {
                id:0,
                cover:'cover1.png',
                title: '《lvdamengの博客》系统技术解析:纯静态博客',
                content: '《lvdamengの博客》是一款基于前后端分离架构的现代化博客平台,致力于为内容创作者和读者提供安全、便捷、功能丰富的博客服务。项目采用 Node.js 作为后端开发语言，搭配轻量级框架 effic，前端基于 Vue2 实现用户交互（前端代码未在本目录中）。系统集内容管理、用户互动、数据存储、第三方服务集成等功能于一体，支持多端访问，尤其适合个人博主、企业资讯发布等场景。',
                name: '南下',
                date: '2025-6-26',
                tag: '前端开发日志',
                post:` <h3><a id="_0"></a>何谓缓存？</h3>
                                                                <p>用一个现实生活中的例子类比：</p>
                                                                <p>假如你开了一家小卖部，冰箱中摆满了各种饮料，经过观察，你发现：</p>
                                                                <p>把上面的小例子对应到技术场景：</p>
                                                                <blockquote>
                                                                        <p>如果服务器没告诉浏览器这些信息，那浏览器就不管了，不会携带这些信息</p>
                                                                </blockquote>
                                                                <p>服务器能根据浏览器提供的这些信息，与当前最新资源进行对比，从而判断资源是否有改动。</p>
                                                                <h3><a id="_185"></a>总结</h3>
                                                                <p>前端关于缓存方面的技术，除了本次介绍的，还有其他的，</p>
                                                                <p>比如：Service Worker、Storage、indexedDB等，</p>
                                                                <blockquote>
                                                                        <p>以前有个App Cache方案，现在被官方废弃了，</p>
                                                                        <p>大概是列一个清单文件，浏览器对这些文件进行缓存</p>
                                                                </blockquote>
                                                                <p>往大了说，缓存是一种思想，具体看怎么实现，</p>
                                                                <p>比如：你可以在写代码时，为了提高代码运行效率，选择创建了一个Map对象，而不是再套几层For循环。</p>
                                                                <p>缓存思想本质上是用空间换时间，虽然好，但并非毫无代价，这需要占用用户的内存或硬盘的空间。</p>
                                                                <blockquote>
                                                                        <p>我的QQ微信为什么占了手机十几二十G空间？</p>
                                                                        <p>为什么现在电脑16GB运行内存都有点不太够用了？</p>
                                                                </blockquote>
                                                                <p>好了，结束，有问题，请评论区留言。</p>`
            },
               {
                id:1,
                cover:'cover2.png',
                title: '《lvdamengの开发日志',
                content: '《lvdamengの博客》是一款基于前后端分离架构的现代化博客平台,致力于为内容创作者和读者提供安全、便捷、功能丰富的博客服务。项目采用 Node.js 作为后端开发语言，搭配轻量级框架 effic，前端基于 Vue2 实现用户交互（前端代码未在本目录中）。系统集内容管理、用户互动、数据存储、第三方服务集成等功能于一体，支持多端访问，尤其适合个人博主、企业资讯发布等场景。',
                name: '南下',
                date: '2025-7-21',
                tag: '前端开发日志',
                  post:`
                  <h3><a id="_0"></a>何谓缓存？</h3>
                                                                <p>用一个现实生活中的例子类比：</p>
                                                                <p>假如你开了一家小卖部，冰箱中摆满了各种饮料，经过观察，你发现：</p>
                                                                <p>把上面的小例子对应到技术场景：</p>
                                                                <blockquote>
                                                                        <p>如果服务器没告诉浏览器这些信息，那浏览器就不管了，不会携带这些信息</p>
                                                                </blockquote>`
            },
        ]
    }),
      actions: {
  },
  getters: {
    listLength: (state) => state.ListMap.length
  }
})