import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 运维时间列表 查询
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_LIST_QUERY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.OPERATION_AND_MAINTENANCE_TIME_LIST}`,
            _extraTools = {
                actionFailure: payload.actionFailure
            },
            reqParam = {
                page: payload.currentPage,
                rows: payload.showPageSize
            };

        if (payload.installRangeDate && payload.installRangeDate[0]) {
            reqParam.installsdate = payload.installRangeDate[0];
            reqParam.installedate = payload.installRangeDate[1];
        }

        if (payload.projectName && payload.projectName.length > 0) reqParam.projectname = payload.projectName;

        common.fetchPost(reqUrl, reqParam, function (json) {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            if (json) {
                json.currentPage = payload.currentPage;
                commit(ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_LIST_QUERY, json);
            }
        }, _extraTools)
    },
    // 运维时间详情 查询
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DETAIL]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.OPERATION_AND_MAINTENANCE_TIME_DETAIL}`,
            _extraTools = {
            },
            reqParam = {
                id: payload.id
            };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DETAIL, { operationAndMaintenanceTimeDetail: json });
                if (json.surverysitefiles && json.surverysitefiles.length > 0) {
                    payload.handleBuildImageFileList(json.surverysitefiles);
                }
            }
        }, _extraTools)
    },
    // 运维时间 新增/ 编辑
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_MODIFY]({ state, commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.OPERATION_AND_MAINTENANCE_TIME_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: payload.id,
                salescontractid: state.operationAndMaintenanceTimeDetail.salescontractid,
                projectname: payload.projectname,
                plansurverysdate: payload.planSurveryRangeDate[0],
                plansurveryedate: payload.planSurveryRangeDate[1],
                onsitesurverysdate: payload.onsideSurveryRangeDate[0],
                onsitesurveryedate: payload.onsideSurveryRangeDate[1],
                installsdate: payload.installRangeDate[0],
                installedate: payload.installRangeDate[1],
                surverysitefiles: state.operationAndMaintenanceTimeDetail.surverysitefiles,
                remark: payload.info
            };

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 运维时间 删除
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.OPERATION_AND_MAINTENANCE_TIME_DELETE}`,
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