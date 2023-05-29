/**
 * 配件列表
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
            title: '配件名称',
            width: 200,
            key: 'sparepartname',
            dataIndex: 'sparepartname',
        }, {
            title: '分类',
            width: 200,
            key: 'spareparttype',
            dataIndex: 'spareparttype',
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