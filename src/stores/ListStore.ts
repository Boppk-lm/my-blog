interface ListItem {
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
}
import { defineStore } from "pinia"
export const useListStore = defineStore('list', {
    state: (): { ListMap: ListItem[] } => ({
        ListMap: [
            {
                id:1,
                cover:'cover1.png',
                title: '《lvdamengの博客》系统技术解析:纯静态博客',
                content: '《lvdamengの博客》是一款基于前后端分离架构的现代化博客平台,致力于为内容创作者和读者提供安全、便捷、功能丰富的博客服务。项目采用 Node.js 作为后端开发语言，搭配轻量级框架 effic，前端基于 Vue2 实现用户交互（前端代码未在本目录中）。系统集内容管理、用户互动、数据存储、第三方服务集成等功能于一体，支持多端访问，尤其适合个人博主、企业资讯发布等场景。',
                name: '南下',
                date: '2025-6-26',
                tag: '前端开发日志'
            },
               {
                id:2,
                cover:'cover2.png',
                title: '《lvdamengの开发日志》系统技术解析:纯静态博客',
                content: '《lvdamengの博客》是一款基于前后端分离架构的现代化博客平台,致力于为内容创作者和读者提供安全、便捷、功能丰富的博客服务。项目采用 Node.js 作为后端开发语言，搭配轻量级框架 effic，前端基于 Vue2 实现用户交互（前端代码未在本目录中）。系统集内容管理、用户互动、数据存储、第三方服务集成等功能于一体，支持多端访问，尤其适合个人博主、企业资讯发布等场景。',
                name: '南下',
                date: '2025-7-21',
                tag: '前端开发日志'
            },
        ]
    }),
      actions: {
  }
})