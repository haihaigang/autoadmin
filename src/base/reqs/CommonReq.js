import BaseReq from './BaseReq'

/**
 * 通用接口
 */
class CommonReq extends BaseReq {

    constructor(name) {
        super();
    }


    /**
     * 退出登录
     */
    quickSend(url, callback, callbackError) {
        super.ajaxSend({
            url: this._host + url,
            type: 'GET',
        }, callback, callbackError);
    }


    /**
     * 退出登录
     */
    logout(callback, callbackError) {
        super.ajaxSend({
            url: this._host + '/security/logout',
            type: 'GET',
        }, callback, callbackError);
    }

    /**
     * 修改密码
     * data: {"userId":2,"oldpwd":"sysadmin","newpwd":"admin"}
     */
    changePassword(data, callback, callbackError) {
        super.ajaxSend({
            url: this._host + '/rudderuser/updatepwd',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'text/plain'
        }, callback, callbackError);
    }

    /**
     * 登录
     */
    login(data, callback, callbackError) {
        if (this.isLoading) return;

        super.ajaxSend({
            url: this._host + '/security/login',
            data: data,
            type: 'POST',
            showLoading: true,
            loadingText: '登录中……',
        }, callback, callbackError);
    }
}

export default new CommonReq();
