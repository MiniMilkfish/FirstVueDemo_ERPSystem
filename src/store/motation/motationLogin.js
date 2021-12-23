import MOTATION_TYPES from '../constantMotationTypes';

/**
 * 处理同步请求
 */
export default {
    // 登录自增 - 测试
    [MOTATION_TYPES.LOGIN_INCREMENT](state) {
        state.loginCount ++;
    },
    [MOTATION_TYPES.WINDOWS_ON_RESIZE](state, payload) {
        state.LoginFormDimensions.sWidth = payload.width;
        state.LoginFormDimensions.sHeight = payload.height;
        state.LoginFormDimensions.isMobile = state.defaultSize > payload.width;
    },
    [MOTATION_TYPES.LOGIN_FORM_SUBMIT](state, payload) {
        state.AuthInfo.authName = payload.name;
        state.AuthInfo.authPass = payload.pass;
        state.AuthInfo.validated = true;
    }
}