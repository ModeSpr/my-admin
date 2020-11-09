import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import './router/permission'
import store from "./store";

import '@/styles/variables.scss'; // 变量
// ant-design-vue
// import 'ant-design-vue/dist/antd.css';

import { DatePicker, Layout, Menu, Icon, Breadcrumb,Dropdown,FormModel ,Input,Button} from 'ant-design-vue';
Vue.use(DatePicker)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Dropdown)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Button)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
