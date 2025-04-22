import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;

    // 根据实际接口返回格式修改
    if (res.code !== 200 && res.code !== 0) {
      ElMessage({
        message: res.message || '请求错误',
        type: 'error',
        duration: 5 * 1000
      });

      // 处理特定错误码，如401未授权
      if (res.code === 401) {
        // 可以在这里添加重新登录的逻辑
      }

      return Promise.reject(new Error(res.message || '未知错误'));
    } else {
      return res;
    }
  },
  error => {
    console.error('响应错误:', error);
    ElMessage({
      message: error.message || '请求失败',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service; 