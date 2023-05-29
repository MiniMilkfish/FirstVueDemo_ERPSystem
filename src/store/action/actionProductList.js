import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 产品列表 查询
    [ACTION_TYPES.PRODUCT_LIST_QUERY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_PRODUCT_LIST}`,
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
                commit(ACTION_TYPES.PRODUCT_LIST_QUERY, json);
            }
        }, _extraTools)
    },
    // 产品列表 新增/ 编辑
    [ACTION_TYPES.PRODUCT_MODIFY]({ commit, state }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.PRODUCT_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: state.productListDetail.id,
                devicename: payload.devicename,
                devicemodel: payload.devicemodel,
                devicetypeid: payload.devicetypeid,
                supplierid: payload.supplierid,
                unitid: payload.unitid,
                specialflag: payload.specialflag,
            };

        if (payload.specialflag) reqParam.specialflag = payload.specialflag;
        if (payload.devicepriceamount) reqParam.devicepriceamount = payload.devicepriceamount;
        if (payload.remark && payload.remark.length > 0) reqParam.remark = payload.remark;
        if (payload.bomslist && payload.bomslist.length > 0) {
            let bomslist = payload.bomslist.map(function (item) {
                return {
                    sparepartid: item.sparepartid,
                    sparepartcount: item.sparepartcount,
                    coreflag: item.coreflag,
                };
            });
            reqParam.devicebomlist = [].concat(bomslist);
        }

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 产品列表 删除
    [ACTION_TYPES.PRODUCT_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.PRODUCT_DELETE}`,
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
    // 产品列表详情
    [ACTION_TYPES.PRODUCT_DETAIL]({ commit }, id) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.PRODUCT_DETAIL}`,
            _extraTools = {
            },
            reqParam = { id };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.PRODUCT_DETAIL, json);
            }
        }, _extraTools)
    },
    // 产品分类列表
    [ACTION_TYPES.PRODUCT_PAGE_PRODUCT_CLASSIFICATION_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.PRODUCT_CLASSIFICATION_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.PRODUCT_PAGE_PRODUCT_CLASSIFICATION_LIST, json);
            }
        }, _extraTools)
    },
    // 计量单位列表
    [ACTION_TYPES.PRODUCT_PAGE_UNIT_OF_MEASUREMENT_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.UNIT_OF_MEASUREMENT_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.PRODUCT_PAGE_UNIT_OF_MEASUREMENT_LIST, json);
            }
        }, _extraTools)
    },
    // 配件列表
    [ACTION_TYPES.PRODUCT_PAGE_ACCESSORY_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.QUERY_ACCESSORIES_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.PRODUCT_PAGE_ACCESSORY_LIST, json);
            }
        }, _extraTools)
    },
    // 供应商列表
    [ACTION_TYPES.PRODUCT_PAGE_SUPPLY_CHANNEL_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.SUPPLY_CHANNEL_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 9999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.PRODUCT_PAGE_SUPPLY_CHANNEL_LIST, json);
            }
        }, _extraTools)
    },
}