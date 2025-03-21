import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      // 公用接口代理
      '/rest_api': {
        target: 'http://192.168.1.85:9517/',
        changeOrigin: true, // 允许跨域
        secure: true,
        rewrite: (path) => path.replace(/^\/rest_api/, ''), // 重写路径，去掉 /api 前缀
      },
      // 系统功能接口代理
      '/pws_api': {
        target: 'http://192.168.12.138:9518/',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/pws_api/, ''),
      },
    },
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'ie >= 11'], // 支持的目标浏览器
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 额外的 Polyfill
    }),
    // '@babel/plugin-proposal-optional-chaining',
    // '@babel/plugin-proposal-nullish-coalescing-operators', // 空值合并运算符
    // '@babel/plugin-proposal-dynamic-import' // 动态导入
  ],
  build: {
    target: 'es2015', // 输出 ES5 代码
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/styles/variables.scss";`, // 自动引入全局变量
  //     },
  //   },
  // },
})
