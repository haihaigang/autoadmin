require("../scss/components/sidebar.scss");

import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router'
import BaseConfig from '../../config/BaseConfig';

var MeiSidebar = React.createClass({
    getInitialState() {
        return {
            openKeys: null
        }
    },
    handleClick(e){
        this.props.onClick(e);
    },
    getClassName(){
        return 'mei-sidebar' + (this.props.status == 0 ? ' mini' : '');
    },
    getOpenKeys(current){
        let keys = [];
        let { data } = this.props;

        for(var i in current){
            if(!isNaN(i)){
                if(i > current.level){
                    break;
                }
                if(i != '1'){
                    keys.push(data[current[i]].id.toString());
                }
                data = data[current[i]].subMenus;
            }
        }

        return keys;
    },
    getLastMenu(data, key, result, level) {
        level++;
        // console.log('start===> ' + level)
        for (var i = 0; i < data.length; i++) {
            if(result.hasFind){
                break;
            }
            if(!data[i].action){
                //忽略可能的错误数据
                continue;
            }
            // console.log('this is i ' + level + ' ' + i)
            result[level] = i;
            let url = data[i].action.replace('jump:', BaseConfig.PATH);
            if (url.toLowerCase() == key.toLowerCase() && (!data[i].subMenus || data[i].subMenus.length == 0)) {
                result.hasFind = true;
                result.leafMenu = url.toLowerCase();
                result.leafId = data[i].id.toString();
                result.level = level;
                // console.log('result ' + data[i].code + ' ' + JSON.stringify(result))
                break;
                
            }
            if (data[i].subMenus && data[i].subMenus.length > 0) {
                this.getLastMenu(data[i].subMenus, key, result, level);
            }
        }
    },
    handleOpenChange(keys){
        this.setState({openKeys: keys});
    },
    render() {
        const { data } = this.props;
        let menus = [], currentKey, openKeys;

        if(data.length != 0){
            let pathname = location.pathname;
            let result = {};

            this.getLastMenu(data, pathname, result, 0);

            if(result.hasFind){
                menus = data[result['1']].subMenus;
                currentKey = result.leafId;
                openKeys = this.getOpenKeys(result);
            }
        }

        if(this.state.openKeys){
            openKeys = this.state.openKeys;
        }

        const loop = data => data.map((item) => {
            let action = item.action.replace('jump:', BaseConfig.PATH);
            if (item.subMenus && item.subMenus.length > 0) {
                return (
                    <Menu.SubMenu key={item.id} title={item.name}>
                        {loop(item.subMenus)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={item.id}>
                    <Link to={action}>{item.name}</Link>
                </Menu.Item>
            );
        });
        const menuTreeNodes = loop(menus);

        return (
            <div className={this.getClassName()}>
                <Menu
                    onClick={this.handleClick}
                    openKeys={openKeys}
                    onOpenChange={this.handleOpenChange}
                    selectedKeys={[currentKey]}
                    mode="inline"
                    >
                    {menuTreeNodes}
                </Menu>
            </div>
        );
    }
});

export default MeiSidebar;