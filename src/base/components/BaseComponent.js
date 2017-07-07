import React from 'react';
import Tools from '../utils/Tools';

/**
 * 所有组件的基类，包含一些通用属性或方法
 */
class BaseComponent extends React.Component {
    constructor(props) {
        super(props);

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
     * 提交搜索
     * @return
     */
    handleSubmit(e) {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();

        this.props.onSearch(data);
    }

    /**
     * 点击取消，关闭模态框
     * @return
     */
    handleCancel() {
        this.props.onCancel();
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
}

export default BaseComponent;
