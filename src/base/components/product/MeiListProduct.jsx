require("../../scss/components/search-product.scss");

import React from 'react'
import { Table, Icon, Popconfirm } from 'antd'
import Tools from '../../utils/Tools'
import MeiListDetail from './MeiListDetail'
import MeiDraggableMixin from '../../mixins/MeiDraggableMixin'

let columns = [{
	title: '货品ID',
	dataIndex: 'skuId',
    key: 'skuId',
    render(text, record){
    	let tabChangeFlag = record.changeFlag==true?'change-flag':'';
    	return (<span className={tabChangeFlag}>{text}</span>)
    }
},{
	title: '商品ID',
	dataIndex: 'goodsId',
	key: 'goodsId',
	render(text, record){
		return text || '--'
	}
},{
	title: '货品编号',
	dataIndex: 'barcodeNumber',
	key: 'barcodeNumber',
	render(text, record){
		return text || '--'
	}
}, {
	title: '排序',
	dataIndex: 'sortNum',
	key: 'sortNum',
	render(text,record){
    	return(!text && text != 0) ? '--' : text;
    }
}, {
	title: '货品名称',
	dataIndex: 'skuName',
	key: 'skuName',
	render(text, record){
        const data = (!text && text != 0) ? '--' : text;
        return (
				<p>
					<span title={text}>{data}</span>
					<br />
					<span style={{color: '#999'}}>{record.specInfo}</span>
				</p>
        	);
	}
}, {
	title: '是否显示',
	dataIndex: 'marketable',
	key: 'marketable',
	render(text,record){
		const data = text && record.enabled ? '是' : '否';
		const isNot = !text && !record.enabled ? {'color': '#ff3300'} : {};
    	return (<span style={isNot}>{data}</span>);
    }
}, {
	title: '库存',
	dataIndex: 'activityStock',
	key: 'activityStock',
	render(text,record){
		const isNotActivityStock = record.activityStock == 0 ? {'color': '#ff3300'} : {};
		const isNotStock = record.stock == 0 ? {'color': '#ff3300'} : {};
    	return (
    		<p>
    			<span style={isNotActivityStock}>{record.activityStock}</span> 
    			/
    			<span style={isNotStock}>{record.stock}</span>
    		</p>);
    }
}, {
	title: '组团价',
	dataIndex: 'groupPrice',
	key: 'groupPrice',
	render(text,record){
    	return Tools.formatCurrency(text);
    }
}, {
    title: '操作',
    key: 'operation',
    render(text, record, i){
    	let editButton;

    	if(record.pintuanType == 2){
    		editButton = <a onClick={record.editGoods}><Icon id={"sku" + i} type="edit" /></a>
    	}else{
    		//editButton = <a href="javascript:;"><Icon id={"sku" + i} type="bars" draggable={true} onDragStart={record.drag} onDragEnter={record.dragenter} onDragLeave={record.dragleave}/></a>
    	}

    	return(
    		<div>
    		<Popconfirm title="您确认要移除该数据吗？" onConfirm={record.remove}>
    			<a href="javascript:;"><Icon type="delete" /></a>
    		</Popconfirm>
    		<span className="ant-divider"></span>
    		{editButton}
    		</div>
    	)
    }
}];

