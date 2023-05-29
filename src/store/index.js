import { createStore, createLogger } from 'vuex';
import moduleGlobal from './module/moduleGlobal';
import moduleLogin from './module/moduleLogin';
import moduleMasterHeader from './module/moduleMasterHeader';
import moduleMasterLeftMenu from './module/moduleMasterLeftMenu';
import moduleUnitOfMeasurement from './module/moduleUnitOfMeasurement';
import moduleMarketingContract from './module/moduleMarketingContract';
import moduleCustomerClassification from './module/moduleCustomerClassification';
import moduleCustomerList from './module/moduleCustomerList';
import moduleOperationAndMaintenanceTime from './module/moduleOperationAndMaintenanceTime';
import moduleInventoryAlarmSettings from './module/moduleInventoryAlarmSettings';
import moduleStockSummary from './module/moduleStockSummary';
import moduleSupplyChannel from './module/moduleSupplyChannel';
import moduleProductClassification from './module/moduleProductClassification';
import moduleAccessoryClassification from './module/moduleAccessoryClassification';
import moduleProductList from './module/moduleProductList';
import moduleAccessoriesList from './module/moduleAccessoriesList';
import moduleStockInAndStockOut from './module/moduleStockInAndStockOut';

export default createStore({
    modules: {
        moduleGlobal,
        moduleLogin,
        moduleMasterHeader,
        moduleMasterLeftMenu,
        moduleUnitOfMeasurement,
        moduleMarketingContract,
        moduleCustomerClassification,
        moduleCustomerList,
        moduleOperationAndMaintenanceTime,
        moduleInventoryAlarmSettings,
        moduleStockSummary,
        moduleSupplyChannel,
        moduleProductClassification,
        moduleAccessoryClassification,
        moduleProductList,
        moduleAccessoriesList,
        moduleStockInAndStockOut
    },
    plugins: [createLogger()]
});