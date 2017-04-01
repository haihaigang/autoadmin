import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
import MeiFormMixin from '../mixins/MeiFormMixin';

var App = React.createClass({
    mixins: [MeiFormMixin],
    getInitialState() {
        return {};
    },
    handleSubmit() {
        this.props.onSave(this.props.form.getFieldsValue());
    },
    onCancel() {
        this.props.onCancel();
    },
    getFieldsItems(fields){
    	if(!fields || fields.length == 0){
    		return;
    	}

    	return fields.map((item, i) => {
    		let decorator = this.getField(item.key, {});
    		let f = <Input placeholder={item.placeholder} />
	    	switch(item.type){
	    		case 'id': {
	    			return decorator(<Input key={i} type="hidden" />)
	    			break;
	    		}
				case 'Number': {
					f = <InputNumber placeholder={item.placeholder} />
					break;
				}
				case 'String': {
					f = <Input placeholder={item.placeholder} />
					break;
				}
				case 'Select': {
					f = <Select allowClear placeholder={item.placeholder}>
							{item.data && item.data.map((it, ii) => {
                            	<Select.Option value={it.value}>{it.label}</Select.Option>
							})}
                        </Select>
					break;
				}
			}

			return(
				<Form.Item
					key={i}
					label={item.label}
					{...this.formItemLayout}>
					{decorator(f)} 
				</Form.Item>
			);
		});
    },
    render() {
        let { fields, data, title, visible } = this.props;
        title = data && data.id ? ('编辑' + title + data.id) : ('新增' + title);
		let res = this.getFieldsItems(fields);
		return (
			<Modal
				title={title}
				wrapClassName="vertical-center-modal"
			  	visible={visible}
			  	onOk={this.handleSubmit}
			  	onCancel={this.onCancel}>
			  	<Form layout='horizontal'>
			  	{res}
			  	</Form>
		  	</Modal>
		);
    }
});

App = Form.create()(App);

export default App;
