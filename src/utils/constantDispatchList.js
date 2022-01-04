/**
 * 派单列表
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
            title: '人员名称',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '派单时间',
            width: 200,
            key: 'c',
            dataIndex: 'c'
        }, {
            title: '工地名称',
            width: 200,
            key: 'd',
            dataIndex: 'd'
        }, {
            title: '运维状态',
            width: 200,
            key: 'e',
            dataIndex: 'e'
        }, {
            title: '备注',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }, {
            title: '工作内容',
            width: 200,
            key: 'g',
            dataIndex: 'g'
        }
    ]
}