/**
 * 校验报告
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
            fixed: 'left'
        }, {
            title: '产品/配件名称',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '产品、配件编号',
            width: 200,
            key: 'c',
            dataIndex: 'c'
        }, {
            title: '质检编号',
            width: 200,
            key: 'd',
            dataIndex: 'd'
        }, {
            title: '有效期',
            width: 200,
            key: 'e',
            dataIndex: 'e'
        }, {
            title: '状态',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }
    ]
}