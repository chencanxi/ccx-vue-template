import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '');
  const userInfo = ref({});

  // 设置Token
  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  // 清除Token
  function clearToken() {
    token.value = '';
    localStorage.removeItem('token');
  }

  // 设置用户信息
  function setUserInfo(info) {
    userInfo.value = info;
  }

  // 登录方法
  async function login(username, password) {
    try {
      // 这里可以接入实际的登录API
      const mockToken = 'mock-token-' + Date.now();
      const mockUserInfo = { username, id: 1, role: 'admin' };

      setToken(mockToken);
      setUserInfo(mockUserInfo);
      return Promise.resolve(mockUserInfo);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 登出方法
  function logout() {
    clearToken();
    userInfo.value = {};
  }

  return {
    token,
    userInfo,
    setToken,
    clearToken,
    setUserInfo,
    login,
    logout
  };
}); 