/**
 * 产品列表
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '序号',
            width: 200,
            key: 'id',
            dataIndex: 'id',
            align: 'center',
        }, {
            title: '产品名称',
            width: 200,
            key: 'devicename',
            dataIndex: 'devicename',
        }, {
            title: '产品类别',
            width: 200,
            key: 'devicetype',
            dataIndex: 'devicetype',
        }, {
            title: '规格型号',
            width: 200,
            key: 'devicemodel',
            dataIndex: 'devicemodel',
        }, {
            title: '单位',
            width: 200,
            key: 'unit',
            dataIndex: 'unit',
        }, {
            title: '备注',
            width: 200,
            key: 'remark',
            dataIndex: 'remark',
        }
    ]
}