require("../scss/components/search.scss");

import React from 'react';
import {Modal, Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
import MeiFormMixin from '../mixins/MeiFormMixin';

var App = React.createClass({
	mixins: [MeiFormMixin],
  handleSubmit(e){
  	e.preventDefault();
  	this.props.onSearch(this.props.form.getFieldsValue());
  },
  render() {
  	
    return (
    	<div className="mei-search">
	      <Form inline onSubmit={this.handleSubmit}>
	      </Form>
      	</div>
    );
  }
});

App = Form.create()(App);

export default App;