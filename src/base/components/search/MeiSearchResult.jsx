require("../../scss/components/search-product.scss");

import React from 'react'
import assign from 'object-assign'
import { Modal, Table, Icon, Input, Select, Button, Form, Message } from 'antd'
import CommonReq from '../../req/CommonReq';
import MeiFormMixin from '../../mixins/MeiFormMixin';
import MeiAllOptions from './MeiAllOptions';

var App = React.createClass({
    mixins: [MeiFormMixin],
    getInitialState() {
        return {
            selectedRowKeys: [],
            dataSource: [],
        };
    },
    componentDidMount() {
        const selectedRowKeys = this.props.disabledKeys;
        const disabledRowKeys = this.props.disabledKeys;
        this.setState({ selectedRowKeys, disabledRowKeys });
    },
    componentWillReceiveProps(nextProps) {
        const selectedRowKeys = nextProps.disabledKeys;
        const disabledRowKeys = nextProps.disabledKeys;
        this.setState({ selectedRowKeys, disabledRowKeys });
    },

    handleSubmit(e) {
        e.preventDefault();

        const condition = this.props.form.getFieldsValue();
        let { isPhp, url, responseKey } = this.props;
        isPhp = typeof isPhp == 'undefined' ? this.getOptions().isPhp : isPhp;
        url = url || this.getOptions().url;
        responseKey = responseKey || this.getOptions().responseKey;

        CommonReq.searchResults(isPhp, url, responseKey, condition, (response) => {
            this.handleSearchResult(response);
        }, (textStatus, data) => {
            Message.warning(data.message || '服务器错误');
        });
    },

    handleSearchResult(response) {
        let data = response.results;
        if (!data || typeof data.length == 'undefined') {
            Message.warning('返回数据错误');
            return;
        }

        // 处理数据，添加上key，用于列表
        let propKey = this.props.key || this.getOptions().key;
        data.map((item, i) => {
            item.key = item[propKey];
        });
        this.setState({ dataSource: data });
    },

    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    },

    handleOk() {
        let { dataSource, selectedRowKeys } = this.state;

        if (!dataSource || !selectedRowKeys) {
            Message.warning('你还未选择数据');
            return;
        }

        let data = [];
        dataSource.map((item, i) => {
            if (selectedRowKeys.includes(item.key)) {
                data.push(item);
            }
        });

        if (!data || data.length < 1) {
            Message.warning('你还未选择数据');
            return;
        }
        this.props.onOk(data);
    },

    getOptions() {
        const type = this.props.type;
        const options = MeiAllOptions.filter((item) => item.type == type);
        let option = {};

        if (options && options.length > 0) {
            option = options[0];
        }

        return assign({
            isPhp: false,
            key: 'id',
            responseKey: 'body',
            isMultiple: true,
            width: '60%'
        }, option);
    },

    render() {
        const { dataSource, selectedRowKeys, disabledRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps(record) {
                return {
                    disabled: disabledRowKeys && disabledRowKeys.filter(item => item == record.key).length > 0, // 配置无法勾选的列
                };
            }
        };

        let { columns, conditions, title, isMultiple, width } = this.props;
        conditions = conditions || this.getOptions().conditions;
        columns = columns || this.getOptions().columns;
        title = title || this.getOptions().title;
        isMultiple = typeof isMultiple != 'undefined' ? isMultiple : this.getOptions().isMultiple;
        width = width || this.getOptions().width;

        // 设置是多选还是单选
        rowSelection.type = isMultiple ? 'checkbox' : 'radio';

        return (
        	<Modal
        		title={title}
				visible={this.props.visible}
				okText="保存"
				onOk={this.handleOk}
				onCancel={this.props.onCancel}
				width={width}>
				<Form horizontal 
		          	onSubmit={this.handleSubmit} 
		          	className="mei-search-product">
		          	{conditions && conditions.map((item, i) => {
                        if(item.type == 'select'){
                            return(
                                <div className="mei-search-product-item" key={i}>
                                    <label>{item.label}</label>
                                    {this.getField(item.key)(
                                        <Select placeholder={item.placeholder}>
                                            {item.data && item.data.map((sitem, j) => {
                                                return(<Select.Option key={j} value={sitem.value}>{sitem.label}</Select.Option>)
                                            })}
                                        </Select>)}
                                </div>
                            )    
                        }else{
                            return(
                                <div className="mei-search-product-item" key={i}>
                                    <label>{item.label}</label>
                                    {this.getField(item.key)(
                                        <Input type="text" placeholder={item.placeholder} />)}
                                </div>
                            )
                        }
		          	})}
			        <div className="mei-search-product-item">
		        		<Button type="primary" htmlType="submit" className="mei-table-small-search-btn"><Icon type="search"/>搜索</Button>
		        	</div>
		        </Form>
		        <Table 
		        	columns={columns} 
		        	dataSource={dataSource} 
		        	pagination={false} 
		        	rowSelection={rowSelection} />
		    </Modal>
        );
    }
});

App = Form.create()(App);

export default App;
