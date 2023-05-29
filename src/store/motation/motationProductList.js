import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    // 产品列表
    [ACTION_TYPES.PRODUCT_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 产品详情
    [ACTION_TYPES.PRODUCT_DETAIL](state, json) {
        state.productListDetail = json;
    },
    // 产品详情重置
    [ACTION_TYPES.PRODUCT_DETAIL_CLEAR](state) {
        state.productListDetail = {
            id: 0,
            devicename: "",
            devicemodel: "",
            devicetypeid: "",
            supplierid: "",
            unitid: "",
            specialflag: "",
            devicepriceamount: "",
            remark: "",
            bomslist: []
        };

        if (state.unitOfMeasurementList && state.unitOfMeasurementList.length > 0) state.productListDetail.unitid = state.unitOfMeasurementList[0].id;
        if (state.productClassificationList && state.productClassificationList.length > 0) state.productListDetail.devicetypeid = state.productClassificationList[0].id;
        if (state.supplyChannelList && state.supplyChannelList.length > 0) state.productListDetail.supplierid = state.supplyChannelList[0].supplierid;
        if (state.productFlag && state.productFlag.length > 0) state.productListDetail.specialflag = state.productFlag[0].key;
    },
    // 产品分类列表
    [ACTION_TYPES.PRODUCT_PAGE_PRODUCT_CLASSIFICATION_LIST](state, payload) {
        state.productClassificationList = payload.rows;
    },
    // 计量单位列表
    [ACTION_TYPES.PRODUCT_PAGE_UNIT_OF_MEASUREMENT_LIST](state, payload) {
        state.unitOfMeasurementList = payload.rows;
    },
    // 配件列表
    [ACTION_TYPES.PRODUCT_PAGE_ACCESSORY_LIST](state, payload) {
        state.accessoryList = payload.rows;
    },
    // 供应商列表
    [ACTION_TYPES.PRODUCT_PAGE_SUPPLY_CHANNEL_LIST](state, payload) {
        state.supplyChannelList = payload.rows;
    },
    // 产品详情 配件清单新增
    [ACTION_TYPES.PRODUCT_DETAIL_DEVICE_BOMLIST_ADD](state, payload) {
        let rowItems = {
            sparepartid: payload.deviceTypeId,
            sparepartcont: "",
            coreflag: "",
            id: Date.now(),
            unit: payload.unit
        };

        if (state.sparepartFlag && state.sparepartFlag.length > 0) rowItems.coreflag = state.sparepartFlag[0].key;
        state.productListDetail.bomslist.push(rowItems)
    },
    // 产品详情 配件清单移除
    [ACTION_TYPES.PRODUCT_DETAIL_DEVICE_BOMLIST_REMOVE](state, id) {
        let currentBom = [].concat(state.productListDetail.bomslist);
        let index = currentBom.findIndex(deviceItem => deviceItem.id === id);

        if (index > -1) {
            currentBom.splice(index, 1)
            state.productListDetail.bomslist = [].concat(currentBom);
        }
    },
    // 配件清单配件单位获取
    [ACTION_TYPES.PRODUCT_PAGE_ACCESSORY_UNIT_MATCHED](state, payload) {
        let unitName = "个",
            matchUnitname =
                state.accessoryList.filter(
                    item => item.id === payload.accessoryId
                );
        if (matchUnitname && matchUnitname.length > 0)
            unitName = matchUnitname[0].unit;

        let currentBom = [].concat(state.productListDetail.bomslist);
        let index = currentBom.findIndex(deviceItem => deviceItem.id === payload.bomsListId);

        if (index > -1) {
            currentBom[index].unit = unitName;
            state.productListDetail.bomslist = [].concat(currentBom);
        }
    }
}