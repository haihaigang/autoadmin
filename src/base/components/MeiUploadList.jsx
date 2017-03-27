require("../scss/components/upload-file.scss");

import React from 'react';
import { Modal, Message, Upload, Icon, Progress } from 'antd';
import BaseConfig from '../utils/BaseConfig';
import Storage from '../utils/Storage';
import MeiDraggableMixin from '../mixins/MeiDraggableMixin'

/**
 * 
# 管理后台图片上传组件说明

## 目的
1. 减少代码
2. 降低复杂

## 功能
1. 支持多图形式、单图形式上传
2. 可以预览已经上传的图片
3. 可以删除已经上传的图片
4. 支持可以禁用组件，禁用后不能新增、删除图片，只能预览

## 特性
1. 统一一个上传路径
2. 统一的上传前图片格式、大小校验
3. 统一的上传错误提示
4. 

## 属性
1. isMutiple
2. isHideOperate//deprecated
3. isCanAloneRemove
4. className
5. dataSource，多图模式：[{id: 1, url: 'xxx'},...]，单图模式：string
6. tip
7. disabled

## 方法
1. handleImageChange
2. handleRemoveAloneFile
 */
var MeiUploadList = React.createClass({
	propTypes: {
		isMultiple: React.PropTypes.bool,
        isHideOperate: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
		isCanAloneRemove: React.PropTypes.bool,
		className: React.PropTypes.string,
		tip: React.PropTypes.string,
		handleImageChange: React.PropTypes.func,
		handleRemoveAloneFile: React.PropTypes.func,
	},
    mixins: [MeiDraggableMixin],
    getInitialState() {
        return {
            priviewVisible: false,//预览框是否显示
            priviewImage: '',//预览的图片
            percent: 0,//上传进度，0-100
        };
    },
    /**
     * 打开单图模式的图片预览框
     */
    handleShowAloneFilePriviewModal(img) {
        this.setState({
            priviewVisible: true,
            priviewImage: img,
        });
    },
    /**
     * 关闭单图模式下的图片预览框
     */
    handleHiddenAloneFilePriviewModal() {
        this.setState({
            priviewVisible: false,
        });
    },
    /**
     * 处理图片上传结果
     * @param info upload的图片的结果
     */
    handleImageChange(info) {
        let file = {},
            imgObj = {}

        // info.file根据设置可能返回一个对象，一个数组（数组长度可能为1可能大于1）
        if (typeof info.file == 'object') {
            if (typeof info.file.length == 'undefined') {
                //是一个对象
                file = info.file;
            } else if (info.file.length == 1) {
                //是一个数组
                file = info.file[0];
            } else {
                //是多个数组，多选上传图片时先通知所有的file在依次通知每个文件的上传状态
                let filterFiles = info.file.filter((item, i) => item.status == 'done');
                if (filterFiles.length == 0) {
                    console.log('多图上传一次返回没有成功状态');
                    return;
                }
                if (filterFiles.length > 1) {
                    console.log('多图上传一次返回多个成功状态');
                    return;
                }
                file = filterFiles[0];
            }
        } else {
            console.log('i am return here')
            return;
        }
        let response = file.response;
        if (response && response.status != 200) {
            Message.warning(response.message || '');
            return;
        }

        // 调试用
        // console.log('info.file.status ' + file.status)
        // console.log(info.fileList)
        if (file.status == 'done') {
        	this.afterImageChange(info);
        } else if (file.status == 'removed') {
        	this.afterImageChange(info);
        } else if (file.status === 'error') {
            Message.error(file.name + ' 上传失败。');
        } else {
            this.afterImageChange(info);
        }

        if(info.event) {
            this.setState({percent: info.event.percent});
        }
    },
    /**
     * 回调，根据是否多图模式，处理不同的数据传出去
     */
    afterImageChange(info){
    	if (typeof this.props.handleImageChange != 'function') {
    		//调用组件传递的是非方法时则不掉用
            return;
        }

        //将当前组件的是否多图模式属性传出，方便调用方处理结果
        info.isMultiple = this.props.isMultiple;

    	if(!info.isMultiple){
            //单图模式直接调出
            if(info.file.status == 'done'){
                //单图只有上传完成才通知出去
                this.props.handleImageChange(info);
            }
    		return;
    	}

    	let doneFile = info.fileList.filter((item, i) => item.status == 'done');
		if(0 && doneFile.length != info.fileList.length){
            //一次上传多个图片时若还有图片未完成则不继续
            console.log('一次上传多个图片时若还有图片未完成则不继续')
			return;
		}

        //处理filelist对象，需要保留原对象结构，追加id、url属性用于传值和显示
        let curImgs = [];
        info.fileList = info.fileList.map(function(item, i){
            item.sortNum = i

            if(item.status == 'done' && item.response && item.response.status == 200){
                // 只处理上传结束且上传正确的图片
                item.id = item.response.body.id;
                item.url = item.response.body.url;
            }
            return item;
        });
        // info.fileList = curImgs;

		this.props.handleImageChange(info);
    },
    /**
     * 删除单图模式的图片
     */
    handleRemoveAloneFile() {
        if (typeof this.props.handleRemoveAloneFile != 'function') {
            return;
        }
        this.props.handleRemoveAloneFile();
    },

    /**
     * 删除多图模式的图片
     */
    handleRemoveFile(id) {
        console.log(id)
        if (typeof this.props.handleImageChange != 'function') {
            return;
        }

        let info = {
            file: {
                response: {
                    body: {
                        id: '',
                        url: ''
                    }
                }
            },
            fileList: []
        };
        let fileList = this.props.dataSource;
        fileList = fileList.filter(item => item.id != id);
        info.fileList = fileList;

        this.props.handleImageChange(info);
    },

    dragClassName: 'mei-upload-thumb',

    hasDragChild: true,

    afterDrop(data){
        // 组装一个正常上传图片后的响应数据，方便回调的地方顺利使用
        // TODO 精简这里的结构
        let info = {
            file: {
                response: {
                    body: {
                        id: '',
                        url: ''
                    }
                }
            },
            fileList: data
        };
        this.props.handleImageChange(info);
    },

    getDragData(){
        return this.props.dataSource;
    },

    /**
     * 处理多图模式的数据，转换数据为upload的fileList需要的数据格式，追加uid、status
     * @param data 
     */
    processDataSource(data){
        data = data || [];

        return data.map(function(item, i){
            item.uid = item.uid || 1 * (i + 1);
            // item.id = item.id;
            item.name = i + '.png';
            item.status = item.status || 'done';
            //item.url = item.url;
            // item.thumbUrl: item.thumbUrl || item.url;
            // item.originFileObj: item.originFileObj;

            return item;
        });
    },

    render() {
        const { isMultiple, disabled, isCanAloneRemove, className, dataSource, tip } = this.props;
        const uploadUrl = BaseConfig.HOST + '/images/upload';
        let maskAloneClassName = 'mei-upload-file-list clearfix' + (isMultiple ? '' : ' mei-alone-mask') + (className ? ' ' + className : '');
        let dataImgUrl = '';
        let dataList = [];

        if (dataSource && typeof(dataSource) == "string") {
            dataImgUrl = dataSource;
        } else if (dataSource instanceof Array) {
            dataList = this.processDataSource(dataSource);
        }

        let props = {
            name: 'file',
            action: uploadUrl,
            beforeUpload(file) {
                const isJPG = file.size <= 200000;
                if (!isJPG) {
                    Message.error('上传的图片大小不超过200K!');
                }
                return isJPG;
            },
            listType: 'picture-card',
            // showUploadList: !!isMultiple,
            showUploadList: false,
            multiple: !!isMultiple,
            onChange: this.handleImageChange,
            disabled: disabled,
            className: 'mei-upload-file',
            onPreview: (file) => {
                this.setState({
                    priviewImage: file.url,
                    priviewVisible: true,
                });
            },
            headers: {
                'X-Auth-Token': Storage.get('User') ? Storage.get('User').accessToken : ''
            }
        };


        if (dataList && dataList.length > 0) {
            props.fileList = dataList;
        } else {
            if (isMultiple) {
                props.fileList = [];
            }
        }

		let uploadComponent; //上传组件
		let uploadTipComponent;//提示组件
        let thumbComponent;//缩略图组件、包含操作按钮
		let aloneThumbComponent;//单图模式的缩略图组件
        let progressComponent;//进度条组件
        
		if(isMultiple){
			//多图模式下非禁用状态显示上传组件，禁用状态显示缩略图组件
			let filesArray = props.fileList;

                thumbComponent = filesArray && filesArray.map((item, i) => {
                        return (
                            <div key={i} 
                                className="mei-upload-thumb" 
                                draggable 
                                onDragStart={this.drag} 
                                onDragEnter={this.dragenter} 
                                onDragLeave={this.dragleave}
                                style={{display: item.url ? '': 'none'}}>
                                <img src={item.url} alt=""/>
                                <div className={'mei-upload-list-item-mask' + (disabled ? ' disabled' : '')}>
                                    <Icon type="eye-o" onClick={this.handleShowAloneFilePriviewModal.bind(this, item.url)} />
                                    <Icon type="delete" onClick={this.handleRemoveFile.bind(this, item.id)}/>
                                </div>
                            </div>
                        )
                    }, this);
			if(disabled){
			}else{
				uploadComponent = 
					<Upload {...props} >
						<Icon type="plus" />
						<div className="mei-upload-text">上传照片</div>
					</Upload>
			}
		}else{
			//单图模式下显示自定义的缩略图组件，非禁用状态且未上传显示上传组件
            let disabledClass = (!isCanAloneRemove || disabled) ? ' disabled' : '';
            if(isCanAloneRemove || disabled){
                thumbComponent = 
                    <div className="mei-upload-thumb" style={{display: dataImgUrl ? '': 'none'}}>
                        <img src={dataImgUrl} alt=""/>
                        <div className={'mei-upload-list-item-mask' + disabledClass}>
                            <Icon type="eye-o" onClick={this.handleShowAloneFilePriviewModal.bind(this, dataImgUrl)} />
                            <Icon type="delete" onClick={this.handleRemoveAloneFile}/>
                        </div>
                    </div>
            }
            if(!disabled){
                if(!isCanAloneRemove){
                    aloneThumbComponent = 
                        <div className="mei-upload-thumb can-alone-remove" style={{display: dataImgUrl ? '': 'none'}}>
                            <img src={dataImgUrl} alt=""/>
                        </div>
                    uploadComponent = 
                            <Upload {...props} >
                                <Icon type="plus" />
                                <div className="mei-upload-text">上传照片</div>
                                {aloneThumbComponent}
                            </Upload>
                }else{
                    if((!disabled && !dataImgUrl)){
                        uploadComponent = 
                            <Upload {...props} >
                                <Icon type="plus" />
                                <div className="mei-upload-text">上传照片</div>
                                {aloneThumbComponent}
                            </Upload>
                    }
                }
            }
		}
		if(tip){
			uploadTipComponent = <div className="mei-upload-tip"><Icon type="info-circle-o" />{tip}</div>
		}
        if(0 && this.state.percent > 0 && this.state.percent < 100){
            progressComponent = 
                <div 
                    className="mei-upload-progress"> 
                    <div className="text">文件上传中</div>  
                    <Progress 
                        percent={this.state.percent} 
                        strokeWidth={5}
                        showInfo={false} />
                </div>
        }
	    return (
	      	<div className={maskAloneClassName} onDrop={this.drop} onDragOver={this.allowDrop}>
		        {thumbComponent}
                {uploadComponent}
		        {uploadTipComponent}
                {progressComponent}
		        <Modal
		        	className="mask-content"
		        	visible={this.state.priviewVisible}
		        	footer={null}
		        	onCancel={this.handleHiddenAloneFilePriviewModal}>
		          	<img alt="actImg" src={this.state.priviewImage} />
		        </Modal>
		    </div>

	    );
    },
});

export default MeiUploadList;
