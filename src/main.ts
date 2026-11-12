import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)
// 挂载路由
import router from './router'
app.use(router)
// 挂载pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
// Element Plus 组件由 vite 插件按需引入（见 vite.config.ts），这里不再整体注册
// 只注册模板里用到的图标
import { Search, ArrowUpBold } from '@element-plus/icons-vue'
app.component('Search', Search)
app.component('ArrowUpBold', ArrowUpBold)
import SvgIcon from './components/iconfont/SvgIcon.vue'
import './assets/iconfont/iconfont.js'
app.component('SvgIcon', SvgIcon)
// 引入字体
import "./assets/fonts/font.css"
app.mount('#app')
// 引入NProgress 加载条
import 'nprogress/nprogress.css'
