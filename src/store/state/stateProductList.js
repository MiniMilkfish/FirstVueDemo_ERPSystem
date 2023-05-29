import CONSTANT_DATA from "../../utils/constantData";

export default {
    tableData: {
        data: [],
        total: 0,
        activePage: 1,
    },
    productListDetail: {
        id: 0,
        devicename: "",                         // 产品名称
        devicemodel: "",                        // 产品型号
        devicetypeid: "",                       // 产品类型id
        supplierid: "",                         // 供应商id
        unitid: "",                             // 单位id
        specialflag: "",                        // 产品标识（0 成品，1 半成品）
        devicepriceamount: "",                  // 产品单价
        remark: "",                             // 备注
        bomslist: [                             // Bom清单列表(该产品由哪些配件组成)
            // {
            //     sparepartid: "",             // 配件id
            //     sparepartname: "",           // 配件名称
            //     sparepartmodel: "",          // 配件型号
            //     sparepartcount: "",          // 配件数量
            //     unit: "",                    // 配件单位
            //     coreflag: "",                // 核心配件标识（0 普通配件，1 核心配件）
            // }
        ]
    },
    productClassificationList: [],          // 产品分类列表
    unitOfMeasurementList: [],              // 计量单位列表
    accessoryList: [],                      // 配件列表
    supplyChannelList: [],                  // 供应商列表
    productFlag: CONSTANT_DATA.PRODUCT_FLAG,
    sparepartFlag: CONSTANT_DATA.SPAREPART_FLAG,
};