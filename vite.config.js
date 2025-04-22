import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: command === 'serve' || mode === 'development',
      // 生产环境移除console
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      // 静态资源处理
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 2000,
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
  };
});
