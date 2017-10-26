import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Checkbox, Radio, Tooltip, Icon, DatePicker, Tree, TreeSelect } from 'antd';
import BaseFormComponent from './BaseFormComponent';
import MeiUpload from './MeiUpload';
import MeiFile from './MeiFile';
import CommonReq from '../reqs/CommonReq';

const TreeNode = Tree.TreeNode;

/**
 * 自动表单组件的基类
 * 包含根据表单域数据自动生成表单域
 */
class BaseForm extends BaseFormComponent {
    constructor(props) {
    	super(props);
    	
    	this.state = {};
    }

    /**
     * 组件加载完成
     * @return {[type]} [description]
     */
    componentDidMount() {
    	super.componentDidMount();

    	// 表单组件的话试图去获取表单的结构所需的数据
    	this.getAsyncData.call(this, this.props.fields);
	}

	/**
	 * 组件将要移除的时候
	 * @return {[type]} [description]
	 */
	componentWillUnmount() {
    	super.componentWillUnmount();
	}

	/**
	 * 提交表单数据，获取formData并通知出去
	 * @return
	 */
    handleSubmit() {
    	let formData = this.props.form.getFieldsValue();
    	let fields = this.props.fields;
    	
    	fields.map((item, i) => {
    		if(item.type == 'Object' && item.displayType == 'TreeSelect'){
    			// 当含有TreeSelect类型的字段时，添加默认的值
    			if(!formData[item.key]){
    				formData[item.key] = this.props.data[item.key];
    			}
    		}
    	})

        this.props.onSave(formData);
    }

