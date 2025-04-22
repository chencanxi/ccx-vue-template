import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebarCollapsed = ref(false);

  // 主题配置
  const theme = ref(localStorage.getItem('theme') || 'light');

  // 设置主题
  function setTheme(newTheme) {
    theme.value = newTheme;
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  // 切换侧边栏状态
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  }

  return {
    sidebarCollapsed,
    theme,
    setTheme,
    toggleSidebar
  };
}); 