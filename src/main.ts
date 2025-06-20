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
app.mount('#app')
