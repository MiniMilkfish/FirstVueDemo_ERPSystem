import CONSTANT_DATA from "../../utils/constantData";

export default {
    tableData: {
        data: [],
        total: 0,
        activePage: 1,
    },
    inventoryAlarmSettingsDetail: {
        id: 0,
        warntype: CONSTANT_DATA.WARN_TYPE[0]['key'],
        typeid: '',
        typemodel: '',
        warnvalue: '',
        warehouseid: '',
        remark: ''
    },
    productList: [],                // 产品列表
    accessoriesList: [],            // 配件列表
    warehouseList: [],              // 仓库列表
};