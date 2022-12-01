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
import '@/common/style/global.css'
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$message = function (msg) {
    msg.type = msg.type == 'error' ? 'warning' : msg.type;
    Message(msg)
}
let messageArr = ['success', 'warning', 'info', 'error']
messageArr.forEach(function (type) {
    Vue.prototype.$message[type] = function (options) {
        type = type == 'error' ? 'warning' : type;
        return Message({
            message: options,
            type: type,
            duration: 3000,
            showClose: true,
        });
    }
})


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
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6ImpheTI1NzI0OCIsImNvZGUiOiJudWxsIiwibmlja05hbWUiOiJMc2siLCJpZCI6IjEiLCJleHAiOjE5Njg1MDA2MjksImFjY291bnQiOiIyMDMzNDcxMzQ5QHFxLmNvbSJ9.ZOn2EqkN2AhImBQqeAOk_BUeELmn2SLDjI2mWVYkUnU";
    return config;
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let status = response.data.code || response.status
    if (status != 200) {
        this.$message.info(response.data.message)
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    this.$message.error(error.message)
    return Promise.reject(error);
});
