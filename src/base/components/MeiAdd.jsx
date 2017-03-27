
import React from 'react';
import {Icon} from 'antd';

var MeiAdd = React.createClass({
  getInitialState() {
    return {
      current: 'goods'
    };
  },
  render() {
    return (
    	<Icon type="plus-circle" className="mei-add" onClick={this.props.onClick} />
    );
  }
});

export default MeiAdd;