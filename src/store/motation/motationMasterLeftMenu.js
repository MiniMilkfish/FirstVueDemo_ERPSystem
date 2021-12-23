import MOTATION_TYPES from '../constantMotationTypes';

/**
 * 处理同步请求
 */
export default {
    [MOTATION_TYPES.MASTER_LEFT_MENU_ITEM_ON_CLICK](state, payload) {
        state.menuRootPath = payload.keyPath;
        state.menuRoot = payload.rootKey;
    }
}