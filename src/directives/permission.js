/**
 * 权限指令
 * 用法：
 * v-permission="'admin'"
 * v-permission="['admin', 'editor']"
 */

import { useUserStore } from '@/store';

export default {
  mounted(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();
    const userRole = userStore.userInfo.role;

    // 如果角色不存在，移除元素
    if (!userRole) {
      el.parentNode && el.parentNode.removeChild(el);
      return;
    }

    // 判断是否有权限
    const hasPermission = Array.isArray(value)
      ? value.includes(userRole)
      : value === userRole;

    // 如果没有权限，移除元素
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
}; 