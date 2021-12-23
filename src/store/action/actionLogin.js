import ACTION_TYPE from '../constantMotationTypes';
import MOTATION_TYPES from '../constantMotationTypes';

/**
 * 处理异步请求
 */
export default {
    // 登录自增 - 测试
    [ACTION_TYPE.LOGIN_INCREMENT]({ commit }) {
        setTimeout(() => {
            commit({
                type: MOTATION_TYPES.LOGIN_INCREMENT,
                name: "干就完了"
            })
        }, 3000);
    },
    [ACTION_TYPE.LOGIN_FORM_SUBMIT]({ commit }, payload) {
        setTimeout(() => {
            commit({type: ACTION_TYPE.LOGIN_FORM_SUBMIT, ...payload})
        });
    }
}