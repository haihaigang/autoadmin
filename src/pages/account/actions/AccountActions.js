import {
    Message
}
from 'antd'
import {
    browserHistory
}
from 'react-router'
import AccountDispatcher from '../dispatcher/AccountDispatcher'
import AccountConstants from '../constants/AccountConstants'
import AccountReq from '../reqs/AccountReq'
import Storage from '../../../base/utils/Storage'
import Cookie from '../../../base/utils/Cookie'
import Tools from '../../../base/utils/Tools'
import BaseConfig from '../../../config/BaseConfig'
import BaseActions from '../../../base/actions/BaseActions'

class AccountActions extends BaseActions {
    constructor() {
        super(AccountReq, AccountDispatcher, AccountConstants);
    }

    /**
     * 获取验证码
     */
    createCaptcha(data) {
        AccountReq.createCaptcha(function(response) {
            AccountDispatcher.dispatch({
                actionType: AccountConstants.CREATE_CAPTCHA,
                data: response.body
            });
        });
    }

    /**
     * 登录
     */
    login(data) {
        AccountReq.login(data, function(response) {
            Storage.set('User', response.body);
            Cookie.set('User', response.body);//同步存储到cookie，以便多系统使用
            Storage.remove('MainMenus');
            Storage.remove('MainMenus1');

            let backLink = Storage.get('BackLink');
            let from = Tools._GET().from;
            if (backLink) {
                browserHistory.push(BaseConfig.PATH + backLink);
                Storage.remove('BackLink');
            } else if (from) {
                location.href = decodeURIComponent(from);
            } else {
                browserHistory.push(BaseConfig.PATH + '/');
            }

        }, function(textStatus, data) {
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
