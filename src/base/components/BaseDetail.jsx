import React from 'react';
import BaseDialogComponent from './BaseDialogComponent';
import { Modal, Form, Input, InputNumber, Select, Button, Checkbox, Radio, Tooltip, Icon, DatePicker, Tree, TreeSelect } from 'antd';
import MeiUpload from './MeiUpload';
import CommonReq from '../reqs/CommonReq';

const TreeNode = Tree.TreeNode;

/**
 * 查看详情组件的基类
 * 约定为模态框形式的，
 */
class BaseDetail extends BaseDialogComponent {
    constructor(props) {
    	super(props);
    	
    	this.state = {};

    	// 默认的表单布局
    	this.formItemLayout = {
	        labelCol: { span: 6 },
	        wrapperCol: { span: 14 }
	    };

	    // 日期的默认设置
	    this.datePickerOpt = {
	        showTime: true,
	        format: "YYYY-MM-DD HH:mm:ss",
	        placeholder: "请选择时间",
	    };
    }

    /**
     * 组件加载完成
     * @return {[type]} [description]
     */
    componentDidMount() {
    	this.getAsyncData(this.props.fields);
		this.props.store.addResetFormListener(this.onResetForm.bind(this));
	}

	/**
	 * 组件将要移除的时候
	 * @return {[type]} [description]
	 */
	componentWillUnmount() {
		this.props.store.removeResetFormListener(this.onResetForm.bind(this));   
	}

	/**
	 * 重置表单
	 * @return {[type]} [description]
	 */
	onResetForm(){
		this.props.form.resetFields();
	}

	/**
	 * 获取antd form decorator
	 * @param key 表单的key
	 * @param option 扩展的属性
	 * @return
	 */
    getFormField(key, option) {
        if (this.props && this.props.form) {
            const { getFieldDecorator } = this.props.form;
            option = option ? option : {};
            return getFieldDecorator(key, option);
        }
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
     * 关闭模态框，重置表单
     * @return
     */
    onCancel() {
	 	this.props.form.resetFields();

        super.handleCancel();
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
    			initialValue: data[item.key]
    		});
    		let dom = <Input placeholder={item.placeholder} />

    		if(item.disabled){
    			return decorator(<Input key={i} type="hidden" />);
    		}
    		
    		// Number,String,Date,Bool,Enum,Objet,Id,Image,ListSelect,TreeSelect
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
					let handleImageChange = (info) => {
						let id = info.file.response.body
						this.props.onDataChange(item.key, id);
					};
					dom = <MeiUpload
							handleImageChange={handleImageChange}
							handleRemoveAloneFile={this.handleRemoveAloneFile}
							dataSource={data[item.key]}
							tip="图片尺寸：750x316"
							disabled={item.readonly}>
						</MeiUpload>
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
							decorator = this.getFormField(item.key, {
				    			initialValue: this.getSingleValue(data, item.key)
				    		});

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
     * 获取单选下拉框的值
     * 约定获取数据的key=key+'Object'
     * 从key对应的value获取值
     * @param data 表单数据
     * @param key 表单域的key
     * @return 单个value
     */
    getSingleValue(data, key){
    	key = key + 'Object';

		let result = '';

		if(!data || !data[key]){
			return result;
		}
		return data[key].value;
	}

    /**
     * 获取多选下拉框的值（或多选的树）
     * 约定获取数据的key=key去掉最后一个字符+'Items'
     * 如果数据含有rootNode则需要遍历获取数据
     * @param data 表单数据
     * @param key 表单域的key
     * @return 数组形式的值
     */
    getMultipleValue(data, key){
    	key = key.substring(0, key.length - 1) + 'Items';

		let result = [];

		if(!data || !data[key]){
			return result;
		}
		let obj = data[key];
		if('rootNode' in obj){
			// 约定treeselect类型都从rootNode获取数据
			return this.getAdvTreeValue(obj.rootNode, result);
		}

		obj.map((item, i) => {
			let flag = false;
			result.map((it, j) => {
				if(item.value == it){
					flag = true;
				}
			})
			if(!flag){
				result.push(item.value + '');
			}
		});
		return result;
	}

	/**
	 * 获取复杂的多级数结构的数据
	 * @param data 数据
	 * @param result 返回的值
	 * @return
	 */
	getAdvTreeValue(data, result){
		data.children.map((item) => {
			if(item.children && item.children.length > 0){
				this.getAdvTreeValue(item, result)
			}
			result.push(item.value);
		});
		return result;
	}

	/**
	 * 获取表单域所需要的数据
	 * @param fields 表单域的数据
	 * @return
	 */
	getAsyncData(fields){
		if(!fields || fields.length == 0){
			return;
		}

		fields.map((item, i) => {
			if((item.type == 'Object' || item.type == 'TreeSelect') && item.url){
				// 需要获取动态数据的字段
				CommonReq.quickSend(item.url, (response) => {
					item.data = response.body;
					this.props.onFieldsChange(item.key, item);
				})
			}
		});
	}

	/**
	 * 获取模态框的标题
	 * @param title 标题
	 * @param data  表单的数据
	 * @return
	 */
	getTitle(title, data){
		return data && data.id ? ('编辑' + title + '-' + data.id) : ('新增' + title);
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
				wrapClassName="vertical-center-modal"
			  	visible={visible}
			  	onOk={this.handleSubmit.bind(this)}
			  	onCancel={this.onCancel.bind(this)}>
			  	<Form layout='horizontal'>
			  	{this.getFieldsItems(fields, data)}
			  	</Form>
		  	</Modal>
		);
    }
};

export default BaseDetail;
