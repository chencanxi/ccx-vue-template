import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './assets/styles/index.css';
import directives from './directives';

const app = createApp(App);

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局配置
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err, info);
};

app.use(createPinia())
  .use(router)
  .use(ElementPlus, { size: 'default', zIndex: 3000 })
  .use(directives)
  .mount('#app');
