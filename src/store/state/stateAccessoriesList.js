import CONSTANT_DATA from "../../utils/constantData";

export default {
    tableData: {
        data: [],
        total: 0,
        activePage: 1,
    },
    accessoriesListDetail: {
        sparepartid: 0,                         // 配件id
        sparepartname: "",                      // 配件名称
        sparepartmodel: "",                     // 配件型号
        spareparttypeid: "",                    // 配件类型id
        supplierid: "",                         // 供应商id
        unitid: "",                             // 单位id
        specialflag: "",                        // 配件标识（0 普通配件，1 定制加工件）
        sparepartpriceamount: "",               // 配件单价
        remark: "",                             // 备注
    },
    productClassificationList: [],              // 配件分类列表
    unitOfMeasurementList: [],                  // 计量单位列表
    accessoryList: [],                          // 配件列表
    supplyChannelList: [],                      // 供应商列表
    sparepartFlag: CONSTANT_DATA.SPAREPART_FLAG,
};