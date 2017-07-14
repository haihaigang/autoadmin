import React from 'react'
import { Alert } from 'antd'
import BaseConfig from '../../config/BaseConfig'
import BaseApp from './BaseApp'

let inte;//定时器

/**
 * 404页面
 */
class MeiNotFound extends BaseApp {
    constructor(props) {
        super(props);

        this.state = {
            linkText: ''
        }
    }

    componentDidMount() {
        let count = 3,
            linkText = '回到首页';

        this.setState({ linkText: count + '秒后' + linkText });

        inte = setInterval(function() {
            count--;
            if (count == 0) {
                clearInterval(inte);
                this.handleClick();
                return;
            }
            this.setState({ linkText: count + '秒后' + linkText });
        }.bind(this), 1000)
    }

    componentWillUnmount() {
        if(inte){
            clearInterval(inte);
        }
    }

    handleClick() {
        if (inte) {
            clearInterval(inte);
        }

        location.href = BaseConfig.PATH;
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div className="mei-notfound">
                <Alert
                    message="404"
                    description="您访问的页面不存在"
                    type="warning"
                    showIcon />
                <a href="javascript:;" onClick={this.handleClick}>{this.state.linkText}</a>
            </div>
        );
    }
}

export default MeiNotFound
