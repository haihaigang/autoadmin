import React from 'react';
import {
    Modal, Form, Input, Row, Col, Button
}
from 'antd';
import ActivityStore from '../../pintuan/stores/ActivityStore';
import AccountReq from '../../account/req/AccountReq';
import MeiFormMixin from '../mixins/MeiFormMixin';

const FormItem = Form.Item;

var App = React.createClass({
    mixins: [MeiFormMixin],
    getInitialState: function() {
        return {
        	visible: false,
            imageUrl: '',
            sequence: 0,
        };
    },
    componentDidMount: function() {
        const that = this;
        AccountReq.createCaptcha('', function(response) {
            that.setState({
                imageUrl: response.body.imageUrl,
                sequence: response.body.sequence || response.body.seqence,
            })
        });
        ActivityStore.addChangeListener(this.onChangeQuickLogin);  
    },
    componentWillUnmount() {
        ActivityStore.removeChangeListener(this.onChangeQuickLogin);  
    },
    onChangeQuickLogin(){
    	this.setState({visible: true});
    },
    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }

            let formData = this.props.form.getFieldsValue();
            this.props.onSubmit(formData);
        });
    },
    onCancel() {
        this.props.onCancel();
    },
    checkPass(rule, value, callback) {
        const {
            validateFields
        } = this.props.form;
        if (value) {
            validateFields(['rePassword'], {
                force: true
            });
        }
        callback();
    },

    checkPass2(rule, value, callback) {
        const {
            getFieldValue
        } = this.props.form;
        if (getFieldValue('oldPassword') && value && value !== getFieldValue('oldPassword')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },
    onCodeClick() {
        const that = this;
        AccountReq.createCaptcha('', function(response) {
            that.setState({
                imageUrl: response.body.imageUrl,
                sequence: response.body.sequence,
            })
        });
    },
    render() {
        const loginNameProps = this.getField('loginName', {
            rules: [{
                required: true,
                min: 5,
                max: 20,
                message: '用户名至少为 5 个字符'
            }, ],
        });

        const passwordProps = this.getField('password', {
            rules: [{
                required: true,
                message: '请输入密码'
            }, ],
        });

        const captchaProps = this.getField('captcha', {
            rules: [{
                required: true,
                min: 4,
                max: 4,
                message: '请输入四位的验证码'
            }, ],
        });
        const sequenceProps = this.getField('sequence', {
            initialValue: this.state.sequence,
        });
        return (
        	<Modal
				title="用户登录"
				wrapClassName="vertical-center-modal"
				clsssName="mei-login"
				visible={this.state.visible}
				onOk={this.handleSubmit}
				onCancel={this.onCancel}>
				<Form horizontal>
				    <Form.Item>
                        {loginNameProps(<Input type="text" maxLength="50" placeholder="请输入用户名" />)}
				    </Form.Item>
				    <Form.Item>
                        {passwordProps(<Input type="password" maxLength="20" placeholder="请输入密码" />)}
				    </Form.Item>
				    <Form.Item className="vcode">
                        {captchaProps(<Input type="text" maxLength="4" placeholder="请输入验证码" />)}
						<img src={this.state.imageUrl} onClick={this.onCodeClick} title="点击刷新验证码" />
                        {sequenceProps(<Input type="hidden" />)}
				    </Form.Item>
				</Form>
			</Modal>
        );
    }
});

App = Form.create()(App);

export default App;
