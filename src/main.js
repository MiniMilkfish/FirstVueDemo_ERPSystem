import { createApp } from 'vue';
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
  ConfigProvider,
  Modal,
  Textarea,
  Radio,
  RangePicker,
  DatePicker,
  Select,
  Upload,
  UploadDragger,
  InputNumber,
  InputSearch,
  Collapse,
  CollapsePanel,
  InputGroup,
  Image
} from 'ant-design-vue';
import App from './App.vue';
import router from './route/index';
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
import vVerificationReport from "./components/vVerificationReport.vue";
import vControlOverInvoices from "./components/vControlOverInvoices.vue";
import vProductionSchedule from "./components/vProductionSchedule.vue";
import vDispatchList from "./components/vDispatchList.vue";
import vPersonnelList from "./components/vPersonnelList.vue";
import vBuildingSiteList from "./components/vBuildingSiteList.vue";
import vOperationAndMaintenanceTime from "./components/vOperationAndMaintenanceTime.vue";
import vStockSummary from "./components/vStockSummary.vue";
import vInventoryAlarmSettings from "./components/vInventoryAlarmSettings.vue";
import vSupplyChannel from "./components/vSupplyChannel.vue";
import vStockInAndStockOut from "./components/vStockInAndStockOut.vue";
import vProductManagement from "./components/vProductManagement.vue";
import vProductClassification from "./components/vProductClassification.vue";
import vProductList from "./components/vProductList.vue";
import vAccessoryClassification from "./components/vAccessoryClassification.vue";
import vAccessoriesList from "./components/vAccessoriesList.vue";
import vInventoryCount from "./components/vInventoryCount.vue";
import vCustomerClassification from "./components/vCustomerClassification.vue";
import vCustomerList from "./components/vCustomerList.vue";

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
  .use(ConfigProvider)
  .use(Modal)
  .use(Textarea)
  .use(Radio)
  .use(RangePicker)
  .use(Select)
  .use(DatePicker)
  .use(Upload)
  .use(UploadDragger)
  .use(InputNumber)
  .use(InputSearch)
  .use(Collapse)
  .use(CollapsePanel)
  .use(InputGroup)
  .use(Image);

/**
 * 注册自定义组件
 */
app.component('vMasterDashboard', vMasterDashboard);
app.component('vNotFound', vNotFound);
app.component('vMarketingContract', vMarketingContract);
app.component('vInternalError', vInternalError);
app.component('vUnitOfMeasurement', vUnitOfMeasurement);
app.component('vBusinessMarketingContract', vBusinessMarketingContract);
app.component('vVerificationReport', vVerificationReport);
app.component('vControlOverInvoices', vControlOverInvoices);
app.component('vProductionSchedule', vProductionSchedule);
app.component('vDispatchList', vDispatchList);
app.component('vPersonnelList', vPersonnelList);
app.component('vBuildingSiteList', vBuildingSiteList);
app.component('vOperationAndMaintenanceTime', vOperationAndMaintenanceTime);
app.component('vStockSummary', vStockSummary);
app.component('vInventoryAlarmSettings', vInventoryAlarmSettings);
app.component('vSupplyChannel', vSupplyChannel);
app.component('vStockInAndStockOut', vStockInAndStockOut);
app.component('vProductManagement', vProductManagement);
app.component('vProductClassification', vProductClassification);
app.component('vProductList', vProductList);
app.component('vAccessoryClassification', vAccessoryClassification);
app.component('vAccessoriesList', vAccessoriesList);
app.component('vInventoryCount', vInventoryCount);
app.component('vCustomerClassification', vCustomerClassification);
app.component('vCustomerList', vCustomerList);

/**
 * 应用挂载
 */
app.mount('#app');