import ACTION_TYPES from '../constantActionTypes';
import CONSTANT_DATA from "../../utils/constantData";

/**
 * 处理同步请求
 */
export default {
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 产品列表
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_PRODUCT_LIST](state, payload) {
        state.productList = payload.rows;
    },
    // 配件列表
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_ACCESSORIES_LIST](state, payload) {
        state.accessoriesList = payload.rows;
    },
    // 仓库列表
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_WAREHOUSE_LIST](state, payload) {
        state.warehouseList = payload.rows;
    },
    // 报警类型变更事件
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_WARNTYPE_ONCHANGE](state, typeid) {
        let matchTypeid = '', matchTypemodel = '';
        switch (parseInt(typeid)) {
            case parseInt(CONSTANT_DATA.WARN_TYPE[0]['key']):
                // 产品
                if (state.productList && state.productList.length > 0) {
                    matchTypeid = state.productList[0].id;
                    matchTypemodel = state.productList[0].devicemodel;
                }
                break;
            case parseInt(CONSTANT_DATA.WARN_TYPE[1]['key']):
                // 配件
                if (state.accessoriesList && state.accessoriesList.length > 0) {
                    matchTypeid = state.accessoriesList[0].id;
                    matchTypemodel = state.accessoriesList[0].sparepartmodel;
                }
                break;
            default:
                if (state.productList && state.productList.length > 0) {
                    matchTypeid = state.productList[0].id;
                    matchTypemodel = state.productList[0].devicemodel;
                }
                break;
        }
        state.inventoryAlarmSettingsDetail.typeid = matchTypeid;
        state.inventoryAlarmSettingsDetail.typemodel = matchTypemodel;
    },
    // 产品 & 配件变更事件
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_TYPEID_ONCHANGE](state, payload) {
        state.inventoryAlarmSettingsDetail.typemodel = payload.typemodel;
    },
    // 库存报警设置详情
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DETAIL](state, json) {
        state.inventoryAlarmSettingsDetail = json;
    },
    // 库存报警设置详情重置
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DETAIL_CLEAR](state) {
        state.inventoryAlarmSettingsDetail = {
            id: 0,
            warntype: CONSTANT_DATA.WARN_TYPE[0]['key'],
            typeid: '',
            typemodel: '',
            warnvalue: '',
            remark: ''
        };

        if (state.productList && state.productList.length > 0) {
            state.inventoryAlarmSettingsDetail.typeid = state.productList[0].id;
            state.inventoryAlarmSettingsDetail.typemodel = state.productList[0].devicemodel;
        }

        if (state.warehouseList && state.warehouseList.length > 0) {
            state.inventoryAlarmSettingsDetail.warehouseid = state.warehouseList[0].id;
        }
    }
}