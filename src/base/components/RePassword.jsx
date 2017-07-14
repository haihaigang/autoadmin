import React from 'react';
import {Modal, Form, Input, Row, Col, Button } from 'antd';
import MeiFormMixin from '../mixins/MeiFormMixin';
const FormItem = Form.Item;

class App extends BaseComponent{
  componentWillReceiveProps(nextProps) {
    //接收父组件的值
      if(typeof nextProps.visible != 'undefined' && !nextProps.visible){
        this.props.form.resetFields()//只可以在view里使用
      }  
  }

  handleSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

        let formData = this.props.form.getFieldsValue();
        this.props.onSubmit(formData);
        
    });
  }

  onCancel(){
    this.props.form.resetFields();
    this.props.onCancel();
  }

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
        validateFields(['rePassword'], { force: true});
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (getFieldValue('newPassword') && value && value !== getFieldValue('newPassword')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  render() {
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };
    const oldPasswordProps = this.getField('oldPassword', {
      rules: [
        { required: true, message: '请输入旧密码' },
        { validator: this.checkPass },
          ],
    });
    const rePasswordProps = this.getField('rePassword', {
        rules: [{
            required: true,
            message: '请输入确认密码',
        }, {
            validator: this.checkPass2,
        }]
    });
    const newPasswordProps = this.getField('newPassword', {
      rules: [
        { required: true, message: '请输入新密码' },
          ],
    });
    return (
      <Modal
          title="修改密码"
          wrapClassName="vertical-center-modal"
          visible={this.props.visible}
          onOk={this.handleSubmit}
          onCancel={this.onCancel}>
            <Form horizontal>
                <Row>
                  <Col sm={20}>
                    <FormItem
                      label="旧密码"
                      {...formItemLayout}>
                      {oldPasswordProps(<Input type="password" placeholder="请输入旧密码" />)}
                    </FormItem>
                    <FormItem
                        label="新密码"
                        {...formItemLayout}>
                        {newPasswordProps(<Input type="password" placeholder="请输入新密码" />)}
                    </FormItem>
                    <FormItem
                      label="确认密码"
                      {...formItemLayout}>
                      {rePasswordProps(<Input type="password" placeholder="请输入确认密码" />)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
      </Modal>
    );
  }
};

App = Form.create()(App);

export default App;