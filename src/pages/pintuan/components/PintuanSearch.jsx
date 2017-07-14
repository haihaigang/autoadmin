
import React from 'react';
import { Form } from 'antd';
import { BaseSearch } from '../../../base/';

/**
 * 搜索组件
 */
class PintuanSearch extends BaseSearch{
    constructor(props) {
        super(props);
    }

    /**
     * 提交搜索
     * @param
     * @return
     */
    handleSubmit(e) {
        super.handleSubmit(e);

        // TODO 实现自己的业务逻辑
    }

    render() {
    	return super.render();
    }
};

// 这里需要保留在子类初始化，保证form的相关属性能初始化在当前组件上
PintuanSearch = Form.create()(PintuanSearch);

export default PintuanSearch;
