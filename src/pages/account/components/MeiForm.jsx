import React from 'react';
import { Form, Input, Button } from 'antd';
import { BaseComponent } from '../../../base/';

/**
 * 登录表单
 */
class App extends BaseComponent{
	constructor(props){
		super(props);

	}

	onSubmit(e){
		e.preventDefault();

		this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				return;
			}

			const data = this.props.form.getFieldsValue();
			this.props.onSubmit(data);
		});
	}

	render(){
		const loginNameProps = this.getFormField('loginName', {
			rules: [
				{
					required: true, 
					message: '请输入用户名' 
				},
	        ],
	    });

	    const passwordProps = this.getFormField('password', {
			rules: [
				{
					required: true, 
					message: '请输入密码'
				},
	        ],
	    });
	    
		const sequenceProps = this.getFormField('sequence', {
			initialValue: this.props.options.sequence,
		});

		return(
			<div className="mei-login">
				<div className="mei-login-logo">后台管理系统</div>
				<Form layout="horizontal">
			        <Form.Item>
			        	{loginNameProps(<Input type="text" maxLength="50" placeholder="请输入用户名" />)}
			        </Form.Item>
			        <Form.Item>
			        	{passwordProps(<Input type="password" maxLength="20" placeholder="请输入密码" />)}
			        </Form.Item>
			        <div className="mei-login-button">
			        	{sequenceProps(<Input type="hidden" />)}
			        	<Button type="primary" htmlType="submit" onClick={this.onSubmit.bind(this)}>登录</Button>
			        </div>
	          	</Form>
          	</div>
		);
	}
};

App = Form.create()(App);

export default App;