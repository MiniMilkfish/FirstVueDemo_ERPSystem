import MOTATION_TYPES from '../constantMotationTypes';

/**
 * 处理同步请求
 */
export default {
    // 登录自增 - 测试
    [MOTATION_TYPES.MASTER_HEADER_TAB_ON_SELECT](state, payload) {
        state.currentHeaderTabTag = payload.key;
        state.currentHeaderTabDashboardPageUrl = payload.url;
    }
}