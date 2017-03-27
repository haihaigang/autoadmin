require("../../scss/components/list-detail.scss");
import React from 'react'
import {Row, Col, Form, Input, Select, Icon, Upload, Card, InputNumber, Message,DatePicker} from 'antd'
import BaseConfig from '../../../base/utils/BaseConfig'
import Storage from '../../../base/utils/Storage'
import CommonReq from '../../../base/req/CommonReq'
import Tools from '../../utils/Tools.js';
import MeiFormMixin from '../../mixins/MeiFormMixin';

//补贴价格类型，1市场补贴价格、2商品补贴价格、3供应商补贴价格
const SUBSIDYPRICE_TYPE = {
	MARKETING: 1,
	COMMODITY: 2,
	SUPPLIER: 3,
}

//类型选择: 1选择价格补贴 2选择补贴时间
const SUBSIDY_TYPE = {
	PRICE: 1,
	TIME: 2,
}

var App = React.createClass({
	mixins: [MeiFormMixin],
	inte: undefined,
	propsData: undefined,
	subsidyData: {
			marketingSubsidy:'',
			marketingSubsidyStart:'',
			marketingSubsidyEnd:'',
			commoditySubsidy:'',
			commoditySubsidyStart:'',
			commoditySubsidyEnd:'',
			supplierSubsidy:'',
			supplierSubsidyStart:'',
			supplierSubsidyEnd:'',
			price: '',
			skuId: ''

		 },
	getInitialState() {
	    return {
	    	showPreview: false,
	    	marketingSubsidyDisabled: false,
	    	commoditySubsidyDisabled: false,
	    	supplierSubsidyDisabled: false,
	    };
	},
	componentDidMount() {
		this.propsData = this.props.data;
		const {getFieldValue} = this.props.form;
		const marketingSubsidy = this.propsData.marketingSubsidy ? this.propsData.marketingSubsidy : getFieldValue('marketingSubsidy');
		const commoditySubsidy = this.propsData.commoditySubsidy ? this.propsData.commoditySubsidy : getFieldValue('commoditySubsidy');
		const supplierSubsidy  = this.propsData.supplierSubsidy ? this.propsData.supplierSubsidy : getFieldValue('supplierSubsidy');
 
		this.subsidyData.marketingSubsidy = marketingSubsidy;
		this.subsidyData.commoditySubsidy = commoditySubsidy;
		this.subsidyData.supplierSubsidy  = supplierSubsidy ;

	 	const singlePrice = this.propsData.singlePrice ? this.propsData.singlePrice : this.propsData.preTax;
	 	const singleTaxPrice = this.propsData.singleTaxPrice ? this.propsData.singleTaxPrice : this.propsData.price;
	 	const groupPrice = this.propsData.groupPrice ? this.propsData.groupPrice : this.propsData.preTax;
	 	const groupTaxPrice = this.propsData.groupTaxPrice ? this.propsData.groupTaxPrice : this.propsData.price;

 		if (marketingSubsidy && marketingSubsidy > 0) {
 			this.setState({marketingSubsidyDisabled: false});
 		} else {
 			this.setState({marketingSubsidyDisabled: true});
 		}

 		if (commoditySubsidy && commoditySubsidy > 0) {
			this.setState({commoditySubsidyDisabled: false});
 		} else  {
			this.setState({commoditySubsidyDisabled: true});
 		}

		if (supplierSubsidy && supplierSubsidy > 0) {
			this.setState({supplierSubsidyDisabled: false});
 		} else  {
			this.setState({supplierSubsidyDisabled: true});
 		}

 		
		if (this.propsData && this.propsData.marketingSubsidyStart && this.propsData.marketingSubsidyStart) {
			this.subsidyData.marketingSubsidyStart = this.propsData.marketingSubsidyStart;
			this.subsidyData.marketingSubsidyEnd = this.propsData.marketingSubsidyEnd;
		}else {
			this.subsidyData.marketingSubsidyStart = '';
			this.subsidyData.marketingSubsidyEnd = '';
		}
		if (this.propsData && this.propsData.commoditySubsidyStart && this.propsData.commoditySubsidyEnd) {
			this.subsidyData.commoditySubsidyStart = this.propsData.commoditySubsidyStart;
			this.subsidyData.commoditySubsidyEnd = this.propsData.commoditySubsidyEnd;
		}else {
			this.subsidyData.commoditySubsidyStart = '';
			this.subsidyData.commoditySubsidyEnd = '';
		}
		if (this.propsData && this.propsData.supplierSubsidyStart && this.propsData.supplierSubsidyEnd) {
			this.subsidyData.supplierSubsidyStart = this.propsData.supplierSubsidyStart;
			this.subsidyData.supplierSubsidyEnd = this.propsData.supplierSubsidyEnd;
		}else {
			this.subsidyData.supplierSubsidyStart = '';
			this.subsidyData.supplierSubsidyEnd = '';
		}

	},
	handleChange(e){
		const v = e.target.value;
		this.props.data.setName(v);
	},
	getRuleValue(){
		const data = this.props.data;
		if(data.forNew){
			return '2';
		}else if(data.forLeader){
			return '3';
		}else if(data.specialOffer){
			return '1';
		}else{
			return '';
		}
	},
	handleRuleChange(v){
		const data = this.props.data
		if(v == 1){
			data.setSpecialOffer(true);
			data.setForNew(false);
			data.setForLeader(false);
		}else if(v == 2){
			data.setSpecialOffer(false);
			data.setForNew(true);
			data.setForLeader(false);
		}else if(v == 3){
			data.setSpecialOffer(false);
			data.setForNew(false);
			data.setForLeader(true);
		}else{
			data.setSpecialOffer(false);
			data.setForNew(false);
			data.setForLeader(false);
		}
	},
	handleUploadChange(info){
		let imgObj = {};
		let response = info.file.response;
		if(info.file.status == 'done'){
			if(response.status == 200){
		    	imgObj.url = response.body.url;
		    	imgObj.id = response.body.id;
			}else{
				Message.warning(response.message || '上传图片失败');
			}
	    }
	    if(imgObj.id){
		    this.props.data.setMainPic(imgObj);
	    }
	},
	showPreview(){
		const that = this;
		if(!this.state.src){
			return;
		}
		if(this.inte){
			return;
		}

		if(this.inte){
			clearTimeout(this.inte);
		}
		this.inte = setTimeout(function(){
			that.setState({showPreview: true});
		},200);
	},
	hidePreview(){
		console.log('hidePreview')
		if(this.inte){
			clearTimeout(this.inte);
			this.inte = undefined;
		}
		if(this.state.showPreview){
			this.setState({showPreview: false});
		}
	},
	handleSinglePrice(value){
		const data = this.props.data;

		if(value == data.singlePrice){
			return;
		}

		data.setSinglePrice(value);
		CommonReq.getTaxPrice(data.skuId, value, function(response){
			data.setSingleTaxPrice(response.body);
		});
	},
	handleMarketingSubsidy(value){
		var temp = value ? value : 0;
		this.subsidyData.marketingSubsidy = temp;
		this.propsData.setMarketingSubsidy(temp);
		if (value > 0) {
			this.setState({marketingSubsidyDisabled: false});
		}
		this.getSubsidyPrice();

	},
	handleCommoditySubsidy(value){
		var temp = value ? value : 0;
		this.subsidyData.commoditySubsidy = temp;
		this.propsData.setCommoditySubsidy(temp);
		if (value > 0) {
			this.setState({commoditySubsidyDisabled: false});
		}
		this.getSubsidyPrice();
		
	},
	handleSupplierSubsidy(value){
		var temp = value ? value : 0;
		this.subsidyData.supplierSubsidy = temp;
		this.propsData.setSupplierSubsidy(temp);
		if (value > 0) {
			this.setState({supplierSubsidyDisabled: false});
		}

		this.getSubsidyPrice();
	},
	handleMarketingSubsidyDurationChange(value){

		if (value[0] != null && value[1] != null) {
			this.propsData.setMarketingSubsidyStart(value[0].format('x') * 1);
			this.propsData.setMarketingSubsidyEnd(value[1].format('x') * 1);
			this.subsidyData.marketingSubsidyStart = value[0].format('x') * 1;
			this.subsidyData.marketingSubsidyEnd = value[1].format('x') * 1;
			this.getSubsidyPrice();
		} else {
			this.propsData.setMarketingSubsidyStart('');
			this.propsData.setMarketingSubsidyEnd('');
			this.subsidyData.marketingSubsidyStart = '';
			this.subsidyData.marketingSubsidyEnd = '';
		}
		
	},
	handleCommoditySubsidyDurationChange(value){
		
		if (value[0] != null && value[1] != null) {
			this.propsData.setCommoditySubsidyStart(value[0].format('x') * 1);
			this.propsData.setCommoditySubsidyEnd(value[1].format('x') * 1);

			this.subsidyData.commoditySubsidyStart = value[0].format('x') * 1;
			this.subsidyData.commoditySubsidyEnd = value[1].format('x') * 1;
			this.getSubsidyPrice();
		} else {
			this.propsData.setCommoditySubsidyStart('');
			this.propsData.setCommoditySubsidyEnd('');
			this.subsidyData.commoditySubsidyStart = '';
			this.subsidyData.commoditySubsidyEnd = '';
		}

	},
	handleSupplierSubsidyDurationChange(value){
		if (value[0] != null && value[1] != null) {
			this.propsData.setSupplierSubsidyStart(value[0].format('x') * 1);
			this.propsData.setSupplierSubsidyEnd(value[1].format('x') * 1);
			this.subsidyData.supplierSubsidyStart = value[0].format('x') * 1;
			this.subsidyData.supplierSubsidyEnd = value[1].format('x') * 1;
			this.getSubsidyPrice();
		} else {
			this.propsData.setSupplierSubsidyStart('');
			this.propsData.setSupplierSubsidyEnd('');
			this.subsidyData.supplierSubsidyStart = '';
			this.subsidyData.supplierSubsidyEnd = '';
		}
	},
	/**
	 * @return 获取补贴价格值和补贴时间有效期
	 */
	getSubsidyPrice(){
		const {getFieldValue} = this.props.form;
		const preTax = getFieldValue('preTax');
		this.subsidyData.price = preTax;
		this.subsidyData.skuId = this.propsData.skuId;
		
		if (this.subsidyData.marketingSubsidy && (!this.subsidyData.marketingSubsidyStart && !this.subsidyData.marketingSubsidyEnd)) {
				Message.warning('请选择市场部补贴有效期');
		} else if (this.subsidyData.commoditySubsidy && (!this.subsidyData.commoditySubsidyStart && !this.subsidyData.commoditySubsidyEnd)) {
				Message.warning('请选择商品部补贴有效期');
		} else if (this.subsidyData.supplierSubsidy && (!this.subsidyData.supplierSubsidyStart && !this.subsidyData.supplierSubsidyEnd)) {
				Message.warning('请选择供应商补贴有效期');
		} else {
			CommonReq.getGroupTaxPrice(this.subsidyData, function(response){
				this.propsData.setGroupPrice(response.body.groupPrice);
				this.propsData.setGroupTaxPrice(response.body.groupTaxPrice);

			}.bind(this),function(textStatus, response){
				if(textStatus == 'Malformed'){
					if (response.status == 400) {
						Message.error(response.message);
					}
				}
			});
		}
	},
	getPriceDisalbe(){
		return this.getRuleValue() != 1;
	},
	checkDurationTime(rule, value, callback){
		if(!value[0]){
			callback(new Error('请选择活动起止时间!'));
		}else{
			callback();
		}
	},
	getIsShow(){
		let data = this.props.data;
		let defaultIsShow = data.enabled;
    	if(defaultIsShow == undefined){
    		defaultIsShow = true;
    	}
    	return defaultIsShow + '';
	},
	getIsOn(){
		let data = this.props.data.marketable;
		data = data ? '是' : '否';
    	return data;
	},
	render(){
	    const data = this.props.data;

	    const props = {
			name: 'file',
			showUploadList: false,
			action: BaseConfig.HOST + '/images/upload',
			beforeUpload(file) {
				console.log('图片文件'+file)
			    const isJPG = file.size <= 200000;
			    if (!isJPG) {
			      Message.error('上传的图片大小不超过200K!');
			    }
			    return isJPG;
		  	},
			listType: 'picture',
			onChange: this.handleUploadChange,
			className: "mei-list-upload",
			headers: {
				'X-Auth-Token': Storage.get('User').accessToken
			}
		};

		const priceProps = {
			step: 0.01,
			min: 0,
		}
		const mainImage = data.mainImage || {};

		console.log('mei-list-detail render')
		console.log(data.isSku);
		
		const datePickerOpt = {
			showTime: true,
			format: "YYYY-MM-DD HH:mm:ss",
			placeholder: "请选择时间",
		};

		const marketingSubsidyProps = this.getField('marketingSubsidy', {
			initialValue: data.marketingSubsidy,
    	});

    	const commoditySubsidyProps = this.getField('commoditySubsidy', {
			initialValue: data.commoditySubsidy,
    	});

    	const supplierSubsidyProps = this.getField('supplierSubsidy', {
			initialValue: data.supplierSubsidy,
    	});

		const marketingSubsidyTimeProps = this.getField('marketingSubsidyTime',{
			initialValue: [Tools.getDate(data.marketingSubsidyStart),Tools.getDate(data.marketingSubsidyEnd)],
			rules: [
				{
					required: true,
					type: 'array',
					message: '请选择市场部补贴起止时间',
				},
	            { validator: this.checkDurationTime },
	        ]
		});

		const commoditySubsidyTimeProps = this.getField('commoditySubsidyTime',{
			initialValue: [Tools.getDate(data.commoditySubsidyStart),Tools.getDate(data.commoditySubsidyEnd)],
			rules: [
				{
					required: true,
					type: 'array',
					message: '请选择商品部补贴起止时间',
				},
	            { validator: this.checkDurationTime },
	        ]
		});

		const supplierSubsidyTimeProps = this.getField('supplierSubsidyTime',{
			initialValue: [Tools.getDate(data.supplierSubsidyStart),Tools.getDate(data.supplierSubsidyEnd)],
			rules: [
				{
					required: true,
					type: 'array',
					message: '请选择供应商补贴起止时间',
				},
	            { validator: this.checkDurationTime },
	        ]
		});

		const discountTaxUndertakerProps = this.getField('discountTaxType', {
			initialValue: data.discountTaxType ? String(data.discountTaxType) : '0',
		    rules: [
		        { required: true, message: '请选择包税策略', type: 'number' },
		    ],
    	});

		// 税前价,单人价,组团价默认取preTax,单人税后价,组团税后价默认取price
		const singlePriceProps = this.getField('singlePrice', {
    		initialValue: data.singlePrice ? data.singlePrice : data.preTax,
    	});

		const singleTaxPriceProps = this.getField('singleTaxPrice', {
    		initialValue: data.singleTaxPrice ? data.singleTaxPrice : data.price,
    	});

    	const groupPriceProps = this.getField('groupPrice', {
    		initialValue: data.groupPrice ? data.groupPrice : data.preTax,
    	});

    	const preTaxProps = this.getField('preTax', {
    		initialValue: (data.preTax==0 ||  data.preTax) ? data.preTax : data.price,
    	});

    	const groupTaxPriceProps = this.getField('groupTaxPrice', {
    		initialValue: data.groupTaxPrice ? data.groupTaxPrice : data.price,
    	});

		return(
			<div className="mei-list-detail">
				<div className="mei-list-detail-prompt" style={{display: data.changeFlag == true ? 'block' : 'none'}}>
					<p>由于税前价发生变化,导致组团价随之变化</p>
					<p>变化前税前价:{data.changePrice}</p>
					<p>变化前组团价:{data.changeGroupPrice}</p>
				</div>
				<Row className="mei-list-detail-item" style={{display:this.props.isZtt==true ? 'none':'block'}}>
					<Col span="3" className="mei-list-detail-label">
			        图片
			        </Col>
			        <Col span="21" className="mei-list-detail-value">
			        	<Upload {...props}>
							<img className="thumb" style={{width:'370px',height:'auto',minHeight:'24px'}} src={mainImage.url} alt="" onMouseOver={this.showPreview} onMouseOut={this.hidePreview}/>
							<Card className="preview" 
								bodyStyle={{ padding: 0 }}
								onMouseOver={this.showPreview}
								onMouseOut={this.hidePreview}
								style={{display: this.state.showPreview ? 'block' : 'none'}}>
								<img src={mainImage.url} alt=""/>
							</Card>
						</Upload>
			        </Col>
				</Row>
				<Row className="mei-list-detail-item" style={{display:this.props.isZtt==true ? 'none':'block'}}>
					<Col span="3" className="mei-list-detail-label">
			        货品名称
			        </Col>
			        <Col span="16" className="mei-list-detail-value">
			        	<Input type="text" value={data.skuName} onChange={data.setName} />
			        </Col>
				</Row>
				<Row className="mei-list-detail-item">
			        <Col span="3" className="mei-list-detail-label">
			        税前价
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	{preTaxProps(<InputNumber min={0} step="0.01" disabled={true} />)}
			        </Col>
					<Col span="3" className="mei-list-detail-label">
			        组团价
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	{groupPriceProps(<InputNumber min={0} step="0.01" disabled={true} />)}
			        </Col>
			        <Col span="3" className="mei-list-detail-label">
			        组团税后价
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	{groupTaxPriceProps(<InputNumber min={0} step="0.01" disabled={true} />)}
			        </Col>
				</Row>

				<Row className="mei-list-detail-item">
			        <Col span="3" className="mei-list-detail-label">
			        	市场价
			        </Col>
					<Col span="3" className="mei-list-detail-value">
						<InputNumber min={0} step="0.01" value={data.marketPrice} onChange={data.setMarketPrice} />
					</Col>
					<Col span="3" className="mei-list-detail-label">
						包税策略
					</Col>
					<Col span="3" className="mei-list-detail-value">
						{discountTaxUndertakerProps(<Select onChange={data.setDiscountTaxType}>
							<Select.Option value='0'>不包税</Select.Option>
							<Select.Option value='1'>商品部承担</Select.Option>
							<Select.Option value='2'>市场部承担</Select.Option>
							<Select.Option value='3'>供应商承担</Select.Option>
						</Select>)}
					</Col>
					<Col span="3" className="mei-list-detail-label" style={{display: this.props.isYHZX ? '' : 'none'}}>
						优惠设置
					</Col>
					<Col span="3" className="mei-list-detail-value" style={{display: this.props.isYHZX ? '' : 'none'}}>
						<Select value={this.getRuleValue()} onChange={this.handleRuleChange} allowClear>
							<Select.Option value='1'>满额换购</Select.Option>
							<Select.Option value='2'>新人专享</Select.Option>
							<Select.Option value='3'>团长专享</Select.Option>
						</Select>
					</Col>
					<Col span="3" className="mei-list-detail-label" style={{display: this.props.isYHZX ? '' : 'none'}}>
			        换购金额
			        </Col>
			        <Col span="3" className="mei-list-detail-value" style={{display: this.props.isYHZX ? '' : 'none'}}>
			        	<InputNumber min={0} step="0.01" value={data.redemptionPrice} onChange={data.setRedemptionPrice} disabled={this.getPriceDisalbe()} />
			        </Col>
				</Row>
				<Row className="mei-list-detail-item">
			    	<Col span="3" className="mei-list-detail-label">
			        市场部补贴有效期
			        </Col>
			        <Col span="8" className="mei-list-detail-value">
			        	{marketingSubsidyTimeProps(<DatePicker.RangePicker {...datePickerOpt} onChange={this.handleMarketingSubsidyDurationChange} disabled={this.state.marketingSubsidyDisabled} />)}
			        </Col>
			    	<Col span="3" className="mei-list-detail-label">
			        市场部补贴
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	{marketingSubsidyProps(<InputNumber min={0} step="0.01" onChange={this.handleMarketingSubsidy} />)}
			        </Col>
			    </Row>
			    <Row className="mei-list-detail-item">
			        <Col span="3" className="mei-list-detail-label">
			        商品部补贴有效期
			        </Col>
			        <Col span="8" className="mei-list-detail-value">
			        	{commoditySubsidyTimeProps(<DatePicker.RangePicker {...datePickerOpt} onChange={this.handleCommoditySubsidyDurationChange} disabled={this.state.commoditySubsidyDisabled} />)}
			        </Col>
			        <Col span="3" className="mei-list-detail-label">
			        商品部补贴
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	{commoditySubsidyProps(<InputNumber min={0} step="0.01" onChange={this.handleCommoditySubsidy} />)}
			        </Col>
			    </Row>
			    <Row className="mei-list-detail-item">
			        <Col span="3" className="mei-list-detail-label">
			        供应商补贴有效期
			        </Col>
			        <Col span="8" className="mei-list-detail-value">
			        	{supplierSubsidyTimeProps(<DatePicker.RangePicker {...datePickerOpt} onChange={this.handleSupplierSubsidyDurationChange} disabled={this.state.supplierSubsidyDisabled} />)}
			        </Col>
			        <Col span="3" className="mei-list-detail-label">
			        供应商补贴
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	{supplierSubsidyProps(<InputNumber min={0} step="0.01" onChange={this.handleSupplierSubsidy} />)}
			        </Col>
			    </Row>

			    <Row className="mei-list-detail-item">
			        <Col span="3" className="mei-list-detail-label">
			        活动库存
			        </Col>
			        <Col span="5" className="mei-list-detail-value">
			        	<InputNumber min={1} max={data.stock} value={data.activityStock} onChange={data.setActivityStock} />
			        	<span className="mei-sku-stock">货品库存（{data.stock}）</span>
			        </Col>
			        <Col span="3" className="mei-list-detail-label">
			        起购数量
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	<InputNumber min={0} value={!this.props.isZtt ? 1 : data.limitMin} onChange={data.setLimitMin} disabled={!this.props.isZtt} />
			        </Col>
			        <Col span="3" className="mei-list-detail-label">
			        限购数量
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	<InputNumber min={0} required value={data.limitMax} onChange={data.setLimitMax} />
			        </Col>
			    </Row>

			    <Row className="mei-list-detail-item">
			        <Col span="3" className="mei-list-detail-label" style={{display: this.props.isZtt ? 'none' : ''}}>
			        排序值
			        </Col>
			        <Col span="3" className="mei-list-detail-value" style={{display: this.props.isZtt ? 'none' : ''}}>
			        	<InputNumber min={0} maxLength="10" value={data.sortNum} onChange={data.setSortNum} />
			        </Col>
			        <Col span="3" className="mei-list-detail-label">
			        是否显示
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	<Select value={this.getIsShow()} onChange={data.setEnabled}>
			        		<Select.Option value='true'>显示</Select.Option>
			        		<Select.Option value='false'>隐藏</Select.Option>
			        	</Select>
			        </Col>
			        <Col span="3" className="mei-list-detail-label">
			        是否上架
			        </Col>
			        <Col span="3" className="mei-list-detail-value">
			        	<Input value={this.getIsOn()} disabled={true} />
			        </Col>
			    </Row>
			</div>
		);
	}
});

App = Form.create()(App);

export default App