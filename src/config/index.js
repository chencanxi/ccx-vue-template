/**
 * 全局配置文件
 */

// 项目基础配置
export const appConfig = {
  // 项目名称
  title: 'CCX CLI',
  // 项目描述
  description: '基于 Vue 3 + Element Plus + Vite 的中后台管理系统模板',
  // 版本号
  version: '1.0.0',
  // 接口地址配置
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
  },
  // 公共请求头
  headers: {
    'Content-Type': 'application/json'
  }
};

// 布局配置
export const layoutConfig = {
  // 侧边栏宽度
  sidebarWidth: 220,
  // 侧边栏收起宽度
  sidebarCollapsedWidth: 64,
  // 顶部导航栏高度
  headerHeight: 60,
  // 页脚高度
  footerHeight: 40,
  // logo配置
  logo: {
    // 是否在侧边栏显示标题
    showTitle: true,
    // 标题
    title: 'CCX CLI',
    // Logo图片URL，为空则不显示
    url: ''
  }
};

// 主题配置
export const themeConfig = {
  // 主题列表
  themes: [
    {
      name: 'light',
      title: '亮色主题',
      config: {
        // 主题色
        '--el-color-primary': '#409eff',
        // 侧边栏背景色
        '--sidebar-bg-color': '#304156',
        // 侧边栏文字颜色
        '--sidebar-text-color': '#bfcbd9',
        // 主体背景色
        '--body-bg-color': '#f5f7f9'
      }
    },
    {
      name: 'dark',
      title: '暗色主题',
      config: {
        // 主题色
        '--el-color-primary': '#409eff',
        // 侧边栏背景色
        '--sidebar-bg-color': '#1f2d3d',
        // 侧边栏文字颜色
        '--sidebar-text-color': '#bfcbd9',
        // 主体背景色
        '--body-bg-color': '#101c2c'
      }
    }
  ],
  // 默认主题
  default: 'light'
}; 