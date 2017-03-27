import React from 'react'
import Tools from '../../utils/Tools'

const columns = [{
	title: '货品编号',
	dataIndex: 'bn',
    key: 'bn'
},{
	title: '货品名称',
	dataIndex: 'name',
    key: 'name',
    render(text, record){
        const data = (!text && text != 0) ? '--' : text;
        return (
                <p>
                    <span title={text}>{data}</span>
                    <br />
                    <span style={{color: '#999'}}>{record.specInfo}</span>
                </p>
            );
    }
},{
	title: '是否上架',
	dataIndex: 'marketable',
	key: 'marketable',
	render(text, record){
		return text=="0" ? '否' : '是';
	}
},{
	title: '销售价格',
	dataIndex: 'price',
	key: 'price',
	render(text, record){
		return Tools.formatCurrency(text);
	}
},{
	title: '库存',
	dataIndex: 'store',
    key: 'store',
    render(text, record){
    	return(!text && text != 0) ? '--' : text;
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
    type: 'groupgoods',
    title: '选择货品',
    isPhp: true,
    url: '/productgroup/list',
    responseKey: 'body.content',
    key: 'product_id',
    conditions: [
        { key: 'bn', type: 'text', label: '商品编号', placeholder: '请输入商品编号' },
        { key: 'name', type: 'text', label: '商品名称', placeholder: '请输入商品名称' },
        { key: 'marketable', type: 'select', label: '下架商品是否显示', placeholder: '请选择下架状态', data: [{value: '1', label: '是'},{value: '0', label: '否'}] },
    ],
    columns: columns,
}

export default options;
