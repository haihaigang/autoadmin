
import React from 'react';
import BaseApp from './BaseApp'
import MeiMenu from '../components/MeiMenu'
import Storage from '../utils/Storage'
import UEditor from '../components/MeiEditor'

class HomeApp extends BaseApp {
	constructor(props) {
		super(props);
		
		// 默认首页的菜单数据使用固定的，如需更改直接替换
		this.state = {
			menuData: [{"label":"系统管理","value":"1","leaf":false,"parentId":"0","url":"/ruddermenu/list","selected":false,"level":4,"children":[{"label":"菜单管理","value":"2","leaf":true,"parentId":"1","url":"/ruddermenu/list","selected":false,"level":2,"children":[]},{"label":"权限管理","value":"3","leaf":false,"parentId":"1","url":"/rudderuser/list","selected":false,"level":4,"children":[{"label":"角色管理","value":"5","leaf":true,"parentId":"3","url":"/rudderrole/list","selected":false,"level":3,"children":[]},{"label":"资源管理","value":"6","leaf":true,"parentId":"3","url":"/rudderpermission/list","selected":false,"level":2,"children":[]},{"label":"用户管理","value":"4","leaf":true,"parentId":"3","url":"/rudderuser/list","selected":false,"level":0,"children":[]}]},{"label":"日志管理","value":"7","leaf":true,"parentId":"1","url":"/rudderlogger/list","selected":false,"level":0,"children":[]}]},{"label":"类别管理","value":"10","leaf":false,"parentId":"0","url":"/wallpapercategory/list","selected":false,"level":2,"children":[{"label":"类别管理","value":"12","leaf":true,"parentId":"10","url":"/wallpapercategory/list","selected":false,"level":0,"children":[]}]},{"label":"壁纸管理","value":"11","leaf":false,"parentId":"0","url":"/wallpapercontent/list","selected":false,"level":2,"children":[{"label":"壁纸管理","value":"13","leaf":true,"parentId":"11","url":"/wallpapercontent/list","selected":false,"level":0,"children":[]}]}]
		}
	}

	componentDidMount(){
		// 如果本地存在菜单，则使用本地的菜单
		let menuData = Storage.get('MainMenus1');
		if(menuData && menuData.length > 0){
			this.setState({menuData: menuData});
		}
	}

	render(){
		return(
			<div className="home">
				<MeiMenu
					data={this.state.menuData}/>
				<div className="home-content">
	    			<h1>DASHBOARD</h1>
	    			<UEditor id="content" height="200"/> 
				</div>
  			</div>
  		);
	}
}

export default HomeApp;