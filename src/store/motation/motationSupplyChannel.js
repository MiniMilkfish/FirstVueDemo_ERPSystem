import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    [ACTION_TYPES.SUPPLY_CHANNEL_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 库存报警设置详情
    [ACTION_TYPES.SUPPLY_CHANNEL_DETAIL](state, json) {
        state.supplyChannelDetail = json;
    },
    // 库存报警设置详情重置
    [ACTION_TYPES.SUPPLY_CHANNEL_DETAIL_CLEAR](state) {
        state.supplyChannelDetail = {
            supplierid: 0,
            suppliername: '',
            shortcode: '',
            level: '',
            remark: ''
        };
    }
}