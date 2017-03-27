import React from 'react'
import Tools from '../../utils/Tools'

const columns = [{
    title: '货品ID',
    dataIndex: 'skuId',
    key: 'skuId'
},{
    title: '货品编号',
    dataIndex: 'barcodeNumber',
    key: 'barcodeNumber'
},{
    title: '货品名称',
    dataIndex: 'skuName',
    key: 'skuName',
    render(text, record){
        let data = (!text && text != 0) ? '--' : text;
        return (
            <p>
                <span title={text}>{data}</span>
                <br />
                <span style={{color: '#999'}}>{record.specInfo}</span>
            </p>
        );
    }
},{
    title: '计量单位',
    dataIndex: 'unit',
    key: 'unit',
    render(text, record){
        return text || '--';
    }
}, {
    title: '是否上架',
    dataIndex: 'marketable',
    key: 'marketable',
    render(text,record){
        return text ? '是' : '否';
    }
},{
    title: '现有库存',
    dataIndex: 'stock',
    key: 'stock',
    render(text, record){
        return(!text && text != 0) ? '--' : text;
    }
},{
    title: '市场价',
    dataIndex: 'marketPrice',
    key: 'marketPrice',
    render(text, record){
        return Tools.formatCurrency(text);
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
    type: 'product',
    title: '选择货品',
    isPhp: false,
    url: '/skus/search',
    responseKey: 'body',
    key: 'skuId',
    conditions: [
        { key: 'skuBn', type: 'text', label: '货品编号', placeholder: '请输入货品编号' },
        { key: 'skuName', type: 'text', label: '货品名称', placeholder: '请输入货品名称' },
    ],
    columns: columns,
    width: '80%'
}

export default options;
