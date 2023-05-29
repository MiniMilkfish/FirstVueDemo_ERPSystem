import CONSTANT_DATA from "../../utils/constantData";

export default {
    tableData: {
        data: [],
        total: 0,
        activePage: 1,
    },
    stockInAndStockOutListDetail: {
        id: 0,		            // 出入库单id
        stocktype: '',		    // 出入库类型
        goodstype: '',		    // 货物类型
        goodsid: '',		    // 货物id
        goodstatus: '',		    // 货物状态
        goodsname: '',		    // 货物名称
        goodsmodel: '',		    // 货物型号
        goodsflag: '',		    // 货物标识
        supplier: '',		    // 供应商
        unit: '',		        // 货物单位
        stocktime: '',		    // 出入库日期（yyyy-MM-dd）
        deliverytime: '',		// 货物签订日期（yyyy-MM-dd）
        qualitdate: '',		    // 质保日期（yyyy-MM-dd ~ yyyy-MM-dd）
        goodscount: '',		    // 货物数量
        bath: '',		        // 货物批次
        remark: '',		        // 备注
    },
    productClassificationList: [],              // 配件分类列表
    unitOfMeasurementList: [],                  // 计量单位列表
    accessoriesList: [],                        // 配件列表
    productList: [],                            // 产品列表
    supplyChannelList: [],                      // 供应商列表
    sparepartFlag: CONSTANT_DATA.SPAREPART_FLAG,
    warehouseList: [],                          // 仓库列表
};