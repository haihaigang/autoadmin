import React from 'react'
import { Message } from 'antd'
import BaseConfig from '../../config/BaseConfig'
import Storage from '../utils/Storage'
import Ajax from '../utils/Ajax'

class BaseReq {
    constructor() {
        this._host = BaseConfig.HOST; //接口地址
        this._phpHost = BaseConfig.PHP_HOST; //php接口地址
        this._pageSize = BaseConfig.PAGESIZE; //分页大小
        this._path = BaseConfig.PATH; //路由前缀路径
        this._timeout = 15000; //请求超时时间
        this._cache = true; //是否缓存
        this._isLoading = false; //是否正在请求
        this._queue = {}; //请求队列
        this._onEnd = function() {}; //当请求都完成
        this._timeTick = 0; //每次请求的时间
        this._responseKey = 'body.content'; //默认接口返回的内容结构体
        this._timestamp = undefined; //每次接口返回的当前服务器时间
    }

    assign(options, opts) {
        if ('assign' in Object) {
            return Object.assign(options, opts);
        } else {
            for(var i in opts){
                options[i] = opts[i];
            }
            return options;
        }
    }

    /**
     * 搜索
     * @param options
     * @param callback－成功回调
     * @param allbackError－失败回调
     */
    search(options, callback, callbackError) {
        if (this._isLoading) {
            console.log('search wait is loading')
            return;
        }

        this.extend(options, {
            key: 'id',
            data: {},
            logtype: 'search',
            showLoading: true,
        });

        this.extend(options.data, {
            page: 1,
            size: this._pageSize
        });

        this.ajaxSend(options, callback, function(textStatus, response) {
            if (textStatus == 'Malformed') {
                if (response.status == 204) {
                    Message.error('没有您搜索的结果');
                } else {
                    Message.error(response.message, 5);
                }
            }
            callbackError && callbackError(textStatus, response);
        });
    }

    /**
     * 保存
     * @param options
     * @param callback－成功回调
     * @param allbackError－失败回调
     */
    save(options, callback, callbackError) {
        if (this._isLoading) {
            console.log('save wait is loading')
            return;
        }

        this.extend(options, {
            type: 'POST',
            logtype: 'save',
            showLoading: true,
            loadingText: '保存中……',
            contentType: 'application/json'
        });

        this.ajaxSend(options, callback, function(textStatus, response) {
            if (textStatus == 'Malformed') {
                let msg = response.message;
                let msgArr = msg.split('<BR/>');
                let brEle = React.createElement('br');
                let elements = []
                if (msgArr.length > 1) {
                    msgArr.map((item, i) => {
                        let tip = React.createElement('span', null, item);
                        elements.push(tip);
                        if (i < msgArr.length - 1) {
                            elements.push(brEle);
                        }
                    })
                    let res = React.createElement('span', null, elements);
                    Message.error(res, 5);
                } else {
                    Message.error(response.message || '接口校验不通过', 5);
                }
            }
            callbackError && callbackError(textStatus, response);
        });
    }

    /**
     * 删除
     * @param options
     * @param callback－成功回调
     * @param allbackError－失败回调
     */
    remove(options, callback, callbackError) {
        if (this._isLoading) {
            console.log('remove wait is loading')
            return;
        }

        this.extend(options, {
            type: 'POST',
            logtype: 'remove',
            showLoading: true,
            loadingText: '删除中……',
        });

        this.ajaxSend(options, callback, function(textStatus, response) {
            if (textStatus == 'Malformed') {
                Message.error(response.message || '删除出错', 5);
            }
            callbackError && callbackError(textStatus, response);
        });
    }

