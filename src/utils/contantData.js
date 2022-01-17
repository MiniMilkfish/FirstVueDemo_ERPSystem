/**
 * 全局常量
 */
export default {
    // 全局通知通知类型
    NOTIFICATION_TYPES: {
        SUCCESS: 'success',
        INFO: 'info',
        ERROR: 'error',
        WARNING: 'warning'
    },
    // 静态页列表
    PAGE_LISTS: {
        'DASHBOARD': 'vMasterDashboard',   // 首页
        // 'MARKETING_PLAN': 'marketingPlan',      // 销售计划
        'MARKETING_CONTRACT': 'vMarketingContract',    // 销售 - 销售合同
        'CUSTOMER_CLASSIFICATION': 'vCustomerClassification',   // 客户分类
        'CUSTOMER_LIST': 'vCustomerList',       // 客户列表
        'OPERATION_AND_MAINTENANCE_TIME': 'vOperationAndMaintenanceTime',     //运维时间
        'STOCK_SUMMARY': 'vStockSummary',     // 库存
        'UNIT_OF_MEASUREMENT': 'vUnitOfMeasurement', // 计量单位
        'INVENTORY_ALARM_SETTINGS': 'vInventoryAlarmSettings',    // 库存报警设置
        'SUPPLY_CHANNEL': 'vSupplyChannel', // 供应渠道
        // 'INVENTORY_SCHEDULING': 'Inventory Scheduling',     // 库存调度
        'STOCK_IN_AND_STOCK_OUT': 'vStockInAndStockOut',     // 入库出库
        'PRODUCT_MANAGEMENT': 'vProductManagement',     // 产品管理

        'PRODUCT_CLASSIFICATION': 'vProductClassification', // 产品分类
        'PRODUCT_LIST': 'vProductList',     // 产品列表
        'ACCESSORY_CLASSIFICATION': 'vAccessoryClassification',      // 配件分类
        'ACCESSORIES_LIST': 'vAccessoriesList',      // 配件列表

        'ACCESSORIES_MANAGEMENT': 'Accessories management',     // 配件管理
        'INVENTORY_COUNT': 'vInventoryCount',   // 库存盘点
        'BUSINESS_MARKETING_CONTRACT': 'vBusinessMarketingContract',     //商务 - 销售合同
        'VERIFICATION_REPORT': 'vVerificationReport',   //校验报告
        'CONTROL_OVER_INVOICES': 'vControlOverInvoices',       //发票管理
        'PRODUCTION_SCHEDULE': 'vProductionSchedule',   //生产计划表
        'DISPATCH_LIST': 'vDispatchList',       // 派单列表
        'PERSONNEL_LIST': 'vPersonnelList',     // 人员列表
        'BUILDING_SITE_LIST': 'vBuildingSiteList',     // 工地列表
    }
}