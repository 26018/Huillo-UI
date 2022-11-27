import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import mavonEditor from "mavon-editor"
import 'mavon-editor/dist/css/index.css'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.use(mavonEditor)

Vue.config.productionTip = false;
export default new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

// 添加请求拦截器
// 全局拦截 加token
axios.interceptors.request.use((config) => {
    config.headers["token"] =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6ImpheTI1NzI0OCIsImlkIjoiMSIsImV4cCI6MTk2NTM3MTYwOCwiYWNjb3VudCI6IjIwMzM0NzEzNDlAcXEuY29tIn0.CycRBdg3-zaUBltCIWzufrfYJKKjeY-GUs7oReLhOIg";
    return config;
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let status = response.data.code;
    if (status != 200) {
        Message({
            message: response.data.message,
            type: "error",
            showClose: true,
        })
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message({
        message: error.message,
        type: 'error',
        showClose:true
    })
    return Promise.reject(error);
});
