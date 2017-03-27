require('../../scss/components/editable.scss')

import React from 'react'
import { Input, Icon} from 'antd'

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
	        editable: false,
	        value: this.props.value,
	        tempValue: null,
	    }
	}
	componentWillReceiveProps(nextProps) {
		console.log('meieditable receive preops');
	    this.setState({value: nextProps.value});  
	}
	show = () => {
		this.setState({editable: true});
	}
	handleOk = () => {
		this.setState({
			editable: false
		});
		this.props.ok(this.state.value);
	}
	handleCancel = () => {
		this.setState({
			editable: false,
			value: this.props.value
		});
	}
	change(e){
		const v = e.target.value;
		this.setState({value: v});
	}
	getClasses = () => {
		return 'mei-editable-form' + (this.state.editable ? ' active': '');
	}
	getClassesFor = () => {
		return (this.state.editable ? 'hidden': 'visible');
	}
	render(){
		const value = this.state.value;
		const viewValue = value ? ((isNaN(value) ? '' : '¥') + value) : '编辑';
		const editValue = value;
		return(
			<div className="mei-editable">
				<div className={this.getClassesFor()} onClick={this.show.bind(this)}>{viewValue}</div>
				<div className={this.getClasses()}>
					<div className="mei-editable-input">
						<Input value={editValue} onChange={this.change.bind(this)}/>
					</div>
					<div className="mei-editable-opearte">
						<Icon type="check-circle" onClick={this.handleOk.bind(this)} />
						<Icon type="cross-circle" onClick={this.handleCancel.bind(this)} />
					</div>
				</div>
			</div>
		);
	}
}
