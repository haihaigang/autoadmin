
import { BaseActions } from '../../../base/';
import [MODULE]Dispatcher from '../dispatcher/[MODULE]Dispatcher';
import [MODULE]Constants from '../constants/[MODULE]Constants';
import [MODULE]Req from '../reqs/[MODULE]Req';

/**
 * flux-action
 */
class [MODULE]Actions extends BaseActions {
    constructor() {
        super([MODULE]Req, [MODULE]Dispatcher, [MODULE]Constants);
    }

    //TODO do yourself

}

export default new [MODULE]Actions();
