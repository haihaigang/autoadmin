import React from 'react'
import { Icon, Popconfirm } from 'antd'
import OPERATE_TYPE from '../constants/OperateTypeConstants'
import BaseConfig from '../../config/BaseConfig'
import Tools from '../utils/Tools'

/**
 * 表头对应的展示形式关系表
 * 预先定义各种不同表头的展示形式
 * 类型包括：
 * text 普通文本类型
 * date 日期类型，处理时间戳
 * operation 操作栏，默认包含编辑、删除按钮
 *
 * Number,String,Date,Bool,Enum,Objet,Id,Image,ListSelect,TreeSelect
 */
const TYPES_TO_RENDERS = {
    enum(text, record) {
        // 约定枚举类型都从xxEnum.label获取值
        return text.label;
    },
    bool(text, record) {
        return text ? '是' : '否';
    },
    image(text, record) {
        let imgSrc = BaseConfig.HOST + '/images/get/' + text;
        
        if(!text){
            // 使用默认图片
            imgSrc = 'http://m.shtjzy.cn/content/images/logo.png';
        }

        if(text.length > 36){
            // 约定长度小于等于36为图片ID
            imgSrc = text;
        }

        return <img src={imgSrc} alt="" className="mei-list-img" />;
    },
    date(text, record){
        return Tools.formatDate(text);
    },
    object(text, record){
        if(!text){
            return '--';
        }
        return text.label;
    },
    operation(text, record) {
        return (
        	<span>
                <a 
                    href="javascript:;"
                    onClick={record.onOperateClick.bind(this,OPERATE_TYPE.EDIT)}>
                    <Icon type="edit" /></a>
                <span className="ant-divider"></span>
                <Popconfirm
                    title="您确认要删除吗？"
                    onConfirm={record.onOperateClick.bind(this,OPERATE_TYPE.REMOVE)}>
                    <a href="javascript:;"><Icon type="delete" /></a>
                </Popconfirm>
            </span>
        );
    }
}

export default TYPES_TO_RENDERS;
