import BaseReq from './BaseReq';

class BaseRobotReq extends BaseReq {
    constructor(options, params, successFn, errorFn) {
        super(options);

        this._defaultOptions = {}; //默认的请求配置
        this._options = options || {}; //请求配置，包含请求地址、请求类型、请求内容类型等
        this._params = params || {}; //请求参数
        this._successFn = successFn || function() {}; //成功回调
        this._errorFn = errorFn || function() {}; //失败回调
    }

    getOptions() {
        return this._options;
    }

    setOptions(options) {
        this._options = options;
    }

    getParams() {
        return this._params;
    }

    /**
     * 设置请求参数
     * @param username 用户名
     * @param password 密码
     * @param vcode 验证码
     * @return
     */
    setParams(params) {
        this._params = params;
    }

    /**
     * 追加请求参数
     * @param key 参数名 
     * @param value 参数值
     * @return
     */
    addParams(key, value) {
        this._params[key] = value;
    }

    getSuccessFn() {
        this._successFn;
    }

    setSuccessFn(fn) {
        this._successFn = fn;
    }

    getErrorFn() {
        return this._errorFn;
    }

    setErrorFn(fn) {
        this._errorFn = fn;
    }

    /**
     * 发送请求，追加上请求参数
     * @return {[type]} [description]
     */
    send() {
    	this.processOptions();
        super.send(this._options, this._successFn, this._errorFn);
    }

    /**
     * 发起请求前，处理配置信息
     * @return {[type]} [description]
     */
    processOptions() {
        this._options = this.assign(this._defaultOptions || {}, this._options);

        this._options.data = this._params;
        this._options.url = this.formatUrl(this._options.url);

        return this._options;
    }

    /**
     * 格式化接口地址，替换一些rest命名的参数，追加接口host
     * @param url 路由
     * @param id  编号
     */
    formatUrl(url, id) {
        if (!url) {
            return url;
        }
        if (this.name) {
            url = url.replace(':name', this.name);
        }
        if (id) {
            url = url.replace(':id', id);
        }
        return (this._isPhpHost ? this._phpHost : this._host) + url;
    }

}

export default BaseRobotReq;
