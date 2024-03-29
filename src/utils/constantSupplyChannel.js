/**
 * 供应渠道
 */
export default {
    TABLE_SHOW_SIZE: 10,
    TABLE_SHOW_SIZE_ARRAY: ['10', '20', '50', '100'],
    TABLE_COLUMNS: [
        {
            title: '序号',
            width: 200,
            key: 'supplierid',
            dataIndex: 'supplierid',
            align: 'center',
        }, {
            title: '供应商名称',
            width: 200,
            key: 'suppliername',
            dataIndex: 'suppliername',
        // }, {
        //     title: '供货配件',
        //     width: 200,
        //     key: 'c',
        //     dataIndex: 'c',
        }, {
            title: '简写编码',
            width: 200,
            key: 'shortcode',
            dataIndex: 'shortcode',
        // }, {
        //     title: '已购数量',
        //     width: 200,
        //     key: 'e',
        //     dataIndex: 'e',
        }, {
            title: '等级',
            width: 200,
            key: 'level',
            dataIndex: 'level',
        }
    ]
}