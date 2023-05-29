/**
 * 服务器配置、路由配置
 */
const SERVER_CONFIG = {
    HOST: window.SERVER_HOST,
    PORT: window.SERVER_PORT
};

export default {
    SERVER_BASE_URL: `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/`,
    SERVER_API: {
        LOGIN_GET_VALIDGRAPHIC: 'authenticate/getvalidgraphic',                                         // 获取验证码图片
        LOGIN_AUTH: 'authenticate/login',                                                               // 登录验证

        MARKETING_CONTRACT_LIST: 'api/salesbusiness/salescontract/list',                                // 销售合同列表
        MARKETING_CONTRACT_SHORT_LIST: 'api/project/produceplan/getsalesprojectlist',                   // 销售合同字典列表
        MARKETING_CONTRACT_MODIFY: 'api/salesbusiness/salescontract/modify',                            // 销售合同 新增 && 编辑
        MARKETING_CONTRACT_DETAIL: 'api/salesbusiness/salescontract/edit',                              // 销售合同详情
        MARKETING_CONTRACT_DELETE: 'api/salesbusiness/salescontract/delete',                            // 销售合同 移除
        MARKETING_CONTRACT_INVOICE_APPLY: 'api/salesbusiness/salescontract/invoiceapply',               // 销售合同 开票申请

        CUSTOMER_CLASSIFICATION_LIST: 'api/salesbusiness/customcategory/list',                          // 客户分类列表
        CUSTOMER_CLASSIFICATION_MODIFY: 'api/salesbusiness/customcategory/modify',                      // 客户分类新增 && 编辑
        CUSTOMER_CLASSIFICATION_DELETE: 'api/salesbusiness/customcategory/delete',                      // 客户分类 删除

        UNIT_OF_MEASUREMENT_LIST: 'api/stock/measureunit/list',                                         // 计量单位列表
        UNIT_OF_MEASUREMENT_MODIFY: 'api/stock/measureunit/modify',                                     // 计量单位新增 && 编辑
        UNIT_OF_MEASUREMENT_DELETE: 'api/stock/measureunit/delete',                                     // 计量单位 删除

        CUSTOMER_LIST: 'api/salesbusiness/custom/list',                                                 // 客户列表
        CUSTOMER_DETAIL: 'api/salesbusiness/custom/edit',                                               // 客户详情
        CUSTOMER_MODIFY: 'api/salesbusiness/custom/modify',                                             // 客户新增 && 编辑
        CUSTOMER_DELETE: 'api/salesbusiness/custom/delete',                                             // 客户 删除

        OPERATION_AND_MAINTENANCE_TIME_LIST: 'api/salesbusiness/salescontract/operadatelist',           // 运维时间列表
        OPERATION_AND_MAINTENANCE_TIME_MODIFY: 'api/salesbusiness/salescontract/operadatemodify',       // 运维时间新增 && 编辑
        OPERATION_AND_MAINTENANCE_TIME_DETAIL: 'api/salesbusiness/salescontract/operadateedit',         // 运维时间详情
        OPERATION_AND_MAINTENANCE_TIME_DELETE: 'api/salesbusiness/salescontract/operadatedelete',       // 运维时间删除

        UPLOAD_FILE: 'api/project/operaorder/uploadfile',                                               // 静态文件上传
        GET_DICTS_BY_TYPE_ID: 'api/project/dict/getdictsbytypeid',                                      // 根据字典类型id获取字典集合
        GET_PRODUCT_TYPE_LIST: 'api/stock/devicetype/list',                                             // 获取产品类别列表
        GET_DEVICE_TYPE_LIST: 'api/stock/device/getdevicelistbytypeid',                                 // 获取设备品种列表

        INVENTORY_ALARM_SETTINGS_LIST: 'api/stock/stockwarn/list',                                      // 库存报警设置列表
        INVENTORY_ALARM_SETTINGS_MODIFY: 'api/stock/stockwarn/modify',                                  // 库存报警设置新增 && 编辑
        INVENTORY_ALARM_SETTINGS_DELETE: 'api/stock/stockwarn/delete',                                  // 库存报警设置 删除
        INVENTORY_ALARM_SETTINGS_DETAIL: 'api/stock/stockwarn/edit',                                    // 库存报警设置 详情

        QUERY_PRODUCT_LIST: 'api/stock/device/list',                                                    // 产品列表
        QUERY_ACCESSORIES_LIST: 'api/stock/sparepart/list',                                             // 配件列表
        QUERY_WAREHOUSE_LIST: 'api/stock/warehouse/list',                                               // 仓库列表

        STOCK_SUMMARY_LIST: 'api/stock/list',                                                           // 现有库存列表

        SUPPLY_CHANNEL_LIST: 'api/stock/supplier/list',                                                 // 供应商 列表
        SUPPLY_CHANNEL_MODIFY: 'api/stock/supplier/modify',                                             // 供应商 新增 && 编辑
        SUPPLY_CHANNEL_DELETE: 'api/stock/supplier/delete',                                             // 供应商  删除
        SUPPLY_CHANNEL_DETAIL: 'api/stock/supplier/edit',                                               // 供应商  详情

        PRODUCT_CLASSIFICATION_LIST: 'api/stock/devicetype/list',                                       // 产品类别 列表
        PRODUCT_CLASSIFICATION_MODIFY: 'api/stock/devicetype/modify',                                   // 产品类别 新增 && 编辑
        PRODUCT_CLASSIFICATION_DELETE: 'api/stock/devicetype/delete',                                   // 产品类别  删除
        PRODUCT_CLASSIFICATION_DETAIL: 'api/stock/devicetype/edit',                                     // 产品类别  详情

        // QUERY_PRODUCT_LIST                                                                           // 产品 列表
        PRODUCT_MODIFY: 'api/stock/device/modify',                                                      // 产品 新增 && 编辑
        PRODUCT_DELETE: 'api/stock/device/delete',                                                      // 产品 删除
        PRODUCT_DETAIL: 'api/stock/device/edit',                                                        // 产品 详情

        ACCESSORY_CLASSIFICATION_LIST: 'api/stock/spareparttype/list',                                  // 配件类别 列表
        ACCESSORY_CLASSIFICATION_MODIFY: 'api/stock/spareparttype/modify',                              // 配件类别 新增 && 编辑
        ACCESSORY_CLASSIFICATION_DELETE: 'api/stock/spareparttype/delete',                              // 配件类别  删除
        ACCESSORY_CLASSIFICATION_DETAIL: 'api/stock/spareparttype/edit',                                // 配件类别  详情

        // QUERY_ACCESSORIES_LIST                                                                       // 配件 列表
        ACCESSORY_MODIFY: 'api/stock/sparepart/modify',                                                 // 配件 新增 && 编辑
        ACCESSORY_DELETE: 'api/stock/sparepart/delete',                                                 // 配件 删除
        ACCESSORY_DETAIL: 'api/stock/sparepart/edit',                                                   // 配件 详情

        STOCK_IN_AND_STOCK_OUT_MODIFY: 'api/stock/stockorder/modify',                                   // 出入库单 新增 && 编辑
        STOCK_IN_AND_STOCK_OUT_LIST: 'api/stock/stockorder/list',                                       // 出入库单 列表
        STOCK_IN_AND_STOCK_OUT_DELETE: 'api/stock/stockorder/delete',                                   // 出入库单 删除
        STOCK_IN_AND_STOCK_OUT_DETAIL: 'api/stock/stockorder/edit',                                     // 出入库单 详情
    }
}