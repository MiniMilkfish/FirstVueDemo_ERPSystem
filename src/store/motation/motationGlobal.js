import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    // 全局提醒通知
    [ACTION_TYPES.GLOBAL_NOTIFICATION_SHOW](state, payload) {
        state.notification = {
            ...payload,
            tick: Math.random()
        }
    },
    // 全局Loading
    [ACTION_TYPES.GLOBAL_SPINNING_SHOW](state) {
        state.spinning = true;
    },
    [ACTION_TYPES.GLOBAL_SPINNING_HIDE](state) {
        state.spinning = false;
    }
}