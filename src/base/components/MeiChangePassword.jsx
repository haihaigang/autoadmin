import React from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import MeiFormMixin from '../mixins/MeiFormMixin';
const FormItem = Form.Item;

var App = React.createClass({
    mixins: [MeiFormMixin],
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.visible != 'undefined' && !nextProps.visible) {
            // 隐藏表单时候重置表单
            this.props.form.resetFields();
        }
    },
    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }

            let formData = this.props.form.getFieldsValue();
            console.log(formData)
            this.props.onSubmit(formData);

        });
    },
    onCancel() {
        this.props.form.resetFields();
        this.props.onCancel();
    },
    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePassword'], { force: true });
        }
        callback();
    },

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (getFieldValue('newpwd') && value && value !== getFieldValue('newpwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };
        const oldpwdProps = this.getField('oldpwd', {
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
        const newpwdProps = this.getField('newpwd', {
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
});

App = Form.create()(App);

export default App;
