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
// 引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
// 引入ico图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import SvgIcon from './components/iconfont/SvgIcon.vue'
import './assets/iconfont/iconfont.js'
app.component('SvgIcon', SvgIcon)
// 引入字体
import "./assets/fonts/font.css"
app.mount('#app')
