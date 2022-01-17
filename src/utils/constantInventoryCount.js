/**
 * 库存 - 库存盘点
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
            title: '仓库',
            width: 200,
            key: 'b',
            dataIndex: 'b',
        }, {
            title: '商品类别',
            width: 200,
            key: 'c',
            dataIndex: 'c'
        }, {
            title: '标签/产品编号',
            width: 200,
            key: 'd',
            dataIndex: 'd'
        }, {
            title: '物料名称',
            width: 200,
            key: 'e',
            dataIndex: 'e'
        }, {
            title: '计量单位',
            width: 200,
            key: 'f',
            dataIndex: 'f'
        }, {
            title: '规格型号',
            width: 200,
            key: 'g',
            dataIndex: 'g'
        }, {
            title: '盘点库存',
            width: 200,
            key: 'h',
            dataIndex: 'h'
        }, {
            title: '盘点盈亏',
            width: 200,
            key: 'i',
            dataIndex: 'i'
        }
    ]
}