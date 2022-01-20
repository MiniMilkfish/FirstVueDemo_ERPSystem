import { createStore, createLogger } from 'vuex';
import moduleGlobal from './module/moduleGlobal';
import moduleLogin from './module/moduleLogin';
import moduleMasterHeader from './module/moduleMasterHeader';
import moduleMasterLeftMenu from './module/moduleMasterLeftMenu';
import moduleUnitOfMeasurement from './module/moduleUnitOfMeasurement';

export default createStore({
    modules: {
        moduleGlobal,
        moduleLogin,
        moduleMasterHeader,
        moduleMasterLeftMenu,
        moduleUnitOfMeasurement,
    },
    plugins: [createLogger()]
});