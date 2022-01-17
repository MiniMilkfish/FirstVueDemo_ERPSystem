/**
 * 库存报警设置
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '序号',
            width: 200,
            key: 'a',
            dataIndex: 'a',
            align: 'center',
        }, {
            title: '产品/配件',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '型号',
            width: 200,
            key: 'c',
            dataIndex: 'c',
        }, {
            title: '报警限值',
            width: 200,
            key: 'd',
            dataIndex: 'd',
        }
    ]
}