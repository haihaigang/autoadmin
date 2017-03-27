require("../scss/components/list.scss");

import React from 'react';
import { Table, Icon, Popconfirm } from 'antd';
import OPERATE_TYPE from '../constants/OperateTypeConstants';

var MeiList = React.createClass({
    defaultOptColumn: {
        title: '操作',
        key: 'operation',
        width: '60px',
        render(text, record) {
            record.onOperateClick = record.onOperateClick || function(){};
            return (
                <span>
                    <a 
                        href="javascript:;"
                        onClick={record.onOperateClick.bind(this,OPERATE_TYPE.EDIT)}>
                        <Icon type="edit" /></a>
                    <span className="ant-divider"></span>
                    <Popconfirm
                        title="您确认要删除吗？"
                        onConfirm={record.onOperateClick.bind(this,OPERATE_TYPE.REMOVE)}>
                        <a href="javascript:;"><Icon type="delete" /></a>
                    </Popconfirm>
                </span>
            );
        }
    },

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

        columns = columns.filter(item => item.checked);

        //若传递的列数据中不包含编辑栏则添加默认的操作栏
        if (!hasOpt) {
            columns.push(this.defaultOptColumn);
        }

        return columns;
    },

    /**
     * 处理数据源，添加key、添加一些绑定事件
     */
    processData(data) {
        var that = this;
        data.map((item, i) => {
            item.key = Math.random();
            item.onOperateClick = function(type) { that.props.onOperateClick(item, type) };
            if(item.children && item.children.length > 0){
                this.processData(item.children);
            }
        })
        return data;
    },

    getInitialState() {
        return {
            selectedRowKeys: [], // 这里配置默认勾选列
            loading: false,
        };
    },
    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    },
    getClassName() {
        return 'mei-list' + (this.props.extra ? ' ' + this.props.extra : '');
    },
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
});

export default MeiList;
