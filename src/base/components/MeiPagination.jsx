require('../scss/components/pagination.scss');

import React from 'react';
import {Pagination} from 'antd';

var MeiPagination = React.createClass({
    showTotal:function(total) {
      return '共 ' + total +' 条';
    },
  render() {
    const {onChange, ...other} = this.props;
    let visible = false;
    if(other.total && other.total > 0){
        visible = true;
    }
    return (
    	<div className="mei-footer" style={{display: visible ? 'block' : 'none'}}>
    		<Pagination 
                {...other}
                showQuickJumper 
                onChange={this.props.onChange}
                total={other.total}
                showTotal={this.showTotal} />
    	</div>
    );
  }
});

export default MeiPagination;