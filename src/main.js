import { createApp } from 'vue';
// import { createStore } from 'vuex';
import 'ant-design-vue/dist/antd.css';
import './assets/fonts/font.css';
import './assets/css/mine.css';

import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Form,
  Checkbox,
  Button,
  Spin,
  Dropdown,
  Avatar,
  Badge,
  Result,
  Row,
  Col,
  PageHeader,
  Descriptions,
  Table,
  Space,
  ConfigProvider
} from 'ant-design-vue';
import App from './App.vue';
import router from './route/index';
// import MOTATION_TYPES from './store/constantMotationTypes';
import store from './store/index';

/**
 * 引入自定义组件
 */
import vMasterDashboard from "./components/vMasterDashboard.vue";
import vMarketingContract from "./components/vMarketingContract.vue";
import vNotFound from "./components/vNotFound.vue";
import vInternalError from "./components/vInternalError.vue";
import vUnitOfMeasurement from "./components/vUnitOfMeasurement.vue";
import vBusinessMarketingContract from "./components/vBusinessMarketingContract.vue";

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
  .use(Avatar)
  .use(Badge)
  .use(Result)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(PageHeader)
  .use(Descriptions)
  .use(Table)
  .use(Space)
  .use(ConfigProvider);

/**
 * 注册自定义组件
 */
app.component('vMasterDashboard', vMasterDashboard);
app.component('vNotFound', vNotFound);
app.component('vMarketingContract', vMarketingContract);
app.component('vInternalError', vInternalError);
app.component('vUnitOfMeasurement', vUnitOfMeasurement);
app.component('vBusinessMarketingContract', vBusinessMarketingContract);

/**
 * 应用挂载
 */
app.mount('#app');
