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

        'ACCESSORIES_MANAGEMENT': 'Accessories management',     // 配件管理
        'ACCESSORY_CLASSIFICATION': 'vAccessoryClassification',      // 配件分类
        'ACCESSORIES_LIST': 'vAccessoriesList',      // 配件列表


        'INVENTORY_COUNT': 'vInventoryCount',   // 库存盘点
        'BUSINESS_MARKETING_CONTRACT': 'vBusinessMarketingContract',     //商务 - 销售合同
        'VERIFICATION_REPORT': 'vVerificationReport',   //校验报告
        'CONTROL_OVER_INVOICES': 'vControlOverInvoices',       //发票管理
        'PRODUCTION_SCHEDULE': 'vProductionSchedule',   //生产计划表
        'DISPATCH_LIST': 'vDispatchList',       // 派单列表
        'PERSONNEL_LIST': 'vPersonnelList',     // 人员列表
        'BUILDING_SITE_LIST': 'vBuildingSiteList',     // 工地列表
    },
    // 消息状态
    MESSAGE_STATUS: [
        {
            key: 0,
            label: '未读'
        },
        {
            key: 1,
            label: '已读'
        }
    ],
    // 配件类型
    SPAREPART_TYPE: [
        {
            key: 0,
            label: '普通配件'
        },
        {
            key: 1,
            label: '定制加工件'
        }
    ],
    // 产品标识
    PRODUCT_FLAG: [
        {
            key: "0",
            label: '成品'
        },
        {
            key: "1",
            label: '半成品'
        }
    ],
    // 配件标识
    SPAREPART_FLAG: [
        {
            key: "0",
            label: '普通配件'
        },
        {
            key: "1",
            label: '核心配件'
        }
    ],
    // 出入库类型
    STOCK_TYPE: [
        {
            key: 1,
            label: '入库'
        },
        {
            key: 2,
            label: '出库'
        }
    ],
    // 货物类型
    GOODS_TYPE: [
        {
            key: 1,
            label: '产品'
        },
        {
            key: 2,
            label: '配件'
        }
    ],
    // 报警类型
    WARN_TYPE: [
        {
            key: "1",
            label: '产品'
        },
        {
            key: "2",
            label: '配件'
        }
    ],
    // 生产计划类型
    PRODUCE_PLAN_TYPE: [
        {
            key: 1,
            label: '合同项目'
        },
        {
            key: 2,
            label: '日常生产'
        }
    ],
    // 生产计划状态
    PRODUCE_PLAN_STATUS: [
        {
            key: 1,
            label: '可执行'
        },
        {
            key: 2,
            label: '待确认'
        }
    ],
    // 设备销售方式
    DEVICES_SALES_TYPE: [
        {
            key: "1",
            label: '租赁'
        },
        {
            key: "2",
            label: '购买'
        }
    ],
    // 销售合同开票状态
    MARKETING_CONTRACT_BILLING_STATUS: [
        {
            key: 1,
            label: '已开票'
        },
        {
            key: 2,
            label: '未开票'
        },
        {
            key: 3,
            label: '开票中'
        }
    ],
    // 发票开票状态
    INVOICE_STATUS: [
        {
            key: "1",
            label: '已开票'
        },
        {
            key: "2",
            label: '未开票'
        },
        {
            key: "3",
            label: '退票'
        }
    ],
    // 销售合同状态
    MARKETING_CONTRACT_STATUS: [
        {
            key: "1",
            label: '已签'
        },
        {
            key: "2",
            label: '未签'
        }
    ],
    // 销售合同回访状态
    MARKETING_CONTRACT_RETURN_STATUS: [
        {
            key: "1",
            label: '已回访'
        },
        {
            key: "2",
            label: '待回访'
        }
    ],
    // 质检报告状态
    DEVICE_QUALIT_STATUS: [
        {
            key: 1,
            label: '申请中'
        },
        {
            key: 2,
            label: '已申请'
        },
        {
            key: 3,
            label: '退票'
        }
    ],
    // 字典类型列表
    DICT_TYPE_ID_LIST: {
        DEVICE_QUALIT_TYPE: {
            key: 1,
            label: '质检报告类型'
        },
        MARKETING_CONTRACT_BILLING_STATUS: {
            key: 2,
            label: '销售合同开票状态'
        },
        MARKETING_CONTRACT_RETURN_STATUS: {
            key: 3,
            label: '回访状态'
        },
        PRODUCT_STATUS: {
            key: 31,
            label: '产品状态'
        },
        SPAREPART_STATUS: {
            key: 32,
            label: '配件状态'
        },
        OPERATION_AND_MAINTENANCE_STATUS: {
            key: 51,
            label: '运维状态'
        },
        OPERATION_AND_MAINTENANCE_WORK_CONTENT: {
            key: 52,
            label: '运维工作内容'
        },
        MARKETING_CONTRACT_STATUS: {
            key: 53,
            label: '销售合同状态'
        },
        INVOICE_STATUS: {
            key: 54,
            label: '发票开票状态'
        },
        DEVICE_LEVEL: {
            key: 55,
            label: '设备等级'
        }
    }
}