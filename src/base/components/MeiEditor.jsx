import React from 'react';
import wangEditor from 'wangeditor'
import BaseComponent from './BaseComponent';
import BaseConfig from '../../config/BaseConfig';
import Storage from '../utils/Storage';

/**
 * 富文本编辑器
 * 使用wangeditor插件
 * npm install wangeditor --save-dev
 * 
 */
class MeiEditor extends BaseComponent {
    constructor(props) {
        super(props);

        // 编辑器内容样式
        this.contentStyle = {
            width: '100%',
            height: '360px'
        }
        // 编辑器样式
        this.containerStyle = {
            width: '100%'
        }
    }
    componentDidMount() {
        var _this = this;
        var id = this.props.id;
        this.editor = new wangEditor(id);
        this.editor.config.uploadImgUrl = BaseConfig.HOST + '/images/upload';

        this.editor.config.uploadHeaders = {
            'X-Auth-Token': Storage.get('User') ? Storage.get('User').accessToken : ''
        };
        // 自定义load事件
        this.editor.config.uploadImgFns.onload = function(resultText, xhr) {

            // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
            var originalName = _this.editor.uploadImgOriginalName || '';
            var result;

            try {
                result = JSON.parse(resultText);
            } catch (e) {
                console.error('图片上传返回结果错误，解析json失败');
                return;
            }

            _this.editor.command(null, 'insertHtml', '<img src="' + BaseConfig.HOST + '/images/get/' + result.body + '" alt="' + originalName + '" style="max-width:100%;"/>');
        };
        // // 配置 onchange 事件
        this.editor.onchange = function() {
            // 编辑区域内容变化时，实时打印出当前内容
            var content = this.$txt.html();
            if (_this.props.onChangeContent) {
                _this.props.onChangeContent(content);
            };
        };
        this.editor.create();
        // 初始化内容
        this.editor.$txt.html(this.props.content);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.content && this.props.id != nextProps.id) {
            this.editor.$txt.html(nextProps.content);
        }
    }

    render() {
        return (
            <div style={this.containerStyle}>
                <div id={this.props.id} style={this.contentStyle} contentEditable="true"></div>
            </div>
        );
    }

}
export default MeiEditor;
