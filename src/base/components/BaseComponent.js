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
}

export default BaseComponent;
