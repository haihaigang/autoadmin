import React from 'react';
import { Icon } from 'antd';
import BaseComponent from './BaseComponent';

class MeiAdd extends BaseComponent {
  constructor(props) {
	super(props);

  }

  render() {
	return (
		<Icon type="plus-circle" className="mei-add" onClick={this.props.onClick} />
	);
  }
};

export default MeiAdd;