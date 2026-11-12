import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Element Plus 按需引入：模板里用到哪个 el- 组件，才打包哪个
    Components({
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()]
    })
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
