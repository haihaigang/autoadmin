import '../scss/components/column.scss';

import React from 'react'
import {
    Modal, Form, Input, Button, Checkbox, Radio, Tooltip, Icon
}
from 'antd' 
import MeiDraggableMixin from '../mixins/MeiDraggableMixin'

var App = React.createClass({
    mixins: [MeiDraggableMixin],
    getInitialState() {
        return {
            data: this.props.data
        };
    },
    handleSubmit() {
        this.props.onSave(this.state.data);
    },
    onCancel() {
        this.props.onCancel();
    },
    onChange(e) {
        let data = this.state.data;
        data.map(function(item, i){
            if(item.key == e.target.value){
                item.checked = !item.checked;
            }
        });
        this.setState({data});
    },
    processData(data) {
        let result = data && data.filter(item => item.key != 'operation');
        return result || [];
    },
    dragClassName: 'mei-column-item',
    afterDrop(data){
        this.setState({data});
    },
    getDragData(){
        return this.state.data;
    },
    render() {
        const data = this.processData(this.state.data);
        
        return (
            <Modal
                title="管理排序"
                wrapClassName="vertical-center-modal"
                className="mei-column"
                visible={this.props.visible}
                onOk={this.handleSubmit}
                onCancel={this.onCancel}>
                <Form layout="horizontal" onDrop={this.drop} onDragOver={this.allowDrop}>
                {data.map(function (item, i) {
                    return (
                        <div id={"c"+i} 
                            className="mei-column-item" 
                            key={i} 
                            draggable={true} 
                            onDragStart={this.drag} 
                            onDragEnter={this.dragenter} 
                            onDragLeave={this.dragleave}>
                            <Checkbox checked={item.checked} onChange={this.onChange} value={item.key}>{item.title}</Checkbox>
                            <div className="mei-column-icon">
                                <Icon type="bars"/>
                            </div>
                        </div>
                        );
                }, this)}
                </Form>
            </Modal>
        );
    }
});

App = Form.create()(App);

export default App;