    /**
     * 发送请求
     * @param options－请求参数
     * @param callback－成功回调
     * @param allbackError－失败回调
     */
    ajaxSend(options, callback, callbackError) {
        var that = this,
            headers = {},
            loadingTip,
            startTick = Date.now();
        that._isLoading = true;
        that._queue[options.url] = true;


        options = options || {};
        options.logtype = options.logtype || 'default';

        if (options.showLoading) {
            loadingTip = Message.loading(options.loadingText || '加载中……', 0);
        }

        var user = Storage.get('User');
        if (user && user.accessToken) {
            headers['X-Auth-Token'] = user.accessToken;
        }
        let blink = location.href;

        //处理成json提交数据，仅在请求头为json时
        if (options.contentType == 'application/json') {
            options.data = JSON.stringify(options.data);
        }

        Ajax({
            url: options.url,
            data: options.data,
            type: options.type || 'GET',
            dataType: 'json',
            timeout: options.timeout || that.timeout,
            cache: that.cache,
            contentType: options.contentType,
            // processData: options.processData,
            headers: headers,
            success: function(response, textStatus, jqXHR) {
                that._isLoading = false;
                delete(that._queue[options.url]);

                if (!response || (response.status != 200 && response.status != 204)) {
                    that.logged(options.logtype, response.message, options.url);
                    if (response.status == 401) {
                        if (typeof callbackError == 'function') {
                            callbackError('401', response);
                        }
                        blink = blink ? blink.split('/kiwi')[1] : '/account';
                        if (blink != '/account') {
                            Storage.set('BackLink', blink);
                        }
                        // TODO
                        // history.push(BaseConfig.PATH + '/account');
                        return;
                    }
                    if (response.status == 500 && options.showLoading) {
                        //特殊处理，接口200相应，但相应有500错误码
                        console.error('服务器异常');
                        if (typeof callbackError == 'function') {
                            callbackError('500', response);
                        }
                        return;
                    }

                    if (typeof callbackError == 'function') {
                        callbackError('Malformed', response);
                    }
                    return;
                }

                if (response.timestamp) {
                    //设置接口返回的服务器时间
                    that._timestamp = response.timestamp;
                }

                if (options.key) {
                    if (options.responseKey) {
                        that._responseKey = options.responseKey;
                    }
                    var content = that.getDataWithKey(response, that._responseKey);
                    //若请求的列表数据，需要添加key键，用于操作栏使用
                    for (var i = 0, len = content.length; i < len; i++) {
                        content[i].okey = content[i][options.key];
                    }
                }

                if (typeof callback == 'function') {
                    callback(response);
                }
                if (that.isEmpty(that._queue) && typeof that.onEnd == 'function') {
                    that.onEnd.call(this);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                that.logged(options.logtype, textStatus, options.url);
                delete(that._queue[options.url]);

                if (options.showLoading) {
                    //约定接口不正常访问，统一提示用户服务器异常
                    console.error('服务器异常。');
                    Message.error('服务器异常。');
                }
                if (typeof callbackError == 'function') {
                    // callbackError(textStatus, {});
                }

                if (that.isEmpty(that._queue) && typeof that._onEnd == 'function') {
                    that._onEnd.call(this);
                }
                that._isLoading = false;
            },
            complete: function(xhr, status) {
                that._isLoading = false;
                that._timeTick = Date.now() - startTick;
                that.logged('time', '请求耗时约' + that._timeTick + 'ms', options.url);
                if (loadingTip) {
                    loadingTip();
                }
            }
        });
    }

    /**
     * 扩展参数
     * @param  options 被扩展参数 
     * @param  opt 扩展参数
     */
    extend(options, opt) {
        options = options || {};
        for (var i in opt) {
            options[i] = typeof options[i] == 'undefined' ? opt[i] : options[i];
        }
    }

    /**
     * 记录接口的错误日志
     * @param type-接口请求类型
     * @param message-错误内容
     * @param url-错误地址
     */
    logged(type, message, url) {
        console.info('[' + type + '] ' + message + ' url=' + url);
    }

    /**
     * 判断对象是否为空
     * @param  {[type]}
     * @return {Boolean}
     */
    isEmpty(obj) {
        var flag = true;
        for (var i in obj) {
            flag = false;
            break;
        }

        return flag;
    }

    /**
     * 从数据源中获取目标描述字符串对应的值
     * @param data 数据源
     * @param keyStr 目标描述字符串，eg:a.b.c
     * @return object
     */
    getDataWithKey(data, keyStr) {
        if (keyStr.indexOf('.') == -1 && keyStr.indexOf('[') == -1) {
            return data[keyStr];
        }
        var keyArr = keyStr.split('.'),
            len = keyArr.length,
            i = 0,
            tempObj = data,
            reg = /^(.*)\[(\d+)\]$/;

        while (i < len) {
            if (reg.test(keyArr[i])) {
                var result = reg.exec(keyArr[i]);
                if (!tempObj[result[1]]) {
                    tempObj = '';
                    break;
                }
                tempObj = tempObj[result[1]][result[2]];
            } else {
                tempObj = tempObj[keyArr[i]];
            }
            i++;
        }
        return tempObj;
    }
}


export default BaseReq;