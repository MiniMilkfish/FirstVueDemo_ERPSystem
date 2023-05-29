import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 库存报警设置 查询
    [ACTION_TYPES.SUPPLY_CHANNEL_LIST_QUERY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.SUPPLY_CHANNEL_LIST}`,
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
                commit(ACTION_TYPES.SUPPLY_CHANNEL_LIST_QUERY, json);
            }
        }, _extraTools)
    },
    // 库存报警设置 新增/ 编辑
    [ACTION_TYPES.SUPPLY_CHANNEL_MODIFY]({ commit, state }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.SUPPLY_CHANNEL_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                supplierid: state.supplyChannelDetail.supplierid,
                suppliername: payload.suppliername,
                shortcode: payload.shortcode,
                level: payload.level
            };
        if (payload.remark && payload.remark.length > 0) reqParam.remark = payload.remark;

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 库存报警设置 删除
    [ACTION_TYPES.SUPPLY_CHANNEL_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.SUPPLY_CHANNEL_DELETE}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                supplierid: payload.id,
            };

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 库存报警设置详情
    [ACTION_TYPES.SUPPLY_CHANNEL_DETAIL]({ commit }, id) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.SUPPLY_CHANNEL_DETAIL}`,
            _extraTools = {
            },
            reqParam = { id };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.SUPPLY_CHANNEL_DETAIL, json);
            }
        }, _extraTools)
    },
}