import { createStore, createLogger } from 'vuex';
import moduleLogin from './module/moduleLogin';
import moduleMasterHeader from './module/moduleMasterHeader';
import moduleMasterLeftMenu from './module/moduleMasterLeftMenu';

export default createStore({
    modules: {
        moduleLogin,
        moduleMasterHeader,
        moduleMasterLeftMenu
    },
    plugins: [createLogger()]
});