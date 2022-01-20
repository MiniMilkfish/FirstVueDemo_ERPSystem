import ACTION_TYPES from '../constantActionTypes';
// import FAKE_DATE from "../../utils/fakeDate";
// import ServerConfig from '../../config/urlConfig';
// import * as common from '../../utils/common';

/**
 * 处理同步请求
 */
export default {
    [ACTION_TYPES.UNIT_OF_MEASUREMENT_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    }
}