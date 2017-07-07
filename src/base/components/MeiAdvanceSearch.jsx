import React from 'react';
import {
	Modal,
	Form
} from 'antd';
import BaseComponent from './BaseComponent'

class App extends BaseComponent {
	constructor(props) {
		super(props);
	}
	handleSubmit() {
		let formData = this.props.form.getFieldsValue();
		this.props.onSearch(formData);
	}
	onCancel() {
		this.props.onCancel();
	}
	render() {
		
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
				    
				</Form>
			</Modal>
		);
	}
};

App = Form.create()(App);

export default App;