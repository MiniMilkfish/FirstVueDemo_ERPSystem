import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 出入库列表 查询
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_LIST]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.STOCK_IN_AND_STOCK_OUT_LIST}`,
            _extraTools = {
                actionFailure: payload.actionFailure
            },
            reqParam = {
                page: payload.currentPage,
                rows: payload.showPageSize
            };
        if (payload.warehouseid && payload.warehouseid.length > 0) reqParam.warehouseid = payload.warehouseid;
        if (payload.goodsid && payload.goodsid.length > 0) reqParam.goodsid = payload.goodsid;
        if (payload.stocktype && payload.stocktype.length > 0) reqParam.stocktype = payload.stocktype;

        common.fetchPost(reqUrl, reqParam, function (json) {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            if (json) {
                json.currentPage = payload.currentPage;
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_LIST, json);
            }
        }, _extraTools)
    },
    // 出入库列表 新增/ 编辑
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_MODIFY]({ commit, state }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.STOCK_IN_AND_STOCK_OUT_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: state.accessoriesListDetail.sparepartid,
                sparepartname: payload.sparepartname,
                sparepartmodel: payload.sparepartmodel,
                spareparttypeid: payload.spareparttypeid,
                supplierid: payload.supplierid,
                unitid: payload.unitid,
                specialflag: payload.specialflag,
                sparepartpriceamount: payload.sparepartpriceamount,
            };

        if (payload.remark && payload.remark.length > 0) reqParam.remark = payload.remark;

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 出入库列表 删除
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.STOCK_IN_AND_STOCK_OUT_DELETE}`,
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
    // 出入库列表详情
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL]({ commit }, id) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.STOCK_IN_AND_STOCK_OUT_DETAIL}`,
            _extraTools = {
            },
            reqParam = { id };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_DETAIL, json);
            }
        }, _extraTools)
    },
    // 出入库分类列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_STOCK_IN_AND_STOCK_OUT_CLASSIFICATION_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.STOCK_IN_AND_STOCK_OUT_CLASSIFICATION_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_STOCK_IN_AND_STOCK_OUT_CLASSIFICATION_LIST, json);
            }
        }, _extraTools)
    },
    // 计量单位列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_UNIT_OF_MEASUREMENT_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.UNIT_OF_MEASUREMENT_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_UNIT_OF_MEASUREMENT_LIST, json);
            }
        }, _extraTools)
    },
    // 供应商列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_SUPPLY_CHANNEL_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.SUPPLY_CHANNEL_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PAGE_SUPPLY_CHANNEL_LIST, json);
            }
        }, _extraTools)
    },
    // 仓库列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_WAREHOUSE_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_WAREHOUSE_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_WAREHOUSE_LIST, json);
            }
        }, _extraTools)
    },
    // 产品列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PRODUCT_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_PRODUCT_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_PRODUCT_LIST, json);
            }
        }, _extraTools)
    },
    // 配件列表
    [ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_ACCESSORY_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_ACCESSORIES_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.STOCK_IN_AND_STOCK_OUT_ACCESSORY_LIST, json);
            }
        }, _extraTools)
    },
}