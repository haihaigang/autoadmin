import { CurdReq } from '../../../base/';

class AccountReq extends CurdReq {
    /**
     * 获取验证码
     */
    createCaptcha(callback, callbackError) {
        if(this._isLoading) return;

        super.ajaxSend({
            url: this._host + '/captcha/create',
        }, function(response) {
            callback && callback(response);
        }, callbackError);
    }

    /**
     * 登录
     */
    login(data, callback, callbackError) {
        if(this._isLoading) return;
        
        super.ajaxSend({
            url: this._host + '/security/login',
            data: data,
            type: 'POST',
            showLoading: true,
            loadingText: '登录中……',
        }, function(response) {
            callback && callback(response);
        }, callbackError);
    }

    logout() {
        AccountLoginReq.send();
    }
}

export default new AccountReq();
