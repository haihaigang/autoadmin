require("../scss/components/search.scss");

import React from 'react';
import { Modal, Form, Input, Button, Checkbox, Radio, Tooltip, Icon, Row, Col } from 'antd';
import MeiFormMixin from '../mixins/MeiFormMixin';

var App = React.createClass({
    mixins: [MeiFormMixin],
    handleSubmit(e) {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();

        this.props.onSearch(data);
    },
    render() {
        var data = this.props.conditions;
        const datePickerProps = {
            format: "YYYY-MM-DD",
            placeholder: "请选择时间",
        }

        const res = data.map((item, i) => {
            return(
                <Col span="3" className="mei-search-item" key={i}>
                    <label>{item.label}</label>
                    {this.getField(item.key)(<Input type="text" placeholder={item.placeholder} />)}
                </Col>
            )
        })
        return (
            <Form onSubmit={this.handleSubmit} className="mei-search">
              <Row>
                  {res}
                  <Col span="6" className="mei-search-item">
                    <label>&nbsp;</label>
                    <Button type="primary" htmlType="submit"><Icon type="search"/>搜索</Button>
                    <Button type="ghost" onClick={this.props.onAdvanceClick}><Icon type="search"/>高级搜索</Button>
                  </Col>
              </Row>
            </Form>
        );
    }
});

App = Form.create()(App);

export default App;
