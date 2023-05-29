/**
 * 入库出库
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '序号',
            width: 100,
            key: 'id',
            dataIndex: 'id',
            align: 'center',
            fixed: 'left',
        }, {
            title: '产品/配件名称',
            width: 200,
            key: 'goodsname',
            dataIndex: 'goodsname',
        }, {
            title: '型号',
            width: 200,
            key: 'goodsmodel',
            dataIndex: 'goodsmodel',
        }, {
            title: '供应商',
            width: 100,
            key: 'supplier',
            dataIndex: 'supplier',
        }, {
            title: '标签',
            width: 100,
            key: 'goodsflag',
            dataIndex: 'goodsflag',
        }, {
            title: '状态',
            width: 100,
            key: 'goodstatus',
            dataIndex: 'goodstatus',
        }, {
            title: '供货签订日期',
            width: 120,
            key: 'deliverytime',
            dataIndex: 'deliverytime',
        }, {
            title: '厂家质保日期',
            width: 240,
            key: 'qualitdate',
            dataIndex: 'qualitdate',
        }, {
            title: '入库时间',
            width: 120,
            key: 'stocktime',
            dataIndex: 'stocktime',
        }, {
            title: '数量',
            width: 100,
            key: 'goodscount',
            dataIndex: 'goodscount',
        }, {
            title: '批次',
            width: 100,
            key: 'bath',
            dataIndex: 'bath',
        }, {
            title: '出/入库',
            width: 100,
            key: 'stocktype',
            dataIndex: 'stocktype',
        }
    ]
}