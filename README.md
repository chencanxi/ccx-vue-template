# CCX CLI Vue 3 Template

基于 Vue 3 + Element Plus + Vite 的中后台管理系统模板，适用于 CCX CLI 脚手架。

## 特性

- 🚀 使用 Vue 3.x 的 Composition API 开发
- 📦 基于 Vite 构建，提供更快的开发体验
- 🎨 集成 Element Plus 组件库
- 🏆 使用 Pinia 作为状态管理方案
- 📱 响应式布局，支持移动端访问
- 🔒 内置权限控制系统
- 🌙 支持亮色/暗色主题切换
- 📝 丰富的实用组件和工具函数

## 快速开始

### 前置要求

- Node.js >= 14.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产环境版本

```bash
npm run build
```

### 预览生产环境构建

```bash
npm run preview
```

## 项目结构

```
src/
├── api/                # API接口
├── assets/             # 静态资源
│   ├── images/         # 图片
│   └── styles/         # 样式
├── components/         # 组件
│   └── common/         # 通用组件
├── config/             # 配置文件
├── directives/         # 自定义指令
├── hooks/              # 自定义钩子
├── layout/             # 布局组件
├── router/             # 路由配置
├── store/              # 状态管理
│   └── modules/        # 状态模块
├── utils/              # 工具函数
└── views/              # 页面视图
```

## 开发指南

### 环境变量

项目使用以下环境变量文件：

- `.env` - 基础环境变量，适用于所有环境
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量

### 添加新路由

在 `src/router/index.js` 中添加新路由配置：

```js
{
  path: '/your-path',
  name: 'YourRouteName',
  component: () => import('../views/your-path/index.vue'),
  meta: { title: '页面标题', icon: 'IconName' }
}
```

### 添加新页面

1. 在 `src/views/` 目录下创建新的页面组件
2. 在路由配置中引用该组件

### 使用状态管理

在 `src/store/modules/` 中添加新的状态模块，并在 `src/store/index.js` 中导出。

## 贡献指南

欢迎提交 Issue 或 Pull Request 帮助改进这个模板！

## 许可证

[MIT](LICENSE)
