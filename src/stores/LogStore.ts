import { defineStore } from "pinia"

interface LogItem {
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
            date: '2018/4/12',
            title: '优化了导航栏',
            content: '今天没干什么，就优化了下导航栏。',
            insight: '🧠 导航越简洁，体验越丝滑。'
        },
    {
            id:1,
            date:'2018/4/12',
            title:'优化了导航栏',
            content:'今天没干什么，就优化了下导航栏。',
            insight:'🧠 导航越简洁，体验越丝滑。'
        }]
    })
})