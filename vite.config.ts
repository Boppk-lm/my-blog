import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //服务器仓库
  base:'/my-blog/',
  //less配置
   css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
})
