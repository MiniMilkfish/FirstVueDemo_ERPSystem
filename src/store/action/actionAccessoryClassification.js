import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 配件类别 查询
    [ACTION_TYPES.ACCESSORY_CLASSIFICATION_LIST_QUERY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.ACCESSORY_CLASSIFICATION_LIST}`,
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
                commit(ACTION_TYPES.ACCESSORY_CLASSIFICATION_LIST_QUERY, json);
            }
        }, _extraTools)
    },
    // 配件类别 新增/ 编辑
    [ACTION_TYPES.ACCESSORY_CLASSIFICATION_MODIFY]({ commit, state }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.ACCESSORY_CLASSIFICATION_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: state.accessoryClassificationDetail.typeid,
                typename: payload.typename
            };

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 配件类别 删除
    [ACTION_TYPES.ACCESSORY_CLASSIFICATION_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.ACCESSORY_CLASSIFICATION_DELETE}`,
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
    // 配件类别详情
    [ACTION_TYPES.ACCESSORY_CLASSIFICATION_DETAIL]({ commit }, id) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.ACCESSORY_CLASSIFICATION_DETAIL}`,
            _extraTools = {
            },
            reqParam = { id };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.ACCESSORY_CLASSIFICATION_DETAIL, json);
            }
        }, _extraTools)
    },
}