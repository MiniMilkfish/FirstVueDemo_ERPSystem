import MOTATION_TYPES from '../constantMotationTypes';
import CONSTANT_DATA from '../../utils/contantData';

/**
 * 处理同步请求
 */
export default {
    //  顶部标题选中事件
    [MOTATION_TYPES.MASTER_HEADER_TAB_ON_SELECT](state, payload) {
        state.currentHeaderTabTag = payload.key;
        state.currentHeaderTabDashboardPageUrl = payload.url;
    },
    [MOTATION_TYPES.MASTER_GO_BACK_HOME](state) {
        state.currentHeaderTabTag = "首页";
        state.currentHeaderTabDashboardPageUrl = CONSTANT_DATA.PAGE_LISTS.DASHBOARD;
    }
}