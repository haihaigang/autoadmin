/*
 * Store
 */

import AccountConstants from '../constants/AccountConstants';
import AccountDispatcher from '../dispatcher/AccountDispatcher';
import BaseStore from '../../../base/stores/BaseStore';

class MainStore extends BaseStore {
    constructor() {
        super(AccountDispatcher, AccountConstants);

        this._imageUrl = '';
        this._sequence = '';

        // 添加自定义的事件
        this.addAction(this._constant.CREATE_CAPTCHA, (action) => {
            this.setImageUrl(action.data.imageUrl);
            this.setSequence(action.data.sequence || action.data.seqence);
        });

        // 初始化dispatcher注册的事件，该方法需要在所有自定义事件的最后
        this.initDispatcherRegister();
    }
    getImageUrl() {
        return this._imageUrl;
    }
    setImageUrl(url) {
        this._imageUrl = url;
    }
    getSequence() {
        return this._sequence;
    }
    setSequence(val) {
        this._sequence = val;
    }

};

export default new MainStore();
