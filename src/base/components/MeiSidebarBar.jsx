require("../scss/components/sidebar.scss");

import React from 'react';
import { Icon } from 'antd';

var MeiSidebarBar = React.createClass({
    handleBarClick() {
        let status = this.props.status;
        status = status == 1 ? 0 : 1;
        this.props.onClick(status);
    },
    render() {
        return (
            <div
                className="mei-sidebar-bar"
                onClick={this.handleBarClick}
                >
                <Icon type="menu-fold" style={{display: this.props.status == 0 ? 'none': ''}} />
                <Icon type="menu-unfold" style={{display: this.props.status == 0 ? '': 'none'}} />
            </div>
        );
    }
});

export default MeiSidebarBar;
