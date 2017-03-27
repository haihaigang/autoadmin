import React from 'react';
import {Modal, Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
import MeiFormMixin from '../mixins/MeiFormMixin';

var App = React.createClass({
	mixins: [MeiFormMixin],
  getInitialState() {
  	return {};
  },
  handleSubmit(){
  	this.props.onSave(this.props.form.getFieldsValue());
  },
  onCancel(){
  	this.props.onCancel();
  },
  render() {
  	const formItemLayout = {
  		labelCol: { span: 6 },
  		wrapperCol: { span: 14 }
    };
    return (
      <Modal
          title="垂直居中的对话框"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={this.handleSubmit}
          onCancel={this.onCancel}>
          <Form horizontal>
          </Form>
      </Modal>
    );
  }
});

App = Form.create()(App);

export default App;