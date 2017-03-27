require('../../scss/components/single-search-target.scss');

import React from 'react';
import { Input, Select, Button, Icon } from 'antd';
import jsonp from 'jsonp';
import querystring from 'querystring';
import classNames from 'classnames';
import CommonReq from '../../req/CommonReq';
const Option = Select.Option;

let timeout; // 搜索的定时器
let max = 8; // 展示搜索结果的最大条数

/**
 * 获取搜索的结果数据
 * @param options 搜索附加内容
 * @param value 搜索的关键字
 * @param callback 回调
 * @param callbackError 失败回调
 */
function fetch(options, value, callback, callbackError) {
    if(options.type != 2){
        // 只有分类是海外精选详情才搜索
        console.log('MeiSingleSearchProduct fetch type is not equals 2');
        callbackError();
        return;
    }
    if(!value){
        callbackError();
        return;
    }
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    function fake() {
        let condition = {};

        //小于11位且数值传商品ID
        //11位字符串传商品编码
        //其它传商品名称
        if(value.length < 11 && !isNaN(value)){
            condition.skuId = value;
        }else if(value.length == 11){
        	// 15AA2005571
        	// 22101000528
        	// 15101000564
        	// 15101002748
        	condition.bn = value;
        }else{
        	condition.name = value;
        }

        for(var i in options){
            condition[i] = options[i];
        }

        CommonReq.searchProductsWithWare(condition, (response) => {
        	let data = response.body.content;
        	callback(data);
        }, callbackError);
    }

    timeout = setTimeout(fake, 300);
}

const SearchInput = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
    },
    getInitialState() {
        return {
            data: [], //查询的结果数据
            value: '', //搜索的关键字
            focus: false, 
            isSearching: false, //是否正在发起查询
            isNoResult: false, //是否没有查询到数据
        };
    },
    componentDidMount() {
        this.setState({value: this.props.data.value || ''});
    },
    componentWillReceiveProps(nextProps) {
        if(nextProps.data.value){
            this.setState({value: nextProps.data.value});
        }else{
            this.setState({value: ''});
        }
    },
    handleChange(value) {
        this.handleFetch(value);
    },
    handleSubmit() {
        let value = this.state.value;

        this.handleFetch(value);
    },
    handleFetch(value){
        let isSearching = true;
        let isNoResult = false;
        this.setState({ value, isSearching, isNoResult });
        fetch(this.props.data, value, data => {
            isSearching = false;
            if(data.length == 0){
                isNoResult = true;
            }
            this.setState({ data, isSearching, isNoResult });
        }, () => {
            isSearching = false;
            this.setState({data: [], isSearching });
        });
        this.changeData(value);
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
        if(this.state.isSearching){
            console.log('changeData isSearching is ' + this.state.isSearching);
            return;
        }
    	if(isNaN(value) || value.length >= 11){
    		return;
    	}
        this.props.onChange && this.props.onChange(value);
    },
    render() {
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        const options = this.state.data.map((d, i) => <Option key={i} value={d.skuId.toString()}>{(d.marketable ? 'Y ' : 'N ') + d.barcodeNumber + ' ' + d.skuName}</Option>);
        return (
                <div className="mei-single-search-target">
                    <Input.Group className={searchCls}>
        		        <Select
        		        	size="large"
        		            combobox
        		            value={this.state.value}
        		            placeholder={this.props.placeholder}
        		            notFoundContent="没有数据"
        		            defaultActiveFirstOption={false}
        		            showArrow={false}
        		            filterOption={false}
        		            onChange={this.handleChange}
        		            onFocus={this.handleFocus}
        		            onBlur={this.handleBlur}>
        		            {options}
        		        </Select>
                        <div className="ant-input-group-wrap">
                            <Button size="large" className={btnCls} onClick={this.handleSubmit}>
                              <Icon type="search" />
                            </Button>
                      </div>
                    </Input.Group>
                    <div className="mei-single-search-target-tip">
                        <Icon className="mei-single-search-target-loading" type="loading" style={{display: this.state.isSearching ? '' : 'none'}} />
                        <span className="mei-single-search-target-text" style={{display: this.state.isNoResult ? '' : 'none'}}>没有结果</span>
                    </div>
                </div>
        );
    },
});

export default SearchInput;
