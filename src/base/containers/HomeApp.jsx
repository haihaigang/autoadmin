import '../scss/home.scss'
import React from 'react'
import BaseApp from './BaseApp'
import MeiMenu from '../components/MeiMenu'

class HomeApp extends BaseApp {
	constructor(props) {
		super(props);
		
		// 默认首页的菜单数据使用固定的，如需更改直接替换
		this.state = {
			menuData: [{ "label": "系统管理", "leaf": false, "level": 5, "parentId": "0", "selected": false, "url": "/ruddermenu/list", "value": "1" }, { "label": "商品管理", "leaf": true, "level": 1, "parentId": "0", "selected": false, "url": "/tjzyproduct/list", "value": "10" }, { "label": "订单管理", "leaf": true, "level": 1, "parentId": "0", "selected": false, "url": "/tjzyorder/list", "value": "11" }, { "label": "提货管理", "leaf": true, "level": 1, "parentId": "0", "selected": false, "url": "/tjzypickup/list", "value": "12" }, { "label": "会员管理", "leaf": false, "level": 6, "parentId": "0", "selected": false, "url": "/tjzymember/list", "value": "13" }, { "label": "财务管理", "leaf": false, "level": 2, "parentId": "0", "selected": false, "url": "/tjzymemberwithdrawal/list", "value": "19" }]
		}
	}
	render(){
		return(
			<div className="home">
				<MeiMenu
					data={this.state.menuData}/>
				<div className="home-content">
	    			<h1>DASHBOARD</h1>
				</div>
  			</div>
  		);
	}
}

export default HomeApp;