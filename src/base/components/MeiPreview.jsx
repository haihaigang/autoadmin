require('../scss/components/preview.scss')

import React from 'react'
import {
    Modal
}
from 'antd'

var App = React.createClass({
    handleCancel(){
        this.props.onCancel('', false);
    },
    render() {
        return (
        	<Modal
				title="预览"
				wrapClassName="mei-show-detail-modal mei-preview"
				visible={this.props.visible}
                okText="关闭"
				onOk={this.handleCancel}
				onCancel={this.handleCancel}>
				<img src={this.props.img} alt="" />
			</Modal>
        );
    }
});

export default App;
