import ACTION_TYPES from '../constantActionTypes';

/**
 * 处理同步请求
 */
export default {
    // 运维时间 查询
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_LIST_QUERY](state, payload) {
        state.tableData.data = payload.rows;
        state.tableData.total = payload.total;
        state.tableData.activePage = payload.currentPage;
    },
    // 运维时间详情 查询
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DETAIL](state, payload) {
        state.operationAndMaintenanceTimeDetail = {
            id: payload.operationAndMaintenanceTimeDetail.id,
            projectname: payload.operationAndMaintenanceTimeDetail.projectname,
            salescontractid: payload.operationAndMaintenanceTimeDetail.salescontractid,
            planSurveryRangeDate: [
                payload.operationAndMaintenanceTimeDetail.plansurveryedate,
                payload.operationAndMaintenanceTimeDetail.plansurverysdate
            ],
            onsideSurveryRangeDate: [
                payload.operationAndMaintenanceTimeDetail.onsitesurveryedate,
                payload.operationAndMaintenanceTimeDetail.onsitesurverysdate
            ],
            installRangeDate: [
                payload.operationAndMaintenanceTimeDetail.installedate,
                payload.operationAndMaintenanceTimeDetail.installsdate
            ],
            surverysitefiles: payload.operationAndMaintenanceTimeDetail.surverysitefiles || [],
            info: payload.operationAndMaintenanceTimeDetail.remark || ''
        };
    },
    // 重置 运维时间详情
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_DETAIL_CLEAR](state) {
        state.operationAndMaintenanceTimeDetail = {
            id: 0,
            projectname: '',
            salescontractid: '',
            planSurveryRangeDate: [],
            onsideSurveryRangeDate: [],
            installRangeDate: [],
            surverysitefiles: [],
            info: ''
        }
    },
    // 合并上传的文件
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_COMBINE_FILES](state, payload) {
        let files = [];
        if (payload.fileData && Object.keys(payload.fileData).length > 0) {
            files = state.operationAndMaintenanceTimeDetail.surverysitefiles;
            if (files && files.length >= 0) files.push(payload.fileData[0]);
            else files = [].concat(payload.fileData[0]);
        }

        state.operationAndMaintenanceTimeDetail.surverysitefiles = [].concat(files);
        payload.handleBuildImageFileList(payload.fileData);
    },
    // 从文件列表中移除指定的文件
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_REMOVE_FILE](state, fileName) {
        fileName = fileName.split('.').shift();
        let files = state.operationAndMaintenanceTimeDetail.surverysitefiles;
        if (files && files.length > 0) {
            const index = files.findIndex(file => file.filename.includes(fileName));
            const newFileList = files.slice();
            newFileList.splice(index, 1);
            state.operationAndMaintenanceTimeDetail.surverysitefiles = newFileList;
        }
    },
    // 合同列表选择事件
    [ACTION_TYPES.OPERATION_AND_MAINTENANCE_TIME_CONTRACT_SELECT](state, payload) {
        // let selectContractId = [], projectName = [];

        // if (payload.option && payload.option.length > 0) {
        //     if (Object.keys(payload.option.slice(-1)[0]).length > 0) {
        //         selectContractId = payload.value.slice(-1);
        //         projectName = [payload.option.slice(-1)[0].label];
        //     } else {
        //         selectContractId = projectName = payload.value.slice(-1);
        //     }
        // }

        state.operationAndMaintenanceTimeDetail.projectname = payload.option.label;
        state.operationAndMaintenanceTimeDetail.salescontractid = payload.value;
    }
}