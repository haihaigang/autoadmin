require("../scss/components/buttons.scss");

import React from 'react';
import { Button, Icon } from 'antd';
import BaseComponent from './BaseComponent'

class App extends BaseComponent{
	constructor(props){
		super(props);

	}
	
	render() {
		return (
			<div className="mei-buttons">
				<Button type="primary" onClick={this.props.buttonClick.bind(this,'export')}>导出</Button>
				<Button type="primary" onClick={this.props.buttonClick.bind(this,'batch-complete')}>批量退款</Button>
		  	</div>
		);
	}
};

export default App;