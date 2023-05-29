/**
 * 运维时间
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '序号',
            width: 80,
            key: 'id',
            dataIndex: 'id',
            align: 'center',
            fixed: 'left'
        }, {
            title: '项目名称',
            width: 200,
            key: 'projectname',
            dataIndex: 'projectname',
        }, {
            title: '和客户沟通的安装时间',
            width: 300,
            key: 'installdate',
            align: 'center',
            dataIndex: 'installdate'
        }, {
            title: '计划现场勘察时间',
            width: 300,
            key: 'plansurverydate',
            align: 'center',
            dataIndex: 'plansurverydate'
        }, {
            title: '实际现场勘察时间',
            width: 300,
            key: 'onsitesurverydate',
            align: 'center',
            dataIndex: 'onsitesurverydate'
        }, {
            title: '实际现场勘察情况',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }, {
            title: '备注',
            width: 200,
            key: 'remark',
            dataIndex: 'remark'
        }
    ]
}