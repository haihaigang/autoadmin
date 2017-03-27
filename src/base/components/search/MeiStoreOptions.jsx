import React from 'react'
import { Tooltip, Icon } from 'antd'
import Tools from '../../utils/Tools'

const columns = [{
    title: '店铺ID',
    dataIndex: 'id',
    key: 'id'
}, {
    title: '店铺名称',
    dataIndex: 'name',
    key: 'name'
}, {
    title: '店铺图标',
    dataIndex: 'image_url',
    key: 'image_url',
    render(text, record) {
        return <img src={text} style={{maxHeight: '20px'}} />
    }
}, {
    title: <Tooltip title="包邮策略／满／减"><span>优惠策略<Icon type="question" /></span></Tooltip>,
    dataIndex: 'free_ship_money',
    key: 'free_ship_money',
    render(text, record) {
        let typeTxt = '--';
        let type = record.free_ship_type;
        let money = Tools.formatCurrency(record.free_ship_money);
        let amount = Tools.formatCurrency(record.free_ship_amount);

        // 0不包 1减免 2包邮
        switch (type) {
            case 0:
                {
                    typeTxt = '不包';
                    break;
                }
            case 1:
                {
                    typeTxt = '减免';
                    break;
                }
            case 2:
                {
                    typeTxt = '包邮';
                    break;
                }
        }
        return typeTxt + '／' + amount + '／' + money;
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
    type: 'store',
	title: '选择店铺',
    isPhp: true,
    url: '/shopinfo/index',
    responseKey: 'body.content',
    key: 'id',
    conditions: [
        { key: 'id', type: 'text', label: '店铺ID', placeholder: '请输入店铺ID' },
        { key: 'name', type: 'text', label: '店铺名称', placeholder: '请输入店铺名称' }
    ],
    columns: columns
}

export default options;
