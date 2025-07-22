import { defineStore } from "pinia"

interface MyItem {
    name: string
    //个性签名
    individuality: string
    // 公告
    affiche: string
}
export const useMyStore = defineStore('my', {
    state: (): MyItem => ({
        name: '南下',
        individuality: '一个无趣的人',
        affiche: '本站正在进行重要的系统升级和优化工作，以改善性能并提供更优质的用户体验。感谢您的理解与支持，升级后将带来更加完善的服务。敬请期待！'
    })
})