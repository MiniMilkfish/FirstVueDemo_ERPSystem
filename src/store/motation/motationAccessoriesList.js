import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    // 配件列表
    [ACTION_TYPES.ACCESSORY_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 配件详情
    [ACTION_TYPES.ACCESSORY_DETAIL](state, json) {
        state.accessoriesListDetail = json;
    },
    // 配件详情重置
    [ACTION_TYPES.ACCESSORY_DETAIL_CLEAR](state) {
        state.accessoriesListDetail = {
            sparepartid: 0,
            sparepartname: "",
            sparepartmodel: "",
            spareparttypeid: "",
            supplierid: "",
            unitid: "",
            specialflag: "",
            sparepartpriceamount: "",
            remark: "",
        };

        if (state.productClassificationList && state.productClassificationList.length > 0) state.accessoriesListDetail.spareparttypeid = state.productClassificationList[0].id;
        if (state.supplyChannelList && state.supplyChannelList.length > 0) state.accessoriesListDetail.supplierid = state.supplyChannelList[0].supplierid;
        if (state.unitOfMeasurementList && state.unitOfMeasurementList.length > 0) state.accessoriesListDetail.unitid = state.unitOfMeasurementList[0].id;
        if (state.sparepartFlag && state.sparepartFlag.length > 0) state.accessoriesListDetail.specialflag = state.sparepartFlag[0].key;
    },
    // 配件分类列表
    [ACTION_TYPES.ACCESSORY_PAGE_ACCESSORY_CLASSIFICATION_LIST](state, payload) {
        state.productClassificationList = payload.rows;
    },
    // 计量单位列表
    [ACTION_TYPES.ACCESSORY_PAGE_UNIT_OF_MEASUREMENT_LIST](state, payload) {
        state.unitOfMeasurementList = payload.rows;
    },
    // 供应商列表
    [ACTION_TYPES.ACCESSORY_PAGE_SUPPLY_CHANNEL_LIST](state, payload) {
        state.supplyChannelList = payload.rows;
    },
    // 配件清单配件单位获取
    [ACTION_TYPES.ACCESSORY_PAGE_ACCESSORY_UNIT_MATCHED](state, payload) {
        let unitName = "个",
            matchUnitname =
                state.accessoryList.filter(
                    item => item.id === payload.accessoryId
                );
        if (matchUnitname && matchUnitname.length > 0)
            unitName = matchUnitname[0].unit;

        let currentBom = [].concat(state.accessoriesListDetail.bomslist);
        let index = currentBom.findIndex(deviceItem => deviceItem.id === payload.bomsListId);

        if (index > -1) {
            currentBom[index].unit = unitName;
            state.accessoriesListDetail.bomslist = [].concat(currentBom);
        }
    }
}