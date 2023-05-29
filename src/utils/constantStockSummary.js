/**
 * 库存概括
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '所属仓库',
            width: 200,
            key: 'warehousename',
            dataIndex: 'warehousename',
            align: 'center',
        }, {
            title: '产品名称',
            width: 200,
            key: 'goodsname',
            dataIndex: 'goodsname',
        }, {
            title: '设备类别',
            width: 200,
            key: 'goodstype',
            dataIndex: 'goodstype'
        }, {
            title: '数量',
            width: 200,
            key: 'stockcount',
            dataIndex: 'stockcount'
        }, {
            title: '单价',
            width: 200,
            key: 'priceamount',
            dataIndex: 'priceamount'
        }, {
            title: '金额',
            width: 200,
            key: 'goodamount',
            dataIndex: 'goodamount'
        }
    ]
}