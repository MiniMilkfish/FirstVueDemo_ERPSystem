/**
 * 发票管理
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
            title: '开票日期',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '发票编号',
            width: 200,
            key: 'c',
            dataIndex: 'c'
        }, {
            title: '发票抬头',
            width: 200,
            key: 'd',
            dataIndex: 'd'
        }, {
            title: '开票金额',
            width: 200,
            key: 'e',
            dataIndex: 'e'
        }, {
            title: '发票类型',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }, {
            title: '税率',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }, {
            title: '开票内容',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }, {
            title: '开票状态',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }
    ]
}