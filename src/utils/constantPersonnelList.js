/**
 *  人员列表
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '工号',
            width: 200,
            key: 'a',
            dataIndex: 'a',
            align: 'center',
            fixed: 'left'
        }, {
            title: '姓名',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '联系电话',
            width: 200,
            key: 'c',
            dataIndex: 'c'
        }, {
            title: '入职时间',
            width: 200,
            key: 'd',
            dataIndex: 'd'
        }
    ]
}