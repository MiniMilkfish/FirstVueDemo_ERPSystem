import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    // 客户列表 查询
    [ACTION_TYPES.CUSTOMER_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 客户分类 查询
    [ACTION_TYPES.CUSTOMER_CLASSIFICATION_LIST](state, payload) {
        state.customerClassificationList = payload.classificationList;
    },
    // 客户详情 查询
    [ACTION_TYPES.CUSTOMER_DETAIL](state, payload) {
        state.customerDetail = payload.customerDetail;
    },
    // 重置 客户详情
    [ACTION_TYPES.CUSTOMER_DETAIL_CLEAR](state) {
        state.customerDetail = {
            id: 0,
            customname: "",
            categoryid: undefined,
            customlevel: "",
            linkman: "",
            linkmanphone: "",
            remark: "",
        }
    },
    // 客户分类选择
    [ACTION_TYPES.CUSTOMER_CATEGORY_ID_SELECT](state, payload) {
        state.customerDetail.categoryId = payload.id;
    }
}