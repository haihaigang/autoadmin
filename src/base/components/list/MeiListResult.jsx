require("../../../base/scss/components/search-product.scss");

import React from 'react'
import { Table, Icon, Popconfirm } from 'antd'

/**
 * # 管理后台表单列表组件说明

	## 用途
	在表单中展示一个列表，用于展示一个关联的列表数据（eg:商品、用户）

	## 功能
	1. 只展示一个列表
	2. 可删除
	3. 可排序（可选功能）
	4. 有数据就显示列表，没有则不显示列表

	## 属性
	1. dataSource，展示的数据源
	2. onChange，数据变更之后通知回调
	3. columns，数据列表的头
	4. hideOperate，是否隐藏操作栏
 */
var App = React.createClass({
	/**
	 * 默认的操作栏，只包含一个删除按钮
	 * @type {Object}
	 */
	defaultOptColumn: {
	    title: '操作',
	    key: 'operation',
	    render(text, record){
	    	return(
	    		<Popconfirm title="您确认要移除该数据吗？" onConfirm={record.remove}>
	    			<a href="javascript:;"><Icon type="delete" /></a>
	    		</Popconfirm>
	    	)
	    }
	},

	/**
	 * 在渲染前处理数据，追加key和一些需要的事件
	 */
	processData(data){
		if(!data) return [];
		data.map((item, i) => {
			item.key = i;
			item.remove = () => {this.remove(i);};
		});

		return data;
	},

	/**
     * 处理列表的头，
     */
    processColumn(columns) {
    	if(!columns){
    		return [];
    	}

        var hasOpt = false;
        columns.forEach(function(d) {
            if (d.key == 'operation') {
                hasOpt = true;
            }
        });

        //若传递的列数据中不包含编辑栏则添加默认的操作栏
        if (!hasOpt) {
            columns.push(this.defaultOptColumn);
        }

        return columns;
    },

    /**
     * 删除，移除当前删除项，剩余的数据通知出去
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
	remove(key){
		if(typeof this.props.onChange != 'function'){
			return;
		}

		let dataSource = this.props.dataSource;
		dataSource = dataSource.filter((item, i) => i != key);
		this.props.onChange(dataSource);
	},

	render(){
		let { columns, hideOperate, dataSource } = this.props;

		columns = this.processColumn(columns);
		dataSource = this.processData(dataSource);
		
		if(hideOperate){
			// 不显示操作栏
			columns = columns.filter(item => item.key != 'operation');
		}

		return(
			<div >
				<Table 
					style={{display: dataSource && dataSource.length > 0 ? '' : 'none'}}
			        columns={columns} 
			        dataSource={dataSource} 
			        pagination={false}/>
		    </div>
		);
	}
});

export default App;