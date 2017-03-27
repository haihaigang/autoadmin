import React from 'react';
import BaseConfig from '../utils/BaseConfig';
import Storage from '../utils/Storage';
//import "../libs/wangEditor/dist/js/lib/jquery.js";
import "../libs/wangEditor/dist/js/wangEditor.js";
import "../libs/wangEditor/dist/css/wangEditor.css";

var MeiEditor = React.createClass({
    // 编辑器样式
    style: {
        width: '100%',
        height: '360px'
    },
    componentDidMount: function () {
        console.log('editor didmount');
        var _this = this;
        var id = this.props.id;
        this.editor = new window.wangEditor(id);
        this.editor.config.uploadImgUrl = BaseConfig.HOST + '/images/upload';

        this.editor.config.uploadHeaders = {
            'X-Auth-Token': Storage.get('User').accessToken
        };
        // // 配置 onchange 事件
        this.editor.onchange = function () {
            // 编辑区域内容变化时，实时打印出当前内容
            console.log(this.$txt.html());
            console.log(this);
            var content = this.$txt.html();
            if(_this.props.onChangeContent){
                _this.props.onChangeContent(content);
            };
        };
        this.editor.create();
        // 初始化内容
        this.editor.$txt.html(this.props.content);
    },
    componentWillReceiveProps(nextProps) {
        if(nextProps.content && this.props.id != nextProps.id){
           this.editor.$txt.html(nextProps.content);
        }
    },
    render: function() {
        return (
            <div>
                <div id={this.props.id} style={this.style} contentEditable="true"></div>
            </div>
        );
    }

})
export default MeiEditor;