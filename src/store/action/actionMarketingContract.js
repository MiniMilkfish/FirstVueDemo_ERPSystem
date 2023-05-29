import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    // 客户分类列表查询
    [ACTION_TYPES.MARKETING_CONTRACT_CUSTOMER_CLASSIFICATION_LIST]({ commit }) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.CUSTOMER_CLASSIFICATION_LIST}`,
            _extraTools = {},
            reqParam = {
                page: 1,
                rows: 99999
            };

        common.fetchPost(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.MARKETING_CONTRACT_CUSTOMER_CLASSIFICATION_LIST, json);
            }
        }, _extraTools)
    },
    // 销售合同 查询
    [ACTION_TYPES.MARKETING_CONTRACT_LIST_QUERY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.MARKETING_CONTRACT_LIST}`,
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
                commit(ACTION_TYPES.MARKETING_CONTRACT_LIST_QUERY, json);
            }
        }, _extraTools)
    },
    /**
     * 设备品种列表查询
     * @param {*} param0 
     * @param {Object} payload
     * @param {Number} payload.typeid - 产品类别id  
     * @param {Function} payload.actionFailure
     * @param {Function} payload.actionSuccess
     */
    [ACTION_TYPES.MARKETING_CONTRACT_DEVICE_TYPE_LIST]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.GET_DEVICE_TYPE_LIST}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            };

        common.fetchGet(reqUrl, { typeid: payload.typeid }, function (json) {
            if (json && json.length > 0) {
                commit(ACTION_TYPES.MARKETING_CONTRACT_DEVICE_TYPE_LIST, { json, typeid: payload.typeid });
            }
        }, _extraTools)
    },
    // 销售合同 新增/ 编辑
    [ACTION_TYPES.MARKETING_CONTRACT_MODIFY]({ state, commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.MARKETING_CONTRACT_MODIFY}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
                actionSuccess: payload.actionSuccess
            },
            reqParam = {
                id: state.marketingContractDetail.id,
                contractparty: payload.contractparty,
                contractdate: payload.contractdate,
                projectcode: payload.projectcode,
                projectname: payload.projectname,
                projectaddress: payload.projectaddress,
                projectlinkman: payload.projectlinkman,
                contractstatus: payload.contractstatus,
                contractamount: payload.contractamount,
                billingstatus: payload.billingstatus,
                returnstatus: payload.returnstatus,
                customcategoryid: payload.customcategoryid,
                settlementdate: payload.settlementdate,
                settlementamount: payload.settlementamount,
                remark: payload.remark,
            };
        if (payload.salesdevices && payload.salesdevices.length > 0) {
            //#region salesdevices
            //         deviceid: payload.deviceid, // - 设备编号
            //         devicecount: payload.devicecount,
            //         devicelevel: payload.devicelevel,
            //         salestype: payload.salestype,   // - 租买方式
            //#endregion
            reqParam.salesdevices = payload.salesdevices.map(function (item) {
                return {
                    deviceid: item.deviceid,
                    devicecount: item.devicecount,
                    devicelevel: item.devicelevel,
                    salestype: item.salestype
                }
            });
        }

        if (state.marketingContractDetail.contractcode) reqParam.contractcode = state.marketingContractDetail.contractcode;
        if (state.marketingContractDetail.projectlinkmanphone) reqParam.projectlinkmanphone = state.marketingContractDetail.projectlinkmanphone;
        if (state.marketingContractDetail.settlementcoustomid) reqParam.settlementcustomid = state.marketingContractDetail.settlementcoustomid;
        if (state.marketingContractDetail.contractsettlementamount) reqParam.contractsettlementamount = state.marketingContractDetail.contractsettlementamount;
        if (state.marketingContractDetail.contractdocker) reqParam.contractdocker = state.marketingContractDetail.contractdocker;

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 销售合同详情 查询
    [ACTION_TYPES.MARKETING_CONTRACT_DETAIL_QUERY]({ commit }, id) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.MARKETING_CONTRACT_DETAIL}`,
            _extraTools = {},
            reqParam = { id };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                commit(ACTION_TYPES.MARKETING_CONTRACT_DETAIL_QUERY, json);
            }
        }, _extraTools)
    },
    // 销售合同 删除
    [ACTION_TYPES.MARKETING_CONTRACT_DELETE]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.MARKETING_CONTRACT_DELETE}`,
            _extraTools = {
                actionSuccess: payload.actionSuccess,
                actionFailure: payload.actionFailure
            },
            reqParam = {
                id: payload.id,
            };

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    },
    // 开票申请
    [ACTION_TYPES.MARKETING_CONTRACT_INVOICE_APPLY]({ commit }, payload) {
        commit(ACTION_TYPES.GLOBAL_SPINNING_SHOW);
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.MARKETING_CONTRACT_INVOICE_APPLY}`,
            _extraTools = {
                actionSuccess: payload.actionSuccess,
                actionFailure: payload.actionFailure
            },
            reqParam = {
                salescontracts: payload.salescontracts,
            };

        common.fetchPost(reqUrl, reqParam, function () {
            commit(ACTION_TYPES.GLOBAL_SPINNING_HIDE);
            payload.actionCallback();
        }, _extraTools)
    }
}