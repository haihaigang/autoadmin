import React from 'react';
import { BaseDetail } from '../../../base/';

/**
 * 详情组件
 */
class PintuanDetail extends BaseDetail {
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

export default PintuanDetail;
