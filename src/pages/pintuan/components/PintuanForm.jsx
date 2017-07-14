import React from 'react';
import { Form } from 'antd';
import { BaseForm } from '../../../base/';

/**
 * 表单组件
 */
class PintuanForm extends BaseForm {
    constructor(props) {
    	super(props);
    }

    componentDidMount() {
    	super.componentDidMount();
    	
    	// TODO 这里可以自定义当前表单的特殊逻辑
	}

    render() {
        return super.render();
    }
};

// 这里需要保留在子类初始化，保证form的相关属性能初始化在当前组件上
PintuanForm = Form.create()(PintuanForm);

export default PintuanForm;
