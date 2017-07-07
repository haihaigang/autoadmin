require("../scss/components/menu.scss");

import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import Storage from '../utils/Storage'
import BaseConfig from '../../config/BaseConfig'
import BaseComponent from './BaseComponent'

/**
 * 菜单，头部、横排的
 */
class MeiMenu extends BaseComponent{
    constructor(props){
        super(props);

    }

    /**
     * 获取昵称，用于显示
     * 如果最后两位都是中文则使用最后两位显示，否则使用首字大写显示
     * @return {[type]} [description]
     */
    getName(){
        const user = Storage.get('User');
        let zhReg = /[\u4e00-\u9fa5]+/;

        if( !user || !user.name ){
            return;
        }

        let len = user.name.length;
        if( len < 1 ){
            return;
        }
            
        if( len >= 2 && zhReg.test(user.name.substr(-2)) ){
            return user.name.substr(-2);
        }else{
            return user.name.substring(0,1).toUpperCase();
        }
    }

    /**
     * 根据当前路径找到对应的菜单项
     * @param data 菜单数据
     * @param key 当前路径的关键字
     * @param result 记录查找的结果
     * @param level 当前查找所在的层级
     * @return {[type]}        [description]
     */
    getLastMenu(data, key, result, level) {
        level++;
        for (var i = 0; i < data.length; i++) {
            if(result.hasFind){
                break;
            }

            if(!data[i].url){
                //忽略可能的错误数据
                continue;
            }
            
            result[level] = i;
            let url = BaseConfig.PATH + data[i].url;
            if (url.toLowerCase() == key.toLowerCase() && (!data[i].children || data[i].children.length == 0)) {
                result.hasFind = true;
                result.leafMenu = url.toLowerCase();
                result.level = level;
                break;
            }
            if (data[i].children && data[i].children.length > 0) {
                this.getLastMenu(data[i].children, key, result, level);
            }
        }
    }

    /**
     * 获取子菜单下的第一个菜单的链接地址
     * @param data 菜单数据
     * @param i 当前菜单的序号
     * @return {[type]}      [description]
     */
    getFirstAction(data, i){
        let d = data[i];
        while(d.children && d.children.length > 0){
            d = d.children[0];
        }

        return d.url;
    }

    /**
     * 渲染
     * @return {[type]} [description]
     */
    render() {
        let data = this.props.data;
        let currentMenu;
        let pathname = location.pathname;
        let res = {}

        if(data){
            this.getLastMenu(data, pathname, res, 0);
            if(res.hasFind){
                currentMenu = data[res['1']].value.toString();
            }
        }

        return (
            <div className="mei-header">
                <div className="mei-header-title">
                    <Link to={BaseConfig.PATH || ''}><h1>后台管理系统</h1></Link>
                </div>
                <div className="mei-header-menu">
                    <Menu
                        selectedKeys={[currentMenu]}
                        mode="horizontal">
                        {data && data.map(function (item, i) {
                            let action = this.getFirstAction(data, i);
                            action = BaseConfig.PATH + action;
                            return (<Menu.Item key={item.value}><Link to={action}>{item.label}</Link></Menu.Item>);
                        }, this)}
                    </Menu>
                </div>
                <div className="mei-header-avatar">
                    <div className="mei-header-avatar-img" 
                        onClick={this.props.onAvatarClick}>{this.getName()}</div>
                </div>
            </div>
        );
    }
};

export default MeiMenu;