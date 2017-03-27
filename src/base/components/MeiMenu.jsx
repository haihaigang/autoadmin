require("../scss/components/menu.scss");

import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom'
// import CommonReq from '../req/CommonReq'
import Storage from '../utils/Storage'
import BaseConfig from '../../config/BaseConfig'

var MeiMenu = React.createClass({
    getInitialState() {
        return {
            menus: [],
            current: null,
        };
    },
    componentDidMount() {
        let that = this;
        let pathname = location.pathname;
        let mainMenus = Storage.get('MainMenus1');

        //获取一级菜单数据
        if(mainMenus){
            this.setState({menus: mainMenus});
        }else{
            // CommonReq.getAllMenuList3(function (response) {
            //     that.setState({menus: response.body.kiwi});
            //     Storage.set('MainMenus1',response.body.kiwi);
            // });
        }
        
    },

    getMainMenus(){
        const menus = this.state.menus;

        menus.map(function(item, i){
            item.action = item.action.replace('jump:', BaseConfig.PATH);
        });

        return menus;
    },

    getFirstLetter(){
        const user = Storage.get('User');
        if(user && user.name && user.name.length > 1){
            return user.name.substring(0,1).toUpperCase();
        }
    },

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
    },

    getLastMenu(data, key, result, level) {
        level++;
        for (var i = 0; i < data.length; i++) {
            if(result.hasFind){
                break;
            }

            if(!data[i].action){
                //忽略可能的错误数据
                continue;
            }
            
            result[level] = i;
            let url = data[i].action.replace('jump:', BaseConfig.PATH);
            if (url.toLowerCase() == key.toLowerCase() && (!data[i].subMenus || data[i].subMenus.length == 0)) {
                result.hasFind = true;
                result.leafMenu = url.toLowerCase();
                result.level = level;
                break;
            }
            if (data[i].subMenus && data[i].subMenus.length > 0) {
                this.getLastMenu(data[i].subMenus, key, result, level);
            }
        }
    },

    getFirstAction(data, i){
        let d = data[i];
        while(d.subMenus.length > 0){
            d = d.subMenus[0];
        }

        return d.action;
    },

    render() {
        let data = this.state.menus;
        let currentMenu;
        let pathname = location.pathname;
        let res = {}

        if(data){
            // data = this.getMainMenus();
            this.getLastMenu(data, pathname, res, 0);
            if(res.hasFind){
                currentMenu = data[res['1']].id.toString();
            }
        }

        return (
            <div className="mei-header">
                <div className="mei-header-title">
                    <Link to="/kiwi"><h1>后台管理系统</h1></Link>
                </div>
                <div className="mei-header-menu">
                    <Menu
                        selectedKeys={[currentMenu]}
                        mode="horizontal">
                        {data && data.map(function (item, i) {
                            let action = this.getFirstAction(data, i);
                            action = action.replace('jump:', BaseConfig.PATH);
                            return (<Menu.Item key={item.id}><Link to={action}>{item.name}</Link></Menu.Item>);
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
});

export default MeiMenu;