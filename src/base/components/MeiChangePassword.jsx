import React from 'react';
import { Modal, Form, Input } from 'antd';
import BaseFormComponent from './BaseFormComponent';
const FormItem = Form.Item;

/**
 * 更改密码弹框组件
 */
class MeiChangePassword extends BaseFormComponent{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.visible != 'undefined' && !nextProps.visible) {
            // 每次重新打开表单时候都重置表单
            this.props.form.resetFields();
        }
    }
    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }

            let formData = this.props.form.getFormFieldsValue();
            this.props.onSubmit(formData);
        });
    }
    
    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePassword'], { force: true });
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (getFieldValue('newpwd') && value && value !== getFieldValue('newpwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };
        const oldpwdProps = this.getFormField('oldpwd', {
            rules: [
                { required: true, message: '请输入旧密码' },
                { validator: this.checkPass },
            ],
        });
        const rePasswordProps = this.getFormField('rePassword', {
            rules: [{
                required: true,
                message: '请输入确认密码',
            }, {
                validator: this.checkPass2,
            }]
        });
        const newpwdProps = this.getFormField('newpwd', {
            rules: [
                { required: true, message: '请输入新密码' },
            ],
        });

        return (
            <Modal
                title="修改密码"
                visible={this.props.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}>
                <Form layout="horizontal">
                    <FormItem
                      label="旧密码"
                      {...formItemLayout}>
                      {oldpwdProps(<Input type="password" placeholder="请输入旧密码" />)}
                    </FormItem>
                    <FormItem
                        label="新密码"
                        {...formItemLayout}>
                        {newpwdProps(<Input type="password" placeholder="请输入新密码" />)}
                    </FormItem>
                    <FormItem
                      label="确认密码"
                      {...formItemLayout}>
                      {rePasswordProps(<Input type="password" placeholder="请输入确认密码" />)}
                    </FormItem>
                  </Form>
            </Modal>
        );
    }
};

MeiChangePassword = Form.create()(MeiChangePassword);

export default MeiChangePassword;
