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
app.mount('#app')
