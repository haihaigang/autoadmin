
import BaseActions from '../../../base/actions/BaseActions'
import SystemMenuDispatcher from '../dispatcher/SystemMenuDispatcher'
import SystemMenuConstants from '../constants/SystemMenuConstants'
import SystemMenuReq from '../reqs/SystemMenuReq'

/**
 * flux-action
 */
class SystemMenuActions extends BaseActions {
    constructor() {
        super(SystemMenuReq, SystemMenuDispatcher, SystemMenuConstants);
    }

    //TODO do yourself

}

export default new SystemMenuActions();