var App = React.createClass({
	mixins: [MeiDraggableMixin],
	/**
	 * 在渲染前处理数据，数据来源有两种格式分别是搜索的结果和编辑的值
	 */
	processData(data){
		if(!data) return [];
		var that = this;
		data.map(function(item, i){
			if(item.id){
			}else{
				if(!item.limitMax){
					item.limitMax = 1;//设置默最大认限购数量为1
				}
			}
			item.key = item.skuId;
			item.setName = function(v){that.setProp(item.key, v.target.value,'skuName')};
			item.setMainPic = function(v){that.setProp(item.key, v, 'mainImage')};
			item.setActivityStock = function(v){that.setProp(item.key, v,'activityStock')};
			item.setMarketPrice = function(v){that.setProp(item.key, v,'marketPrice')};
			item.setSinglePrice = function(v){that.setProp(item.key, v,'singlePrice')};
			item.setSingleTaxPrice = function(v){that.setProp(item.key, v,'singleTaxPrice')};
			item.setGroupPrice = function(v){that.setProp(item.key, v,'groupPrice')};
			item.setGroupTaxPrice = function(v){that.setProp(item.key, v,'groupTaxPrice')};
			item.setMarketPrice = function(v){that.setProp(item.key, v,'marketPrice')};
			item.setLimitMin = function(v){that.setProp(item.key, v,'limitMin')};
			item.setLimitMax = function(v){that.setProp(item.key, v,'limitMax')};
			item.setSortNum = function(v){that.setProp(item.key, v,'sortNum')};
			item.setRedemptionPrice = function(v){that.setProp(item.key, v,'redemptionPrice')};
			item.setSpecialOffer = function(v){that.setProp(item.key, v,'specialOffer')};
			item.setForNew = function(v){that.setProp(item.key, v,'forNew')};
			item.setForLeader = function(v){that.setProp(item.key, v,'forLeader')};
			item.setRecommended = function(v){that.setProp(item.key, v,'recommended')};
			item.setEnabled = function(v){that.setProp(item.key, v,'enabled')};
			item.remove = function(){that.remove(item.key);};
			item.setMarketingSubsidy = function(v){that.setProp(item.key, v,'marketingSubsidy')};
			item.setCommoditySubsidy = function(v){that.setProp(item.key, v,'commoditySubsidy')};
			item.setSupplierSubsidy = function(v){that.setProp(item.key, v,'supplierSubsidy')};

			item.setCommoditySubsidyStart = function(v){that.setProp(item.key, v,'commoditySubsidyStart')};
			item.setCommoditySubsidyEnd = function(v){that.setProp(item.key, v,'commoditySubsidyEnd')};
			item.setMarketingSubsidyStart = function(v){that.setProp(item.key, v,'marketingSubsidyStart')};
			item.setMarketingSubsidyEnd = function(v){that.setProp(item.key, v,'marketingSubsidyEnd')};
			item.setSupplierSubsidyStart = function(v){that.setProp(item.key, v,'supplierSubsidyStart')};
			item.setSupplierSubsidyEnd = function(v){that.setProp(item.key, v,'supplierSubsidyEnd')};
			item.setDiscountTaxType = function(v){that.setProp(item.key, v,'discountTaxType')};

			item.drag = that.drag;
			item.dragenter = that.dragenter;
			item.dragleave = that.dragleave;

			item.editGoods = function(v){that.editGoods(item.goodsId)};

		})

		return data;
	},
	setProp(key, value, name){
		let dataSource = this.props.dataSource;
		console.log('setProps');
		let results = [],isChangeVal = false;
		dataSource.map(function(item, i){
			if(item.key == key){
				console.log(name + '=' + value);
				if(item[name] != value){
					item[name] = value;
					isChangeVal = true;
				}
			}
		});
		
		if(isChangeVal){
			this.props.onChange(dataSource);
		}
	},
	remove(key){
		console.log('this is remove')
		let dataSource = this.props.dataSource;
		dataSource = dataSource.filter(item => item.key != key);
		this.props.onChange(dataSource);
	},
	dragClassName: 'ant-table-row',
 	afterDrop(data){
 		console.log('this is afterDrop')
 		// this.props.onChange(data);
 	},
 	getDragData(){
 		return this.props.dataSource;
 	},
 	editGoods(goodsId){
 		this.props.onEditGoods(goodsId);
 	},
	render(){
		const dataSource = this.processData(this.props.dataSource);

		return(
			<div 
		        onDrop={this.drop}
		        onDragOver={this.allowDrop}>
			<Table 
				className="mei-table-small111" 
				style={{display:this.props.visible?'block':'none'}}
		        columns={columns} 
		        dataSource={dataSource} 
		        expandedRowRender={record => <MeiListDetail isZtt={this.props.isZtt} isYHZX={this.props.isYHZX} data={record}/>}
		        pagination={false}/>
		        </div>
		);
	}
});

export default App;