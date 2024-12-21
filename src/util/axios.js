import axios from 'axios'
const publicPath = process.env.PUBLIC_URL || '/';
console.log('publicPath',publicPath,process.env)

function isAbsoluteURL(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url);
}

const axiosInstance = axios.create({
    // baseURL: 'https://your-api-url.com',  // 设置你的 API 基础 URL
    timeout: 10000,                      // 设置请求超时
    headers: {
      'Content-Type': 'application/json',
      // 其他自定义请求头
    }
});
axiosInstance.interceptors.request.use(
    (config) => {
      if (isAbsoluteURL(config.url)) {
        config.baseURL = '';
      } else  {
        if (!config.url.startsWith(publicPath)){
          config.url = publicPath + config.url;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosInstance
