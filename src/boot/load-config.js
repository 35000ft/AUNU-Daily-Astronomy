// src/boot/load-config.js
import {boot} from "quasar/wrappers";
import axios from "axios";

export default boot(({app}) => {
  axios.get('/public/config.json').then(res => {
    // 将配置存储在全局属性中，以便在其他组件中使用
    app.config.globalProperties.$config = res.data;
  })
});
