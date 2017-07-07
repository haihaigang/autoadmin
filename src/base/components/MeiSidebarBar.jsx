require("../scss/components/sidebar.scss");

import React from 'react';
import { Icon } from 'antd';
import BaseComponent from './BaseComponent'

/**
 * 侧边栏的工具按钮组件
 */
class MeiSidebarBar extends BaseComponent{
    constructor(props){
        super(props);
    }

    handleBarClick() {
        let status = this.props.status;
        status = status == 1 ? 0 : 1;
        this.props.onClick(status);
    }

    render() {
        return (
            <div
                className="mei-sidebar-bar"
                onClick={this.handleBarClick.bind(this)}
                >
                <Icon type="menu-fold" style={{display: this.props.status == 0 ? 'none': ''}} />
                <Icon type="menu-unfold" style={{display: this.props.status == 0 ? '': 'none'}} />
            </div>
        );
    }
};

export default MeiSidebarBar;
