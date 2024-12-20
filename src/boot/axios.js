import axios from 'axios'

export default ({ app, store }) => {
  // 创建一个新的 axios 实例，可以自定义配置
  // 将 axios 实例挂载到 Vue 实例上，这样可以在组件中直接使用
  app.config.globalProperties.$axios = axios.create({
    baseURL: 'https://your-api-url.com',  // 设置你的 API 基础 URL
    timeout: 10000,                      // 设置请求超时
    headers: {
      'Content-Type': 'application/json',
      // 其他自定义请求头
    }
  });

  // 可选：如果需要将 axios 存储到 Vuex 或其他地方
  // store.$axios = axiosInstance;
};
