import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 客户列表 查询
    [ACTION_TYPES.CUSTOMER_LIST_QUERY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.CUSTOMER_LIST}`,
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
                commit(ACTION_TYPES.CUSTOMER_LIST_QUERY, json);
            }
        }, _extraTools)
    },
    // 客户分类 查询
    [ACTION_TYPES.CUSTOMER_CLASSIFICATION_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.CUSTOMER_CLASSIFICATION_LIST}`,
            _extraTools = {
            },
            reqParam = {
                page: 1,
                rows: 10000
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json && json.rows) {
                commit(ACTION_TYPES.CUSTOMER_CLASSIFICATION_LIST, {
                    classificationList: json.rows
                });
            }
        }, _extraTools)
    },
    // 客户详情 查询
    [ACTION_TYPES.CUSTOMER_DETAIL]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.CUSTOMER_DETAIL}`,
            _extraTools = {
            },
            reqParam = {
                id: payload.id
            };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.CUSTOMER_DETAIL, { customerDetail: json });
            }
        }, _extraTools)
    },
    // 客户列表 新增/ 编辑
    [ACTION_TYPES.CUSTOMER_MODIFY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.CUSTOMER_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: payload.id,
                customname: payload.customname,
                categoryid: payload.categoryid,
                customlevel: payload.customlevel,
                linkman: payload.linkman,
                linkphone: payload.linkmanphone,
                remark: payload.remark,
            };

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 客户列表 删除
    [ACTION_TYPES.CUSTOMER_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.CUSTOMER_DELETE}`,
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
    }
}