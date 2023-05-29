import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    [ACTION_TYPES.CUSTOMER_CLASSIFICATION_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    }
}