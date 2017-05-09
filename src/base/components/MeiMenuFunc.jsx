import '../scss/components/login-list.scss';
import React from 'react';
import { Menu } from 'antd';

var MeiLoginList = React.createClass({
    handleClick(e) {
        switch (e.key) {
            case 'clear':
                {
                    this.props.onClear();
                    break;
                }
            case 'change-account':
            case 'logout':
                {
                    this.props.onLogout();
                    break;
                }
            case 'change-password':
                {
                    this.props.onShowPassword();
                    break;
                }
        }
    },
    render() {
        return (
            <Menu
                mode="vertical"
                className="login-list"
                style={{display: this.props.visible ? '' : 'none'}}
                onClick={this.handleClick}
                >
                <Menu.Item key="clear" className="login-item">清除缓存</Menu.Item>
                <Menu.Item key="change-password" className="login-item">修改密码</Menu.Item>
                <Menu.Item key="logout" className="login-item">退出登陆</Menu.Item>
            </Menu>
        );
    }
});

export default MeiLoginList;
