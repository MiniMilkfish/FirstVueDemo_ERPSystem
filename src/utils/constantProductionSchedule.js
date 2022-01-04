/**
 * 生产计划表
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
            title: '项目名称',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '产品名称',
            width: 200,
            key: 'c',
            dataIndex: 'c'
        }, {
            title: '产品型号',
            width: 200,
            key: 'd',
            dataIndex: 'd'
        }, {
            title: '数量（套）',
            width: 200,
            key: 'e',
            dataIndex: 'e'
        }, {
            title: '排期',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }
    ]
}