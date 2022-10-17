import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(ElementUI);
export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 全局拦截 加token
axios.interceptors.request.use((config) => {
  config.headers["token"] =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6ImpheTI1NzI0OCIsImlkIjoiMSIsImV4cCI6MTk2NTM3MTYwOCwiYWNjb3VudCI6IjIwMzM0NzEzNDlAcXEuY29tIn0.CycRBdg3-zaUBltCIWzufrfYJKKjeY-GUs7oReLhOIg";
  return config;
});
