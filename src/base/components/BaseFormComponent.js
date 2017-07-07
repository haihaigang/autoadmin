import React from 'react';
import BaseComponent from './BaseComponent';
import CommonReq from '../reqs/CommonReq';

/**
 * 表单组件的基类
 * 约定为模态框形式的表单，
 */
class BaseFormComponent extends BaseComponent {
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
    	if(this.props.store){
    		// 组件中可能没有传入store的值，这里添加容错
			this.props.store.addResetFormListener(this.onResetForm.bind(this));
    	}
	}

	/**
	 * 组件将要移除的时候
	 * @return {[type]} [description]
	 */
	componentWillUnmount() {
    	if(this.props.store){
			this.props.store.removeResetFormListener(this.onResetForm.bind(this));
		}
	}

	/**
	 * 重置表单
	 * @return {[type]} [description]
	 */
	onResetForm(){
		this.props.form.resetFields();
	}

    /**
     * 关闭模态框，重置表单
     * @return
     */
    handleCancel() {
	 	this.props.form.resetFields();

        super.handleCancel();
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
};

export default BaseFormComponent;
