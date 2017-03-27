import React from 'react';
import { Input, Select, Button, Icon } from 'antd';
import querystring from 'querystring';
import classNames from 'classnames';
import CommonReq from '../../req/CommonReq';
const Option = Select.Option;

let timeout; // 搜索的定时器
let currentValue;
let max = 8; // 展示搜索结果的最大条数


/**
 * 获取搜索的结果数据
 * @param type 搜索内容的类型
 * @param value 搜索的关键字
 * @param callback 回调
 */
function fetch(type, value, callback) {
	if(type != 2){
		// 只有分类是海外精选详情才搜索
		return;
	}
	if(!value){
		return;
	}
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        let condition = {};

        if(typeof value == 'string' && value.length == 11){
        	// 15AA2005571
        	// 22101000528
        	// 15101000564
        	// 15101002748
        	condition.skuBn = value;
        }else{
        	condition.skuName = value;
        }

        CommonReq.searchProductsWithWare(condition, (response) => {
        	let data = response.body;
        	let result = [];
        	data.forEach((item, k) => {
        		if(k < max){
	        		result.push({
	        			value: item.skuId,
	        			text: item.skuName
	        		})
        		}
        	})

        	callback(result);
        });
    }

    timeout = setTimeout(fake, 300);
}

const SearchInput = React.createClass({
    getInitialState() {
        return {
            data: [],
            value: '',
            focus: false,
        };
    },
    handleChange(value) {
    	console.log('meisinglesearchproduct handleChange')
        this.setState({ value });
        fetch(this.props.type, value, data => this.setState({ data }));
        this.changeData(value);
    },
    handleSubmit() {
    	let value = this.state.value;
        console.log('输入框内容是: ', value);
    },
    handleFocusBlur(e) {
        this.setState({
            focus: e.target === document.activeElement,
        });
    },
    handleFocus() {
        this.setState({ focus: true });
    },
    handleBlur() {
        this.setState({ focus: false });
    },
    changeData(value){
    	if(isNaN(value) || value.length > 8){
    		return;
    	}
        this.props.onChange && this.props.onChange(value);
    },
    render() {
    	console.log(this.props)
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        const options = this.state.data.map((d, i) => <Option key={i} value={d.value.toString()}>{d.text}</Option>);
        return (
        	<div className="ant-search-input-wrapper" style={this.props.style}>
		        <Input.Group className={searchCls}>
			        <Select
			            combobox
			            value={this.state.value}
			            placeholder={this.props.placeholder}
			            notFoundContent=""
			            defaultActiveFirstOption={false}
			            showArrow={false}
			            filterOption={false}
			            onChange={this.handleChange}
			            onFocus={this.handleFocus}
			            onBlur={this.handleBlur}>
			            {options}
			        </Select>
			        <div className="ant-input-group-wrap">
			            <Button className={btnCls} onClick={this.handleSubmit}>
			              <Icon type="ellipsis" />
			            </Button>
			        </div>
		        </Input.Group>
		      </div>
        );
    },
});

export default SearchInput;
