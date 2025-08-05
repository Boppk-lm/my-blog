// 定义接口类型
interface TitleItem {
    hide: string
  string: string[]
}
// 封装各个标题
import { defineStore } from 'pinia'
export const useHideStore = defineStore('hide', {
  state: ():{TitleMap:Record<string,TitleItem>} => ({
    TitleMap:{
      home:  {hide:'南下',string:[
         '欢迎来到我的世界~',
          '一个无趣的人.',
         '一场没有归期的远行~'
      ]},
      log:  {
        hide:'我的开发历程',
        string:['别赶路，感受路！']
      },
      me:     {
        hide:'关于站主',
        string:['喜欢日落、旧书、还有不被打扰的时光']
      },
      post:    {
        hide:'我的文章',
        string:['人性的背后是白云苍狗~']
      },
         class:    {
        hide:'文章分类',
        string:['世界那么大，总有些情绪想安放~']
      }
    }
  }),
  actions: {
  }
})