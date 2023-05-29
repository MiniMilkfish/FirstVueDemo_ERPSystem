/**
 * Motation && Action 事件类型
 */
export default {
    INCREMENT: 'INCREMENT',

    MASTER_GO_BACK_HOME: 'MASTER_GO_BACK_HOME',                                         // 返回主页
    MASTER_EXIST_PLATFORM: 'MASTER_EXIST_PLATFORM',                                     // 退出当前系统

    //#region Global
    GLOBAL_NOTIFICATION_SHOW: 'GLOBAL_NOTIFICATION_SHOW',                               // 全局提醒
    GLOBAL_SPINNING_SHOW: 'GLOBAL_SPINNING_SHOW',                                       // loading 展示
    GLOBAL_SPINNING_HIDE: 'GLOBAL_SPINNING_HIDE',                                       // loading 隐藏
    GLOBAL_UPLOAD_FILE: 'GLOBAL_UPLOAD_FILE',                                           // 文件上传
    GLOBAL_MARKETING_CONTRACT_SHORT_LIST: 'GLOBAL_MARKETING_CONTRACT_SHORT_LIST',       // 销售合同列表
    GLOBAL_DICTS_BY_TYPE_ID: 'GLOBAL_DICTS_BY_TYPE_ID',                                 // 字典列表
    GLOBAL_PRODUCT_TYPE_LIST: 'GLOBAL_PRODUCT_TYPE_LIST',                               // 产品类别
    //#endregion

    // #region 平台头部
    MASTER_HEADER_TAB_ON_CLICK: 'MASTER_HEADER_TAB_ON_CLICK',                           // 头Tab页点击事件
    CLEAR_CURRENT_HEADER_TAB_PAGE_URL: 'CLEAR_CURRENT_HEADER_TAB_PAGE_URL',             // 清理当前TAB页的垃圾数据
    // #endregion

    // #region 平台左侧菜单
    MASTER_LEFT_MENU_ITEM_ON_CLICK: 'MASTER_LEFT_MENU_ITEM_ON_CLICK',                   //  左侧菜单菜单项点击事件
    CLEAR_CURRENT_MENU_PAGE_URL: 'CLEAR_CURRENT_MENU_PAGE_URL',                         //  清理当前菜单栏的垃圾数据
    // #endregion

    // #region 登录页
    WINDOWS_ON_RESIZE: 'WINDOWS_ON_RESIZE',                                             // 窗体窗口调整事件
    LOGIN_FORM_SUBMIT: 'LOGIN_FORM_SUBMIT',                                             // 登录窗体提交
    REFRESH_VARIFICATION_CODE: 'REFRESH_VARIFICATION_CODE',                             // 更新验证码
    //#endregion

    // 库存
    //#region 现有库存
    STOCK_SUMMARY_LIST_QUERY: 'STOCK_SUMMARY_LIST_QUERY',                               // 现有库存列表
    //#endregion

    // - 库存资料

    // #region - - 计量单位
    UNIT_OF_MEASUREMENT_LIST_QUERY: 'UNIT_OF_MEASUREMENT_LIST_QUERY',                   // 计量单位列表查询
    UNIT_OF_MEASUREMENT_MODIFY: 'UNIT_OF_MEASUREMENT_MODIFY',                           // 计量单位 新增 & 编辑
    UNIT_OF_MEASUREMENT_DELETE: 'UNIT_OF_MEASUREMENT_DELETE',                           // 计量单位 删除
    //#endregion

    //#region 销售合同
    MARKETING_CONTRACT_LIST_QUERY: 'MARKETING_CONTRACT_LIST_QUERY',                     // 销售合同列表查询
    MARKETING_CONTRACT_CUSTOMER_CLASSIFICATION_LIST: 'MARKETING_CONTRACT_CUSTOMER_CLASSIFICATION_LIST',             // 客户分类列表
    MARKETING_CONTRACT_MODIFY: 'MARKETING_CONTRACT_MODIFY',                             // 销售合同 新增 & 编辑
    MARKETING_CONTRACT_DEVICE_TYPE_LIST: 'MARKETING_CONTRACT_DEVICE_TYPE_LIST',         // 设备类别列表查询 => 依据产品编号获取
    MARKETING_CONTRACT_DETAIL_CLEAR: 'MARKETING_CONTRACT_DETAIL_CLEAR',                 // 重置 销售合同详情
    MARKETING_CONTRACT_DETAIL_SALESDEVICES_ADD: 'MARKETING_CONTRACT_DETAIL_SALESDEVICES_ADD',           // 销售合同详情设备列表 新增
    MARKETING_CONTRACT_DETAIL_SALESDEVICES_REMOVE: 'MARKETING_CONTRACT_DETAIL_SALESDEVICES_REMOVE',     // 销售合同详情设备列表 移除
    MARKETING_CONTRACT_DETAIL_QUERY: 'MARKETING_CONTRACT_DETAIL_QUERY',                 // 销售合同详情
    MARKETING_CONTRACT_DELETE: 'MARKETING_CONTRACT_DELETE',                             // 销售合同 移除
    MARKETING_CONTRACT_DEVICE_TYPE_LIST_CLEAR: 'MARKETING_CONTRACT_DEVICE_TYPE_LIST_CLEAR',             // 销售合同 重置
    MARKETING_CONTRACT_INVOICE_APPLY: 'MARKETING_CONTRACT_INVOICE_APPLY',               // 销售合同 开票申请
    //#endregion

    //#region 客户分类
    CUSTOMER_CLASSIFICATION_LIST_QUERY: 'CUSTOMER_CLASSIFICATION_LIST_QUERY',             // 客户分类列表查询
    CUSTOMER_CLASSIFICATION_MODIFY: 'CUSTOMER_CLASSIFICATION_MODIFY',                     // 客户分类 新增 & 编辑
    CUSTOMER_CLASSIFICATION_DELETE: 'CUSTOMER_CLASSIFICATION_DELETE',                     // 客户分类 删除
    //#endregion

    //#region 客户列表
    CUSTOMER_LIST_QUERY: 'CUSTOMER_LIST_QUERY',                                             // 客户列表查询
    CUSTOMER_MODIFY: 'CUSTOMER_MODIFY',                                                     // 客户 新增 & 编辑
    CUSTOMER_DELETE: 'CUSTOMER_DELETE',                                                     // 客户 删除
    CUSTOMER_CLASSIFICATION_LIST: 'CUSTOMER_CLASSIFICATION_LIST',                           // 客户分类列表
    CUSTOMER_DETAIL: 'CUSTOMER_DETAIL',                                                     // 客户详情
    CUSTOMER_DETAIL_CLEAR: 'CUSTOMER_DETAIL_CLEAR',                                         // 重置 客户详情
    CUSTOMER_CATEGORY_ID_SELECT: 'CUSTOMER_CATEGORY_ID_SELECT',                             // 客户分类选择事件
    //#endregion

    //#region 运维时间
    OPERATION_AND_MAINTENANCE_TIME_LIST_QUERY: 'OPERATION_AND_MAINTENANCE_TIME_LIST_QUERY',                 // 运维时间列表查询
    OPERATION_AND_MAINTENANCE_TIME_MODIFY: 'OPERATION_AND_MAINTENANCE_TIME_MODIFY',                         // 运维时间 新增 & 编辑
    OPERATION_AND_MAINTENANCE_TIME_DELETE: 'OPERATION_AND_MAINTENANCE_TIME_DELETE',                         // 运维时间 删除
    OPERATION_AND_MAINTENANCE_TIME_DETAIL: 'OPERATION_AND_MAINTENANCE_TIME_DETAIL',                         // 运维时间详情
    OPERATION_AND_MAINTENANCE_TIME_DETAIL_CLEAR: 'OPERATION_AND_MAINTENANCE_TIME_DETAIL_CLEAR',             // 重置 运维时间详情
    OPERATION_AND_MAINTENANCE_TIME_COMBINE_FILES: 'OPERATION_AND_MAINTENANCE_TIME_COMBINE_FILES',           // 合并将要上传的文件
    OPERATION_AND_MAINTENANCE_TIME_REMOVE_FILE: 'OPERATION_AND_MAINTENANCE_TIME_REMOVE_FILE',               // 文件列表中移除文件
    OPERATION_AND_MAINTENANCE_TIME_CONTRACT_SELECT: 'OPERATION_AND_MAINTENANCE_TIME_CONTRACT_SELECT',       // 合同列表选择事件
    //#endregion

    //#region 库存报警设置
    INVENTORY_ALARM_SETTINGS_LIST_QUERY: 'INVENTORY_ALARM_SETTINGS_LIST_QUERY',                 // 库存报警设置列表查询
    INVENTORY_ALARM_SETTINGS_MODIFY: 'INVENTORY_ALARM_SETTINGS_MODIFY',                         // 库存报警设置 新增 & 编辑
    INVENTORY_ALARM_SETTINGS_DELETE: 'INVENTORY_ALARM_SETTINGS_DELETE',                         // 库存报警设置 删除
    INVENTORY_ALARM_SETTINGS_DETAIL: 'INVENTORY_ALARM_SETTINGS_DETAIL',                         // 库存报警设置 详情
    INVENTORY_ALARM_SETTINGS_DETAIL_CLEAR: 'INVENTORY_ALARM_SETTINGS_DETAIL_CLEAR',             // 库存报警设置 详情重置
    INVENTORY_ALARM_SETTINGS_PRODUCT_LIST: 'INVENTORY_ALARM_SETTINGS_PRODUCT_LIST',             // 库存报警设置 产品列表
    INVENTORY_ALARM_SETTINGS_ACCESSORIES_LIST: 'INVENTORY_ALARM_SETTINGS_ACCESSORIES_LIST',     // 库存报警设置 配件列表
    INVENTORY_ALARM_SETTINGS_WAREHOUSE_LIST: 'INVENTORY_ALARM_SETTINGS_WAREHOUSE_LIST',         // 库存报警设置 仓库列表
    INVENTORY_ALARM_SETTINGS_WARNTYPE_ONCHANGE: 'INVENTORY_ALARM_SETTINGS_WARNTYPE_ONCHANGE',   // 库存报警设置 报警类型 变更事件
    INVENTORY_ALARM_SETTINGS_TYPEID_ONCHANGE: 'INVENTORY_ALARM_SETTINGS_TYPEID_ONCHANGE',       // 库存报警设置 产品或配件 变更事件
    //#endregion

    //#region 供应渠道
    SUPPLY_CHANNEL_LIST_QUERY: 'SUPPLY_CHANNEL_LIST_QUERY',                                     // 供应商列表查询
    SUPPLY_CHANNEL_MODIFY: 'SUPPLY_CHANNEL_MODIFY',                                             // 供应商 新增 & 编辑
    SUPPLY_CHANNEL_DELETE: 'SUPPLY_CHANNEL_DELETE',                                             // 供应商 删除
    SUPPLY_CHANNEL_DETAIL: 'SUPPLY_CHANNEL_DETAIL',                                             // 供应商 详情
    SUPPLY_CHANNEL_DETAIL_CLEAR: 'SUPPLY_CHANNEL_DETAIL_CLEAR',                                 // 供应商 详情重置
    //#endregion

    //#region 产品类别
    PRODUCT_CLASSIFICATION_LIST_QUERY: 'PRODUCT_CLASSIFICATION_LIST_QUERY',                     // 产品类别 列表查询
    PRODUCT_CLASSIFICATION_MODIFY: 'PRODUCT_CLASSIFICATION_MODIFY',                             // 产品类别 新增 & 编辑
    PRODUCT_CLASSIFICATION_DELETE: 'PRODUCT_CLASSIFICATION_DELETE',                             // 产品类别 删除
    PRODUCT_CLASSIFICATION_DETAIL: 'PRODUCT_CLASSIFICATION_DETAIL',                             // 产品类别 详情
    PRODUCT_CLASSIFICATION_DETAIL_CLEAR: 'PRODUCT_CLASSIFICATION_DETAIL_CLEAR',                 // 产品类别 详情重置
    //#endregion

    //#region 产品列表
    PRODUCT_LIST_QUERY: 'PRODUCT_LIST_QUERY',                                                   // 产品 列表查询
    PRODUCT_MODIFY: 'PRODUCT_MODIFY',                                                           // 产品 新增 & 编辑
    PRODUCT_DELETE: 'PRODUCT_DELETE',                                                           // 产品 删除
    PRODUCT_DETAIL: 'PRODUCT_DETAIL',                                                           // 产品 详情
    PRODUCT_DETAIL_CLEAR: 'PRODUCT_DETAIL_CLEAR',                                               // 产品 详情重置
    PRODUCT_DETAIL_DEVICE_BOMLIST_ADD: 'PRODUCT_DETAIL_DEVICE_BOMLIST_ADD',                     // 产品详情 配件清单新增
    PRODUCT_DETAIL_DEVICE_BOMLIST_REMOVE: 'PRODUCT_DETAIL_DEVICE_BOMLIST_REMOVE',               // 产品详情 配件清单移除
    PRODUCT_PAGE_PRODUCT_CLASSIFICATION_LIST: 'PRODUCT_PAGE_PRODUCT_CLASSIFICATION_LIST',       // 产品 产品分类列表
    PRODUCT_PAGE_UNIT_OF_MEASUREMENT_LIST: 'PRODUCT_PAGE_UNIT_OF_MEASUREMENT_LIST',             // 产品 计量单位列表
    PRODUCT_PAGE_ACCESSORY_LIST: 'PRODUCT_PAGE_ACCESSORY_LIST',                                 // 产品 配件列表
    PRODUCT_PAGE_ACCESSORY_UNIT_MATCHED: 'PRODUCT_PAGE_ACCESSORY_UNIT_MATCHED',                 // 产品 配件单位获取
    PRODUCT_PAGE_SUPPLY_CHANNEL_LIST: 'PRODUCT_PAGE_SUPPLY_CHANNEL_LIST',                       // 产品 供应商列表
    //#endregion

    //#region 配件类别
    ACCESSORY_CLASSIFICATION_LIST_QUERY: 'ACCESSORY_CLASSIFICATION_LIST_QUERY',                 // 配件类别 列表查询
    ACCESSORY_CLASSIFICATION_MODIFY: 'ACCESSORY_CLASSIFICATION_MODIFY',                         // 配件类别 新增 & 编辑
    ACCESSORY_CLASSIFICATION_DELETE: 'ACCESSORY_CLASSIFICATION_DELETE',                         // 配件类别 删除
    ACCESSORY_CLASSIFICATION_DETAIL: 'ACCESSORY_CLASSIFICATION_DETAIL',                         // 配件类别 详情
    ACCESSORY_CLASSIFICATION_DETAIL_CLEAR: 'ACCESSORY_CLASSIFICATION_DETAIL_CLEAR',             // 配件类别 详情重置
    //#endregion

    //#region 配件列表
    ACCESSORY_LIST_QUERY: 'ACCESSORY_LIST_QUERY',                                                   // 配件 列表查询
    ACCESSORY_MODIFY: 'ACCESSORY_MODIFY',                                                           // 配件 新增 & 编辑
    ACCESSORY_DELETE: 'ACCESSORY_DELETE',                                                           // 配件 删除
    ACCESSORY_DETAIL: 'ACCESSORY_DETAIL',                                                           // 配件 详情
    ACCESSORY_DETAIL_CLEAR: 'ACCESSORY_DETAIL_CLEAR',                                               // 配件 详情重置
    ACCESSORY_PAGE_ACCESSORY_CLASSIFICATION_LIST: 'ACCESSORY_PAGE_ACCESSORY_CLASSIFICATION_LIST',   // 配件 配件分类列表
    ACCESSORY_PAGE_UNIT_OF_MEASUREMENT_LIST: 'ACCESSORY_PAGE_UNIT_OF_MEASUREMENT_LIST',             // 配件 计量单位列表
    ACCESSORY_PAGE_ACCESSORY_LIST: 'ACCESSORY_PAGE_ACCESSORY_LIST',                                 // 配件 配件列表
    ACCESSORY_PAGE_ACCESSORY_UNIT_MATCHED: 'ACCESSORY_PAGE_ACCESSORY_UNIT_MATCHED',                 // 配件 配件单位获取
    ACCESSORY_PAGE_SUPPLY_CHANNEL_LIST: 'ACCESSORY_PAGE_SUPPLY_CHANNEL_LIST',                       // 配件 供应商列表
    //#endregion

    // - 库存调度
    //#region 出入库清单
    STOCK_IN_AND_STOCK_OUT_WAREHOUSE_LIST: 'STOCK_IN_AND_STOCK_OUT_WAREHOUSE_LIST',
    STOCK_IN_AND_STOCK_OUT_LIST: 'STOCK_IN_AND_STOCK_OUT_LIST',
    STOCK_IN_AND_STOCK_OUT_DELETE: 'STOCK_IN_AND_STOCK_OUT_DELETE',
    STOCK_IN_AND_STOCK_OUT_DETAIL: 'STOCK_IN_AND_STOCK_OUT_DETAIL',
    STOCK_IN_AND_STOCK_OUT_DETAIL_CLEAR: 'STOCK_IN_AND_STOCK_OUT_DETAIL_CLEAR',
    STOCK_IN_AND_STOCK_OUT_PAGE_UNIT_OF_MEASUREMENT_LIST: 'STOCK_IN_AND_STOCK_OUT_PAGE_UNIT_OF_MEASUREMENT_LIST',
    STOCK_IN_AND_STOCK_OUT_PRODUCT_LIST: 'STOCK_IN_AND_STOCK_OUT_PRODUCT_LIST',                                     // 库存调度 - 产品列表
    STOCK_IN_AND_STOCK_OUT_ACCESSORY_LIST: 'STOCK_IN_AND_STOCK_OUT_ACCESSORY_LIST',                                 // 库存调度 - 配件列表

    //#endregion


};