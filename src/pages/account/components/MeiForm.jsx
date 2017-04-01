import React from 'react';
import { Form, Input, Button } from 'antd';
import MeiFormMixin from '../../../base/mixins/MeiFormMixin';

var App = React.createClass({
	mixins: [MeiFormMixin],
	onSubmit(e){
		e.preventDefault();

		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				return;
			}

			const data = this.props.form.getFieldsValue();
			this.props.onSubmit(data);
		});
	},
	render(){
		const loginNameProps = this.getField('loginName', {
			rules: [
				{ required: true, message: '请输入用户名' },
	        ],
	    });

	    const passwordProps = this.getField('password', {
			rules: [
				{ required: true, message: '请输入密码' },
	        ],
	    });

	    const captchaProps = this.getField('captcha', {
			rules: [
				{ required: true, min: 4, max: 4, message: '请输入四位的验证码' },
	        ],
	    });
		const sequenceProps = this.getField('sequence', {
			initialValue: this.props.options.sequence,
		});

		return(
			<div className="mei-login">
				<div className="mei-login-logo"></div>
				<Form layout="horizontal">
			        <Form.Item>
			        	{loginNameProps(<Input type="text" maxLength="50" placeholder="请输入用户名" />)}
			        </Form.Item>
			        <Form.Item>
			        	{passwordProps(<Input type="password" maxLength="20" placeholder="请输入密码" />)}
			        </Form.Item>
			        <Form.Item className="vcode">
			        	{captchaProps(<Input type="text" maxLength="4" placeholder="请输入验证码" />)}
						<img src={this.props.options.imageUrl} onClick={this.props.onCodeClick} title="点击刷新验证码" />
			        </Form.Item>
			        <div className="mei-login-button">
			        	{sequenceProps(<Input type="hidden" />)}
			        	<Button type="primary" htmlType="submit" onClick={this.onSubmit}>登录</Button>
			        </div>
	          	</Form>
          	</div>
		);
	}
});

App = Form.create()(App);

export default App;