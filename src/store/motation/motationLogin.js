import MOTATION_TYPES from '../constantMotationTypes';
import FAKE_DATE from "../../utils/fakeDate";

const topHeaderHeight = 64,
    breadcrumbHeight = 42,
    contentMarginPaddingHeight = 36;

/**
 * 处理同步请求
 */
export default {
    // 登录自增 - 测试
    [MOTATION_TYPES.LOGIN_INCREMENT](state) {
        state.loginCount++;
    },
    // 窗体Resize
    [MOTATION_TYPES.WINDOWS_ON_RESIZE](state, payload) {
        state.LoginFormDimensions.sWidth = payload.width;
        state.LoginFormDimensions.sHeight = payload.height;
        state.LoginFormDimensions.isMobile = state.defaultSize > payload.width;

        const breadcrumbShow = FAKE_DATE.routeList.filter(
            item =>
                item.title ===
                payload.currentHeaderTabTag &&
                item.sub.length > 0 &&
                payload.menuRootPathL > 0
        )[0];

        state.LoginFormDimensions.pageContentHeight = payload.height - topHeaderHeight - (breadcrumbShow ? breadcrumbHeight : 0) - contentMarginPaddingHeight;
    },
    // 登录窗体信息提交
    [MOTATION_TYPES.LOGIN_FORM_SUBMIT](state, payload) {
        state.AuthInfo.authName = payload.name;
        state.AuthInfo.authPass = payload.pass;
        state.AuthInfo.validated = true;
    },
    // 退出当前系统
    [MOTATION_TYPES.MASTER_EXIST_PLATFORM](state) {
        state.AuthInfo.authName = '';
        state.AuthInfo.authPass = '';
        state.AuthInfo.validated = false;
    }
}