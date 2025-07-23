import { defineStore } from "pinia"

interface MeItem {
    //欢迎词标题
    wecome_title: string
    //欢迎词内容
    wecome_content: string
    // 星座
    constellatory: string
    // 来自
    from:string
    //热爱
    like:string
    //标签云
    tagcloud:string[]
}
export const useMeStore = defineStore('me', {
    state: (): MeItem => ({
        wecome_title:'欢迎来到我的博客',
        wecome_content:'一个热爱前端的小男孩',
        constellatory:'白羊',
        from:'江苏',
        like:'游戏人间',
        tagcloud:['Vue', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Pinia', 'GitHub', 'Git',
                '博客', '前端', '动漫', '小说', '理想主义']
    })
})