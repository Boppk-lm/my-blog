import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { format } from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()
  ],
  //服务器仓库
  base: '/',
  //less配置
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  //相对地址@的配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
