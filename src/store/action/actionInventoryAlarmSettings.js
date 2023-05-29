import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 库存报警设置 查询
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_LIST_QUERY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.INVENTORY_ALARM_SETTINGS_LIST}`,
            _extraTools = {
                actionFailure: payload.actionFailure
            },
            reqParam = {
                page: payload.currentPage,
                rows: payload.showPageSize
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            if (json) {
                json.currentPage = payload.currentPage;
                commit(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_LIST_QUERY, json);
            }
        }, _extraTools)
    },
    // 库存报警设置 新增/ 编辑
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_MODIFY]({ commit, state }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.INVENTORY_ALARM_SETTINGS_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: state.inventoryAlarmSettingsDetail.id,
                warntype: payload.warntype,
                typeid: payload.typeid,
                typemodel: payload.typemodel,
                warnvalue: payload.warnvalue,
                warehouseid: payload.warehouseid,
            };
        if (payload.remark && payload.remark.length > 0) reqParam.remark = payload.remark;

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 库存报警设置 删除
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.INVENTORY_ALARM_SETTINGS_DELETE}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: payload.id,
            };

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 库存报警设置详情
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DETAIL]({ commit }, id) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.INVENTORY_ALARM_SETTINGS_DETAIL}`,
            _extraTools = {
            },
            reqParam = { id };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_DETAIL, json);
            }
        }, _extraTools)
    },
    // 产品列表
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_PRODUCT_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_PRODUCT_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_PRODUCT_LIST, json);
            }
        }, _extraTools)
    },
    // 配件列表
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_ACCESSORIES_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_ACCESSORIES_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_ACCESSORIES_LIST, json);
            }
        }, _extraTools)
    },
    // 仓库列表
    [ACTION_TYPES.INVENTORY_ALARM_SETTINGS_WAREHOUSE_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_WAREHOUSE_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.INVENTORY_ALARM_SETTINGS_WAREHOUSE_LIST, json);
            }
        }, _extraTools)
    },
}