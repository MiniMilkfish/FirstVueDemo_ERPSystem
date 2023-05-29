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
            key: 'id',
            dataIndex: 'id',
            align: 'center',
        }, {
            title: '产品/配件',
            width: 200,
            key: 'typename',
            dataIndex: 'typename',
        }, {
            title: '型号',
            width: 200,
            key: 'typemodel',
            dataIndex: 'typemodel',
        }, {
            title: '报警限值',
            width: 200,
            key: 'warnvalue',
            dataIndex: 'warnvalue',
        }
    ]
}