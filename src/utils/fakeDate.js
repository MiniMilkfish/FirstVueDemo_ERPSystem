/**
 * 测试假数据集
 */
import CONSTANT_DATA from './constantData';
const pageList = CONSTANT_DATA.PAGE_LISTS;

export default {
    // 路由列表，包含功能页 (.vue 地址)
    routeList: [
        {
            title: "首页",
            url: pageList.DASHBOARD,
            id: 1,
            pid: 0,
            sub: []
        },
        {
            title: "销售",
            id: 2,
            pid: 0,
            url: '',
            sub: [
                {
                    title: "销售计划",
                    url: '',
                    id: 3,
                    pid: 2,
                    sub: [
                        {
                            title: "销售合同",
                            url: pageList.MARKETING_CONTRACT,
                            id: 4,
                            pid: 3,
                            sub: []
                        }
                    ]
                },
                {
                    title: "客户管理",
                    url: '',
                    id: 5,
                    pid: 2,
                    sub: [
                        {
                            title: "客户分类",
                            url: pageList.CUSTOMER_CLASSIFICATION,
                            id: 6,
                            pid: 5,
                            sub: []
                        },
                        {
                            title: "客户列表",
                            url: pageList.CUSTOMER_LIST,
                            id: 7,
                            pid: 5,
                            sub: []
                        }
                    ]
                },
                {
                    title: "运维协同",
                    url: '',
                    id: 8,
                    pid: 2,
                    sub: [
                        {
                            title: "运维时间",
                            url: pageList.OPERATION_AND_MAINTENANCE_TIME,
                            id: 9,
                            pid: 0,
                            sub: []
                        }
                    ]
                }
            ]
        },
        {
            title: "库存",
            url: pageList.STOCK_SUMMARY,
            id: 10,
            pid: 0,
            sub: [
                {
                    title: "库存资料",
                    url: '',
                    id: 11,
                    pid: 10,
                    sub: [
                        {
                            title: "计量单位",
                            url: pageList.UNIT_OF_MEASUREMENT,
                            id: 12,
                            pid: 11,
                            sub: []
                        },
                        {
                            title: "库存报警设置",
                            url: pageList.INVENTORY_ALARM_SETTINGS,
                            id: 13,
                            pid: 11,
                            sub: []
                        },
                        {
                            title: "供应渠道",
                            url: pageList.SUPPLY_CHANNEL,
                            id: 14,
                            pid: 11,
                            sub: []
                        }
                    ]
                },
                {
                    title: "库存调度",
                    url: '',
                    id: 15,
                    pid: 10,
                    sub: [
                        {
                            title: "入库出库",
                            url: pageList.STOCK_IN_AND_STOCK_OUT,
                            id: 16,
                            pid: 15,
                            sub: []
                        },
                        {
                            title: "产品管理",
                            url: '',
                            id: 17,
                            pid: 15,
                            sub: [
                                {
                                    title: "产品分类",
                                    url: pageList.PRODUCT_CLASSIFICATION,
                                    id: 171,
                                    pid: 17,
                                    sub: []
                                },
                                {
                                    title: "产品列表",
                                    url: pageList.PRODUCT_LIST,
                                    id: 172,
                                    pid: 17,
                                    sub: []
                                }
                            ]
                        },
                        {
                            title: "配件管理",
                            url: '',
                            id: 18,
                            pid: 15,
                            sub: [
                                {
                                    title: "配件分类",
                                    url: pageList.ACCESSORY_CLASSIFICATION,
                                    id: 181,
                                    pid: 18,
                                    sub: []
                                },
                                {
                                    title: "配件列表",
                                    url: pageList.ACCESSORIES_LIST,
                                    id: 182,
                                    pid: 18,
                                    sub: []
                                }
                            ]
                        },
                        {
                            title: "库存盘点",
                            url: pageList.INVENTORY_COUNT,
                            id: 19,
                            pid: 15,
                            sub: []
                        }
                    ]
                }
            ]
        },
        {
            title: "商务",
            url: '',
            id: 20,
            pid: 0,
            sub: [
                {
                    title: "合同管理",
                    url: '',
                    id: 21,
                    pid: 20,
                    sub: [
                        {
                            title: "销售合同",
                            url: pageList.BUSINESS_MARKETING_CONTRACT,
                            id: 22,
                            pid: 21,
                            sub: []
                        },
                        {
                            title: "校验报告",
                            url: pageList.VERIFICATION_REPORT,
                            id: 23,
                            pid: 21,
                            sub: [
                            ]
                        },
                        {
                            title: "发票管理",
                            url: pageList.CONTROL_OVER_INVOICES,
                            id: 24,
                            pid: 21,
                            sub: [
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: "生产",
            url: '',
            id: 25,
            pid: 0,
            sub: [
                {
                    title: "生产计划",
                    url: '',
                    id: 26,
                    pid: 25,
                    sub: [
                        {
                            title: "生产计划表",
                            url: pageList.PRODUCTION_SCHEDULE,
                            id: 27,
                            pid: 26,
                            sub: []
                        }
                    ]
                }
            ]
        },
        {
            title: "运维",
            url: '',
            id: 28,
            pid: 0,
            sub: [
                {
                    title: "基础运维",
                    url: '',
                    id: 29,
                    pid: 28,
                    sub: [
                        {
                            title: "派单列表",
                            url: pageList.DISPATCH_LIST,
                            id: 30,
                            pid: 29,
                            sub: []
                        },
                        {
                            title: "人员列表",
                            url: pageList.PERSONNEL_LIST,
                            id: 31,
                            pid: 29,
                            sub: []
                        },
                        {
                            title: "工地列表",
                            url: pageList.BUILDING_SITE_LIST,
                            id: 32,
                            pid: 29,
                            sub: []
                        }
                    ]
                }
            ]
        },
        {
            title: "系统管理",
            url: '',
            id: 33,
            pid: 0,
            sub: [
            ]
        }
    ]
}