import ACTION_TYPES from '../constantActionTypes';
import { getFormatDateNew, isNumber } from '../../utils/common';

/**
 * 处理同步请求
 */
export default {
    //  销售合同列表查询
    [ACTION_TYPES.MARKETING_CONTRACT_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 客户分类列表
    [ACTION_TYPES.MARKETING_CONTRACT_CUSTOMER_CLASSIFICATION_LIST](state, json) {
        state.customerClassification = [].concat(json.rows);
    },
    /**
     * 设备品种列表
     * @param {Object} state 
     * @param {Object} payload 
     * @param {Number} payload.typeid - 产品类别编号
     * @param {Object} payload.json - 设备类别列表
     */
    [ACTION_TYPES.MARKETING_CONTRACT_DEVICE_TYPE_LIST](state, payload) {
        if (state.deviceTypeListWithProductType && !state.deviceTypeListWithProductType[payload.typeid]) state.deviceTypeListWithProductType[payload.typeid] = payload.json;
    },
    // 重置 销售合同详情
    [ACTION_TYPES.MARKETING_CONTRACT_DETAIL_CLEAR](state) {
        state.marketingContractDetail = {
            id: 0,
            contractcode: '',
            contractparty: '',
            contractdate: getFormatDateNew('h'),
            projectcode: '',
            projectname: '',
            projectaddress: '',
            projectlinkman: '',
            projectlinkmanphone: '',
            contractstatus: '',
            contractamount: '',
            billingstatus: '',
            returnstatus: '',
            customcategoryid: '',
            settlementcustomid: '',
            settlementdate: getFormatDateNew('h'),
            settlementamount: '',
            contractsettlementamount: '',
            contractdocker: '',
            deviceid: '',
            devicecount: '',
            devicelevel: '',
            salestype: '',
            remark: '',
            salesdevices: []
        };
    },
    // 销售合同详情 设备列表新增
    [ACTION_TYPES.MARKETING_CONTRACT_DETAIL_SALESDEVICES_ADD](state, deviceTypeId) {
        state.marketingContractDetail.salesdevices.push({
            devicetypeid: deviceTypeId,
            deviceid: "",
            devicecount: "",
            devicelevel: "",
            salestype: "",
            id: Date.now()
        })
    },
    // 销售合同详情 设备列表移除
    [ACTION_TYPES.MARKETING_CONTRACT_DETAIL_SALESDEVICES_REMOVE](state, id) {
        let currentSalesType = [].concat(state.marketingContractDetail.salesdevices);
        let index = currentSalesType.findIndex(deviceItem => deviceItem.id === id);

        if (index > -1) {
            currentSalesType.splice(index, 1)
            state.marketingContractDetail.salesdevices = [].concat(currentSalesType);
        }
    },
    // 销售合同详情查询
    [ACTION_TYPES.MARKETING_CONTRACT_DETAIL_QUERY](state, json) {
        state.marketingContractDetail = Object.assign({}, json);
    },
    // 销售合同详情 设备列表重置
    [ACTION_TYPES.MARKETING_CONTRACT_DEVICE_TYPE_LIST_CLEAR](state, payload) {
        state.deviceTypeListWithProductType[payload.typeid] = [];
        if (payload.dataIndex > -1 && isNumber(payload.dataIndex)) state.marketingContractDetail.salesdevices[payload.dataIndex].deviceid = '';
    }
}