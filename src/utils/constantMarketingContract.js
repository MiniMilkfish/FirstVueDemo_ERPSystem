/**
 * 销售合同
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
            title: '工地编号',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '合同签订方',
            width: 200,
            key: 'c',
            dataIndex: 'c'
        }, {
            title: '工地项目名称',
            width: 200,
            key: 'd',
            dataIndex: 'd'
        }, {
            title: '地址',
            width: 200,
            key: 'e',
            dataIndex: 'e'
        }, {
            title: '联系人',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }, {
            title: '签订日期',
            width: 200,
            key: 'g',
            dataIndex: 'g'
        }, {
            title: '状态',
            width: 200,
            key: 'h',
            dataIndex: 'h'
        }, {
            title: '数量',
            width: 200,
            key: 'i',
            dataIndex: 'i'
        }, {
            title: '收款',
            children: [{
                title: '应收',
                width: 200,
                key: 'j',
                dataIndex: 'j'
            }, {
                title: '未收',
                width: 200,
                key: 'k',
                dataIndex: 'k'
            }, {
                title: '日期',
                width: 200,
                key: 'l',
                dataIndex: 'l'
            }]
        }, {
            title: '质保/运维期',
            width: 200,
            key: 'm',
            dataIndex: 'm'
        }, {
            title: '续运维期',
            width: 200,
            key: 'n',
            dataIndex: 'n'
        }, {
            title: '收款',
            children: [{
                title: '结算日期',
                width: 200,
                key: 'o',
                dataIndex: 'o'
            }, {
                title: '结算金额',
                width: 200,
                key: 'p',
                dataIndex: 'p'
            }]
        },
        {
            title: '开票状态',
            width: 200,
            key: 'q',
            dataIndex: 'q'
        }, {
            title: '回访状态',
            width: 200,
            key: 'r',
            dataIndex: 'r'
        }, {
            title: '备注',
            width: 200,
            key: 's',
            dataIndex: 's'
        }
    ]
}