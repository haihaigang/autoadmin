import '../scss/components/column.scss';

import React from 'react'
import {
    Modal, Form, Input, Button, Checkbox, Radio, Tooltip, Icon
}
from 'antd' 
import MeiDraggableMixin from '../mixins/MeiDraggableMixin'
import BaseComponent from './BaseComponent'

/**
 * 编辑表头组件
 */
class MeiColumn extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        }

        this.dragClassName = 'mei-column-item';
    }
    
    handleSubmit() {
        this.props.onSave(this.state.data);
    }
    onChange(e) {
        let data = this.state.data;
        data.map(function(item, i){
            if(item.key == e.target.value){
                item.checked = !item.checked;
            }
        });
        this.setState({data});
    }
    processData(data) {
        let result = data && data.filter(item => item.key != 'operation');
        return result || [];
    }
    afterDrop(data){
        this.setState({data});
    }
    getDragData(){
        return this.state.data;
    }

    render() {
        const data = this.processData(this.state.data);
        
        return (
            <Modal
                title="管理排序"
                wrapClassName="vertical-center-modal"
                className="mei-column"
                visible={this.props.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}>
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
};

MeiColumn = Form.create()(MeiColumn);

export default MeiColumn;
