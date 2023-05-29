import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    [ACTION_TYPES.PRODUCT_CLASSIFICATION_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 产品类别详情
    [ACTION_TYPES.PRODUCT_CLASSIFICATION_DETAIL](state, json) {
        state.productClassificationDetail = json;
    },
    // 产品类别详情重置
    [ACTION_TYPES.PRODUCT_CLASSIFICATION_DETAIL_CLEAR](state) {
        state.productClassificationDetail = {
            typeid: 0,
            typename: '',
        };
    }
}