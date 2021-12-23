import { createApp } from 'vue';
// import { createStore } from 'vuex';
import 'ant-design-vue/dist/antd.css';
import './assets/fonts/font.css';
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Form,
  Checkbox,
  Button,
  Spin,
  Dropdown
} from 'ant-design-vue';
import App from './App.vue';
import router from './route/index';
// import MOTATION_TYPES from './store/constantMotationTypes';
import store from './store/index';

import vMasterDashboard from "./components/vMasterDashboard.vue";
import vNotFound from "./components/vNotFound.vue";

const app = createApp(App);

/**
 * 路由引用
 */
app.use(router);

/**
 * 状态管理引用
 */
app.use(store);

/**
 * ant-design-vue 组件引用
 */
app.use(Layout)
  .use(Menu)
  .use(Breadcrumb)
  .use(Input)
  .use(Form)
  .use(Checkbox)
  .use(Spin)
  .use(Dropdown)
  .use(Button);

/**
 * 注册自定义组件
 */
app.component('vMasterDashboard', vMasterDashboard);
app.component('vNotFound', vNotFound);

/**
 * 应用挂载
 */
app.mount('#app');
