require("../scss/components/list.scss");

import React from 'react';
import { Table } from 'antd';
import BaseComponent from './BaseComponent'

/**
 * 列表组件
 */
class MeiList extends BaseComponent{
    constructor(props){
        super(props);

        this.state = {
            selectedRowKeys: [], // 这里配置默认勾选列
            loading: false,
        };
    }

    /**
     * 处理列表的头，
     */
    processColumn(columns) {
        var hasOpt = false;
        columns.forEach(function(d) {
            if (d.key == 'operation') {
                hasOpt = true;
            }
        });

        // 过滤只有选中的
        columns = columns.filter(item => item.checked);

        return columns;
    }

    /**
     * 处理数据源，添加key、添加一些绑定事件
     */
    processData(data) {
        var that = this;
        data.map((item, i) => {
            item.key = Math.random();
            item.onOperateClick = (type) => { this.props.onOperateClick(item, type) };
            
            if(item.children && item.children.length > 0){
                this.processData(item.children);
            }
        })
        return data;
    }

    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }

    /**
     * 处理列表追加的样式
     * @return {[type]} [description]
     */
    getClassName() {
        let name = this.props.conditions && this.props.conditions.length > 0 ? ' has-search' : ''
        return 'mei-list' + name;
    }

    render() {
        const dataSource = this.processData(this.props.dataSource);
        const columns = this.processColumn(this.props.columns);
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = this.props.selection ? true : false;

        return (
            <div className={this.getClassName()}>
                <div
                    className="mei-list-edit"
                    onClick={this.props.onColumnEdit}
                    style={{display: this.props.onColumnEdit ? '' : 'none'}}>
                    <span>编辑</span>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    loading={this.props.isLoading}
                    defaultExpandAllRows={true}
                    />
            </div>
        );
    }
};

export default MeiList;
