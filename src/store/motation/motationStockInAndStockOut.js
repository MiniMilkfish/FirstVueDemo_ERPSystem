import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    //  出入库列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_LIST](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    //  出入库详情
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL](state, json) {
        state.stockInAndStockOutListDetail = json;
    },
    //  出入库详情重置
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL_CLEAR](state) {
        state.stockInAndStockOutListDetail = {
            id: 0,
            stocktype: '',
            goodstype: '',
            goodsid: '',
            goodstatus: '',
            goodsname: '',
            goodsmodel: '',
            goodsflag: '',
            supplier: '',
            unit: '',
            stocktime: '',
            deliverytime: '',
            qualitdate: '',
            goodscount: '',
            bath: '',
            remark: '',
        };

        // if (state.productClassificationList && state.productClassificationList.length > 0) state.stockInAndStockOutListDetail.spareparttypeid = state.productClassificationList[0].id;
        // if (state.supplyChannelList && state.supplyChannelList.length > 0) state.stockInAndStockOutListDetail.supplierid = state.supplyChannelList[0].supplierid;
        // if (state.unitOfMeasurementList && state.unitOfMeasurementList.length > 0) state.stockInAndStockOutListDetail.unitid = state.unitOfMeasurementList[0].id;
        // if (state.sparepartFlag && state.sparepartFlag.length > 0) state.stockInAndStockOutListDetail.specialflag = state.sparepartFlag[0].key;
    },
    //  出入库分类列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_STOCK_IN_AND_STOCK_OUT_CLASSIFICATION_LIST](state, payload) {
        state.productClassificationList = payload.rows;
    },
    // 计量单位列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_UNIT_OF_MEASUREMENT_LIST](state, payload) {
        state.unitOfMeasurementList = payload.rows;
    },
    // 供应商列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_SUPPLY_CHANNEL_LIST](state, payload) {
        state.supplyChannelList = payload.rows;
    },
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_WAREHOUSE_LIST](state, payload) {
        state.warehouseList = payload.rows
    },
    //  出入库清单 出入库单位获取
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_STOCK_IN_AND_STOCK_OUT_UNIT_MATCHED](state, payload) {
        let unitName = "个",
            matchUnitname =
                state.accessoriesList.filter(
                    item => item.id === payload.accessoryId
                );
        if (matchUnitname && matchUnitname.length > 0)
            unitName = matchUnitname[0].unit;

        let currentBom = [].concat(state.stockInAndStockOutListDetail.bomslist);
        let index = currentBom.findIndex(deviceItem => deviceItem.id === payload.bomsListId);

        if (index > -1) {
            currentBom[index].unit = unitName;
            state.stockInAndStockOutListDetail.bomslist = [].concat(currentBom);
        }
    },
    // 产品列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PRODUCT_LIST](state, payload) {
        state.productList = payload.rows;
    },
    // 配件列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_ACCESSORY_LIST](state, payload) {
        state.accessoriesList = payload.rows;
    },
}