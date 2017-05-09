require("../scss/components/search.scss");

import React from 'react';
import BaseComponent from './BaseComponent'
import { Modal, Form, Input, Button, Checkbox, Radio, Select, Icon, Row, Col, Tree, TreeSelect, DatePicker } from 'antd';
import CommonReq from '../reqs/CommonReq';

/**
 * 搜索栏组件的基类
 */
class BaseSearch extends BaseComponent{
    constructor(props) {
        super(props);

        // 日期的默认设置
        this.datePickerOpt = {
            showTime: true,
            format: "YYYY-MM-DD HH:mm:ss",
            placeholder: "请选择时间",
        };
    }

    componentDidMount() {
        this.getAsyncData(this.props.conditions);
    }

    /**
     * 获取antd form decorator
     * @param key 表单的key
     * @param option 扩展的属性
     * @return
     */
    getFormField(key, option) {
        if (this.props && this.props.form) {
            const { getFieldDecorator } = this.props.form;
            option = option ? option : {};
            return getFieldDecorator(key, option);
        }
    }

    /**
     * 提交搜索
     * @return
     */
    handleSubmit(e) {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();

        this.props.onSearch(data);
    }

    /**
     * 获取单选下拉框的值
     * 约定获取数据的key=key+'Object'
     * 从key对应的value获取值
     * @param data 表单数据
     * @param key 表单域的key
     * @return 单个value
     */
    getSingleValue(data, key){
        key = key + 'Object';

        let result = '';

        if(!data || !data[key]){
            return result;
        }
        return data[key].value;
    }

    /**
     * 获取表单域
     * @param fields 表单结构的数据
     * @return
     */
    getFieldsItems(fields){
        if(!fields || fields.length == 0){
            return;
        }

        return fields.map((item, i) => {
            let decorator = this.getFormField(item.key);
            let dom = <Input placeholder={item.placeholder} />
            
            // Number,String,Date,Bool,Enum,Objet,Id,Image,ListSelect,TreeSelect
            switch(item.type){
                case 'Id': {
                    return decorator(<Input key={i} type="hidden" />)
                    break;
                }
                case 'Number': {
                    dom = <InputNumber placeholder={item.placeholder} />
                    break;
                }
                case 'String': {
                    dom = <Input placeholder={item.placeholder} />
                    break;
                }
                case 'Date': {
                    dom = <DatePicker {...this.datePickerOpt} />
                    break;
                }
                case 'Bool': {
                    dom = <Radio.Group>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    break;
                }
                case 'Enum': {
                    dom = <Select allowClear placeholder={item.placeholder}>
                            {item.data && item.data.map((it, ii) => {
                                return(<Select.Option key={ii} value={it.value}>{it.label}</Select.Option>);
                            }, this)}
                        </Select>
                    break;
                }
                case 'Object': {
                    // displayType值有四种
                    // 1. SingleList 单选的下拉框
                    // 2. ListSelect 多选的下拉框
                    // 3. SingleTree 单选的树
                    // 4. TreeSelect 多选的树
                    switch(item.displayType){
                        case 'SingleList': {
                            dom = <Select
                                    placeholder={item.placeholder}>
                                    {item.data && item.data.map((it, ii) => {
                                        let labelValue = it[item.dataLableKey];
                                        let keyValue = it[item.dataValueKey];
                                        return(<Select.Option key={keyValue} value={keyValue + ''}>{labelValue}</Select.Option>);
                                    }, this)}
                                </Select>
                            break;
                        }
                        case 'ListSelect': {
                            dom = <Select
                                    multiple
                                    placeholder={item.placeholder}>
                                    {item.data && item.data.map((it, ii) => {
                                        let labelValue = it[item.dataLableKey];
                                        let keyValue = it[item.dataValueKey];
                                        return(<Select.Option key={keyValue} value={keyValue + ''}>{labelValue}</Select.Option>);
                                    }, this)}
                                </Select>
                            break;
                        }
                        case 'SingleTree': {
                            // 约定SingleTree类型，结构为data.rootNode.children
                            let ret = [];
                            if(item.data){
                                ret = item.data.rootNode.children;
                            }

                            dom = <TreeSelect
                                    style={{ width: 300 }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={ret}
                                    placeholder="Please select"
                                    treeDefaultExpandAll
                                />
                            break;
                        }
                    }
                    break;
                }
            }

            return(
                <Col span="3" className="mei-search-item" key={i}>
                    <label>{item.label}</label>
                    {decorator(dom)} 
                </Col>
            );
        });
    }

    /**
     * 获取表单域所需要的数据
     * @param fields 表单域的数据
     * @return
     */
    getAsyncData(fields){
        if(!fields || fields.length == 0){
            return;
        }

        fields.map((item, i) => {
            if((item.type == 'Object' || item.type == 'TreeSelect') && item.url){
                // 需要获取动态数据的字段
                CommonReq.quickSend(item.url, (response) => {
                    item.data = response.body;
                    // this.props.onFieldsChange(item.key, item);
                })
            }
        });
    }

    /**
     * 组件的渲染方法
     * @return {[type]} [description]
     */
    render() {
        var data = this.props.conditions;

        const res = this.getFieldsItems(data);
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="mei-search">
              <Row>
                  {res}
                  <Col span="6" className="mei-search-item">
                    <label>&nbsp;</label>
                    <Button type="primary" htmlType="submit"><Icon type="search"/>搜索</Button>
                    <Button type="ghost" onClick={this.props.onAdvanceClick} style={{display: 'none'}}><Icon type="search"/>高级搜索</Button>
                  </Col>
              </Row>
            </Form>
        );
    }
};

export default BaseSearch;
