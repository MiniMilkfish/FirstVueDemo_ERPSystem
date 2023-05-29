/**
 * 客户列表
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
            align: 'center'
        }, {
            title: '客户名称',
            width: 200,
            key: 'customname',
            dataIndex: 'customname',
        },
        {
            title: '客户分类',
            width: 200,
            key: 'categoryname',
            dataIndex: 'categoryname',
        },
        {
            title: '客户分级',
            width: 200,
            key: 'customlevel',
            dataIndex: 'customlevel',
        },
        {
            title: '联系人',
            width: 200,
            key: 'linkman',
            dataIndex: 'linkman',
        },
        {
            title: '联系电话',
            width: 200,
            key: 'linkmanphone',
            dataIndex: 'linkmanphone',
        }
    ]
}