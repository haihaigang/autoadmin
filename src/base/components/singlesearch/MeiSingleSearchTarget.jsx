require('../../scss/components/single-search-target.scss');

import React from 'react';
import assign from 'object-assign';
import { Input, Select, Button, Icon } from 'antd';
import classNames from 'classnames';
import CommonReq from '../../req/CommonReq';
import MeiAllOptions from './MeiAllOptions';
const Option = Select.Option;

let timeout; // 搜索的定时器
let max = 8; // 展示搜索结果的最大条数
let currentValue;

/**
 * 获取搜索的结果数据
 * @param options 搜索附加内容
 * @param value 搜索的关键字
 * @param callback 回调
 * @param callbackError 失败回调
 */
function fetch(options, value, callback, callbackError) {
    if(!value){
        callbackError();
        return;
    }
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        let condition = {};

        for(var i in options.data){
            condition[i] = options.data[i];
        }

        condition = assign(condition, options.addParams(value));

        CommonReq.searchResults(options.isPhp, options.url, options.responseKey, condition, (response) => {
        	if(currentValue === value){
	            callback(response);
        	}
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

        fetch(this.getOptions(), value, data => {
            isSearching = false;
            if(data.results.length == 0){
                isNoResult = true;
            }
            this.setState({ data: data.results, isSearching, isNoResult });
        }, () => {
            isSearching = false;
            this.setState({ data: [], isSearching });
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
    	
    	let data = this.getOptions().beforeChange(this.state.data, value);
    	if(!data){
    		return;
    	}

        this.props.onChange && this.props.onChange(data);
    },

    getOptions() {
        const type = this.props.type;
        const options = MeiAllOptions.filter((item) => item.type == type);
        let option = {};

        if (options && options.length > 0) {
            option = options[0];
        }

        option = assign({
            isPhp: false,
            key: 'id',
            responseKey: 'body',
            data: {},
            processResults: function(){}
        }, option, this.props);

        if(typeof option.processUrl == 'function'){
        	option.url = option.processUrl(option.url, option.data);
        }

        return option;
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
        const results = this.getOptions().processResults(this.state.data);
        const options = results.map((d, i) => <Option key={d.key}>{d.label}</Option>);
        
        return (
            <div className="mei-single-search-target">
                <Input.Group className={searchCls}>
    		        <Select
    		        	size="large"
    		            combobox
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
