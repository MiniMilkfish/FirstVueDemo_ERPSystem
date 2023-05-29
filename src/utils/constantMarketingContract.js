/**
 * 销售合同
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '序号',
            width: 100,
            key: 'id',
            dataIndex: 'id',
            align: 'center',
            fixed: 'left'
        }, {
            title: '工地编号',
            width: 300,
            key: 'contractcode',
            dataIndex: 'contractcode',
        }, {
            title: '合同签订方',
            width: 200,
            key: 'contractparty',
            dataIndex: 'contractparty'
        }, {
            title: '工地项目名称',
            width: 200,
            key: 'projectname',
            dataIndex: 'projectname'
        }, {
            title: '地址',
            width: 200,
            key: 'projectaddress',
            dataIndex: 'projectaddress'
        }, {
            title: '联系人',
            width: 200,
            key: 'projectlinkman',
            dataIndex: 'projectlinkman'
        }, {
            title: '签订日期',
            width: 200,
            key: 'contractdate',
            dataIndex: 'contractdate'
        }, {
            title: '状态',
            width: 200,
            key: 'contractstatus',
            dataIndex: 'contractstatus'
        }, {
            title: '数量',
            width: 200,
            key: 'devicecount',
            dataIndex: 'devicecount'
        }, {
            title: '收款',
            children: [{
                title: '应收',
                width: 200,
                key: 'contractamount',
                dataIndex: 'contractamount'
            }, {
                title: '未收',
                width: 200,
                key: 'outpayment',
                dataIndex: 'outpayment'
            }, {
                title: '日期',
                width: 200,
                key: 'paymentdate',
                dataIndex: 'paymentdate'
            }]
        }, {
            title: '质保/运维期',
            width: 240,
            key: 'operadate',
            dataIndex: 'operadate'
        }, {
            title: '续运维期',
            width: 240,
            key: 'continueoperadate',
            dataIndex: 'continueoperadate'
        }, {
            title: '代理商',
            children: [{
                title: '结算日期',
                width: 200,
                key: 'settlementdate',
                dataIndex: 'settlementdate'
            }, {
                title: '结算金额',
                width: 200,
                key: 'settlementamount',
                dataIndex: 'settlementamount'
            }]
        },
        {
            title: '开票状态',
            width: 200,
            key: 'billingstatus',
            dataIndex: 'billingstatus'
        }, {
            title: '回访状态',
            width: 200,
            key: 'returnstatus',
            dataIndex: 'returnstatus'
        }, {
            title: '备注',
            width: 200,
            key: 'remark',
            dataIndex: 'remark'
        }
    ]
}