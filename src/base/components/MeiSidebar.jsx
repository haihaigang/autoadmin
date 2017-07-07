require("../scss/components/sidebar.scss");

import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import BaseConfig from '../../config/BaseConfig';
import BaseComponent from './BaseComponent'

/**
 * 侧边栏组件
 */
class MeiSidebar extends BaseComponent{
    constructor(props){
        super(props);

        this.state = {
            openKeys: null
        }
    }

    handleClick(e){
        this.props.onClick(e);
    }
    getClassName(){
        return 'mei-sidebar' + (this.props.status == 0 ? ' mini' : '');
    }
    getOpenKeys(current){
        let keys = [];
        let { data } = this.props;

        for(var i in current){
            if(!isNaN(i)){
                if(i > current.level){
                    break;
                }
                if(i != '1'){
                    keys.push(data[current[i]].value);
                }
                data = data[current[i]].children;
            }
        }

        return keys;
    }
    getLastMenu(data, key, result, level) {
        level++;
        // console.log('start===> ' + level)
        for (var i = 0; i < data.length; i++) {
            if(result.hasFind){
                break;
            }
            if(!data[i].url){
                //忽略可能的错误数据
                // continue;
            }
            result[level] = i;
            let url = BaseConfig.PATH + data[i].url;
            // console.log('this is i ' + level + ' ' + i + url)
            if (url.toLowerCase() == key.toLowerCase() && (!data[i].children || data[i].children.length == 0)) {
                result.hasFind = true;
                result.leafMenu = url.toLowerCase();
                result.leafId = data[i].value.toString();
                result.level = level;
                // console.log('result ' + data[i].value + ' ' + JSON.stringify(result))
                break;
            }
            if (data[i].children && data[i].children.length > 0) {
                this.getLastMenu(data[i].children, key, result, level);
            }
        }
    }
    handleOpenChange(keys){
        this.setState({openKeys: keys});
    }
    render() {
        const { data } = this.props;
        let menus = [], currentKey, openKeys;

        if(data.length != 0){
            let pathname = location.pathname;
            let result = {};

            this.getLastMenu(data, pathname, result, 0);

            if(result.hasFind){
                menus = data[result['1']].children;
                currentKey = result.leafId;
                openKeys = this.getOpenKeys(result);
            }
        }

        if(this.state.openKeys){
            openKeys = this.state.openKeys;
        }

        const loop = data => data.map((item) => {
            let action = BaseConfig.PATH + item.url;
            if (item.children && item.children.length > 0) {
                return (
                    <Menu.SubMenu key={item.value} title={item.label}>
                        {loop(item.children)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={item.value}>
                    <Link to={action}>{item.label}</Link>
                </Menu.Item>
            );
        });
        const menuTreeNodes = loop(menus);

        return (
            <div className={this.getClassName()}>
                <Menu
                    onClick={this.handleClick.bind(this)}
                    openKeys={openKeys}
                    onOpenChange={this.handleOpenChange.bind(this)}
                    selectedKeys={[currentKey]}
                    mode="inline"
                    >
                    {menuTreeNodes}
                </Menu>
            </div>
        );
    }
};

export default MeiSidebar;