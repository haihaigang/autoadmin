import keyMirror from 'keymirror';
import assign from 'object-assign';
import BaseConstants from '../../../base/constants/BaseConstants';

export default assign({}, BaseConstants, keyMirror({
    TOGGLE_TOPIC_DIALOG: null,
    SHOW_NEXT: null,
    TOGGLE_YQM_DIALOG: null,
    TOGGLE_ZTT_DIALOG: null,
    TOGGLE_ZTTGOODS_DIALOG: null,
    TOGGLE_ADSEARCH_DIALOG: null,
}));
