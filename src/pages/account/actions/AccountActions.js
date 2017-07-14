import {
    Message
}
from 'antd';
import { Storage, Cookie, Tools, BaseActions } from '../../../base/';
import AccountDispatcher from '../dispatcher/AccountDispatcher'
import AccountConstants from '../constants/AccountConstants'
import AccountReq from '../reqs/AccountReq'

class AccountActions extends BaseActions {
    constructor() {
        super(AccountReq, AccountDispatcher, AccountConstants);
    }

    /**
     * 获取验证码
     */
    createCaptcha(data) {
        this._req.createCaptcha(function(response) {
            AccountDispatcher.dispatch({
                actionType: this._constant.CREATE_CAPTCHA,
                data: response.body
            });
        });
    }

    /**
     * 登录
     */
    login(data) {
        this._req.login(data, (response) => {
            Storage.set('User', response.body);
            Cookie.set('User', response.body);//同步存储到cookie，以便多系统使用
            Storage.remove('MainMenus');
            Storage.remove('MainMenus1');

            this.dispatch({
                actionType: this._constant.NOTICE_LOGIN_SUCCESS,
                data: response
            });
        }, (textStatus, data) => {
            let message = data.message;
            if (data.status == 2002) {
                message = '验证码错误';
            } else if (data.status == 2001) {
                message = '用户名或密码错误！';
            }
            Message.error(message, 5);
        });
    }

}

export default new AccountActions();
