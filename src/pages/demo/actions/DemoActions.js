
import BaseActions from '../../../base/actions/BaseActions'
import DemoDispatcher from '../dispatcher/DemoDispatcher'
import DemoConstants from '../constants/DemoConstants'
import DemoReq from '../reqs/DemoReq'

/**
 * flux-action
 */
class DemoActions extends BaseActions {
    constructor() {
        super(DemoReq, DemoDispatcher, DemoConstants);
    }

    //TODO do yourself

}

export default new DemoActions();
