import React from 'react';
import {Modal, Form, Input, Row, Col, Button, DatePicker, Select } from 'antd';
import MeiFormMixin from '../mixins/MeiFormMixin';
const FormItem = Form.Item;
const InputGroup = Input.Group;

var App = React.createClass({
  mixins: [MeiFormMixin],
  handleSubmit() {
        let formData = this.props.form.getFieldsValue();
        this.props.onSearch(formData);
  },
  onCancel(){
    this.props.onCancel();
  },
  render() {
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
    };
    return (
      <Modal
          title="高级搜索"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          okText="搜索"
          onOk={this.handleSubmit}
          onCancel={this.onCancel}
          width="60%">
            <Form horizontal className="ant-advanced-search-form">
                <Row>
                  <Col sm={12}>
                    <FormItem
                      label="货品名称"
                      {...formItemLayout}>
                      {this.getField('skuName')(<Input placeholder="请输入货品名称" size="default" />)}
                    </FormItem>
                    <FormItem
                      label="活动货品库存"
                      {...formItemLayout}>
                      <InputGroup size="large">
                      <Col span="10">
                        {this.getField('stockFrom')(<Input placeholder="例如50" />)}
                      </Col>
                      <Col span="2">
                        ~
                      </Col>
                      <Col span="10">
                        {this.getField('stockTo')(<Input placeholder="100" />)}
                      </Col>
                      </InputGroup>
                    </FormItem>
                  </Col>
                  <Col sm={12}>
                    <FormItem
                      label="活动单人购买价格"
                      {...formItemLayout}>
                      <InputGroup size="large">
                      <Col span="10">
                        {this.getField('singlePriceFrom')(<Input placeholder="例如50" />)}
                      </Col>
                      <Col span="2">
                        ~
                      </Col>
                      <Col span="10">
                        {this.getField('singlePriceTo')(<Input placeholder="100" />)}
                      </Col>
                      </InputGroup>
                    </FormItem>
                    <FormItem
                      label="活动组团购买价格"
                      {...formItemLayout}>
                      <InputGroup size="large">
                      <Col span="10">
                        {this.getField('groupPriceFrom')(<Input placeholder="例如50" />)}
                      </Col>
                      <Col span="2">
                        ~
                      </Col>
                      <Col span="10">
                        {this.getField('groupPriceTo')(<Input placeholder="100" />)}
                      </Col>
                      </InputGroup>
                    </FormItem>
                  </Col>
                  <Col sm={12}>
                    <FormItem
                      label="参团次数限制"
                      {...formItemLayout}>
                      {this.getField('joinLimitTimes')(<Input placeholder="请输入参团次数限制" size="default" />)}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="活动状态：" >
                        {this.getField('enabled')(<Select placeholder="请选择状态">
                          <Select.Option value="">请选择</Select.Option>
                          <Select.Option value={true}>启用</Select.Option>
                          <Select.Option value={false}>停用</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                  <Col sm={12}>
                    <FormItem
                        {...formItemLayout}
                        label="活动类型：" >
                        {this.getField('pintuanType')(<Select placeholder="请选择状态">
                          <Select.Option value="">请选择</Select.Option>
                          <Select.Option value={1}>一起买</Select.Option>
                          <Select.Option value={2}>专题团</Select.Option>
                          <Select.Option value={3}>分享购</Select.Option>
                        </Select>)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
      </Modal>
    );
  }
});

App = Form.create()(App);

export default App;