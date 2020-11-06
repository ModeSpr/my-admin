import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// ant-design-vue
// import 'ant-design-vue/dist/antd.css';

import '@/styles/variables.scss';
// import 'ant-design-vue/dist/antd.css';
import { DatePicker, Layout, Menu, Sider, Icon } from 'ant-design-vue';
Vue.use(DatePicker)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