    /**
     * 获取表单域
     * @param fields 表单结构的数据
     * @param data 表单的数据
     * @return
     */
    getFieldsItems(fields, data){
    	if(!fields || fields.length == 0){
    		return;
    	}

    	return fields.map((item, i) => {
    		let decorator = this.getFormField(item.key, {
    			initialValue: typeof data[item.key] != 'undefined' ? data[item.key] || item.defaultValue
    		});
    		let dom = <Input placeholder={item.placeholder} />

    		if(item.disabled){
    			return decorator(<Input key={i} type="hidden" />);
    		}
    		
    		// Number,String,Date,Bool,Enum,Objet,Id,Image,File,ListSelect,TreeSelect
	    	switch(item.type){
	    		case 'Id': {
	    			return decorator(<Input key={i} type="hidden" />)
	    			break;
	    		}
				case 'Number': {
					dom = <InputNumber placeholder={item.placeholder} disabled={item.readonly} />
					break;
				}
				case 'String': {
					dom = <Input placeholder={item.placeholder} disabled={item.readonly} />
					break;
				}
				case 'Date': {
					dom = <DatePicker {...this.datePickerOpt} disabled={item.readonly} />
					break;
				}
				case 'Bool': {
					dom = <Radio.Group disabled={item.readonly}>
							<Radio value={true}>是</Radio>
							<Radio value={false}>否</Radio>
						</Radio.Group>
					break;
				}
				case 'Enum': {
					// 约定枚举的值从xxEnum.value字段获取值
					let enumValue = data[item.key + 'Enum'];
					if(enumValue){
						decorator = this.getFormField(item.key, {
			    			initialValue: enumValue.value
			    		});
					}
					dom = <Select allowClear placeholder={item.placeholder} disabled={item.readonly}>
							{item.data && item.data.map((it, ii) => {
                            	return(<Select.Option key={ii} value={it.value}>{it.label}</Select.Option>);
							}, this)}
                        </Select>
					break;
				}
				case 'Image': {
					const handleImageChange = (info) => {
						let id = info.file.response.body
						this.props.onDataChange(item.key, id);
					};
					const handleRemoveAloneFile = () => {
						this.props.onDataChange(item.key, '');
					};
					dom = <MeiUpload
							isCanAloneRemove={true}
							handleImageChange={handleImageChange}
							handleRemoveAloneFile={handleRemoveAloneFile}
							dataSource={data[item.key]}
							tip="图片尺寸：750x316"
							disabled={item.readonly}>
						</MeiUpload>
					break;
				}
				case 'File': {
					const handleImageChange = (info) => {
						let id = info.file.response.body
						this.props.onDataChange(item.key, id);
					};
					const handleRemoveAloneFile = () => {
						this.props.onDataChange(item.key, '');
					};
					dom = <MeiFile
							isCanAloneRemove={true}
							handleImageChange={handleImageChange}
							handleRemoveAloneFile={handleRemoveAloneFile}
							dataSource={data[item.key]}
							disabled={item.readonly}>
						</MeiFile>
					break;
				}
				case 'Object': {
					// displayType值有四种
					// 1. SingleList 单选的下拉框
					// 2. ListSelect 多选的下拉框
					// 3. SingleTree 单选的树
					// 4. TreeSelect 多选的树
					switch(item.displayType){
						case 'SingleList': {
							let svalue = this.getSingleValue(data, item.key);
							if(svalue){
								decorator = this.getFormField(item.key, {
					    			initialValue: svalue
					    		});
							}

							dom = <Select
									allowClear
									showSearch
									filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
									placeholder={item.placeholder}
									disabled={item.readonly}>
									{item.data && item.data.map((it, ii) => {
										let labelValue = it[item.dataLableKey];
										let keyValue = it[item.dataValueKey];
		                            	return(<Select.Option key={keyValue} value={keyValue + ''}>{labelValue}</Select.Option>);
									}, this)}
		                        </Select>
							break;
						}
						case 'ListSelect': {
							decorator = this.getFormField(item.key, {
				    			initialValue: this.getMultipleValue(data, item.key)
				    		});

							dom = <Select
									multiple
									placeholder={item.placeholder}
									disabled={item.readonly}>
									{item.data && item.data.map((it, ii) => {
										let labelValue = it[item.dataLableKey];
										let keyValue = it[item.dataValueKey];
		                            	return(<Select.Option key={keyValue} value={keyValue + ''}>{labelValue}</Select.Option>);
									}, this)}
		                        </Select>
							break;
						}
						case 'SingleTree': {
							decorator = this.getFormField(item.key, {
				    			initialValue: this.getSingleValue(data, item.key)
				    		});

							// 约定SingleTree类型，结构为data.rootNode.children
					    	let ret = [];
					    	if(item.data){
						    	ret = item.data.rootNode.children;
					    	}

							dom = <TreeSelect
							        style={{ width: 300 }}
							        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							        treeData={ret}
							        placeholder="Please select"
							        treeDefaultExpandAll
							    />
							break;
						}
						case 'TreeSelect': {
							const loop = data => data.map((item, k) => {
					    		let name = item.label || item.path;
					    		if (item.children && item.children.length > 0) {
					    			return <TreeNode title={name} key={item.value}>{loop(item.children)}</TreeNode>;
					    		}
					    		return <TreeNode title={name} key={item.value} isLeaf={true} />;
					    	});
					    	
					    	// 约定TreeSelect类型，结构为data.rootNode.children
					    	let ret = [];
					    	if(item.data){
						    	ret = item.data.rootNode.children;
					    	}
					    	const menuTreeNodes = ret.map((item, k) => {
					    		return <TreeNode title={item.label} key={item.value}>{loop(item.children)}</TreeNode>;
					    	});

					    	const menuCheckedKeys = [];
					    	let dataArr;
					    	if(data[item.key]){
					    		// 若当前表单已经更新数据则使用表单的数据
					    		dataArr = data[item.key];
					    	}else{
					    		// 从初始值获取
						    	dataArr = this.getMultipleValue(data, item.key);
					    	}

					    	if(dataArr){
						    	dataArr.map((item, i) => {
						    		menuCheckedKeys.push(item.toString());
						    	});
					    	}

					    	let handleCheck = (checkedKeys) => {
					    		var obj = {};
					    		obj[item.key] = checkedKeys;

								this.props.onDataChange(item.key, checkedKeys);
								this.props.form.setFieldsValue(obj);
							};

							dom = <Tree
									checkable={true}
									checkedKeys={menuCheckedKeys}
									onCheck={handleCheck}>{menuTreeNodes}
								</Tree>
							break;
						}
					}

					break;
				}
			}

			return(
				<Form.Item
					key={i}
					label={item.label}
					{...this.formItemLayout}>
					{decorator(dom)} 
				</Form.Item>
			);
		});
    }

	/**
	 * 组件的渲染方法
	 * @return
	 */
    render() {
        let { fields, data, title, visible } = this.props;

		return (
			<Modal
				title={this.getTitle(title, data)}
			  	visible={visible}
			  	onOk={this.handleSubmit.bind(this)}
			  	onCancel={this.handleCancel.bind(this)}>
			  	<Form layout='horizontal'>
			  	{this.getFieldsItems(fields, data)}
			  	</Form>
		  	</Modal>
		);
    }
};

export default BaseForm;
