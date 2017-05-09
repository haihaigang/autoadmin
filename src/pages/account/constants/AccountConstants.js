import keyMirror from 'keymirror';
import assign from 'object-assign';
import BaseConstants from '../../../base/constants/BaseConstants';

export default assign({}, BaseConstants, keyMirror({
    SIGNIN: null,
    CREATE_CAPTCHA: null,
    NOTICE_LOGIN_SUCCESS: null,
    NOTICE_LOGIN_FAILED: null,
}));
