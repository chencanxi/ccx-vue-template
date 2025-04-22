import { createRouter, createWebHashHistory } from 'vue-router';

// 布局组件
import Layout from '../layout/index.vue';

// 路由配置
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: '登录' },
    hidden: true // 在侧边栏中隐藏
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/error/404.vue'),
    meta: { title: '404' },
    hidden: true // 在侧边栏中隐藏
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - CCX CLI` : 'CCX CLI';

  // 这里可以添加登录验证等逻辑
  next();
});

export default router; 