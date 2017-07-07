require('../scss/components/pagination.scss');

import React from 'react';
import { Pagination } from 'antd';
import BaseComponent from './BaseComponent'

/**
 * 分页组件
 */
class MeiPagination extends BaseComponent {
    constructor(props) {
        super(props);
    }

    showTotal(total) {
        return '共 ' + total + ' 条';
    }

    render() {
        const { total, ...other } = this.props;

        return (
            <div
                className="mei-footer"
                style={{display: (total && total > 0) ? 'block' : 'none'}}>
                <Pagination 
                    {...other}
                    showQuickJumper 
                    total={total}
                    showTotal={this.showTotal} />
            </div>
        );
    }
};

export default MeiPagination;