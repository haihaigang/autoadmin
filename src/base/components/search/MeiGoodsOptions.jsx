import Tools from '../../utils/Tools'

const columns = [{
    title: '商品编号',
    dataIndex: 'bn',
    key: 'bn'
}, {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    render(text, record) {
        return '[' + record.goods_id + ']' + record.name;
    }
}, {
    title: '现有库存',
    dataIndex: 'store',
    key: 'store',
    render(text, record) {
        return (!text && text != 0) ? '--' : text;
    }
}, {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    render(text, record) {
        return Tools.formatCurrency(text) + '／' + Tools.formatCurrency(record.mktprice);;
    }
}, {
    title: '上/下架',
    dataIndex: 'marketable',
    key: 'marketable',
    render(text, record) {
        return text ? '上架' : '下架';
    }
}];

/**
 * 配置项
 * type 类型
 * title 显示的标题
 * isPhp 是否php的接口
 * url 接口的地址
 * responseKey 响应参数的key
 * key 响应数据的主键key
 * conditions 搜索条件
 * columns 列表数据的表头
 * isMultiple 列表数据是单选还是多选
 */
const options = {
    type: 'goods',
    title: '选择商品',
    isPhp: true,
    url: '/goods/index',
    responseKey: 'body.content',
    key: 'goods_id',
    conditions: [
        { key: 'goods_id', type: 'text', label: '商品ID', placeholder: '请输入商品ID' },
        { key: 'bn', type: 'text', label: '商品编号', placeholder: '请输入商品编号' },
        { key: 'name', type: 'text', label: '商品名称', placeholder: '请输入商品名称' }
    ],
    columns: columns
}

export default options;
