
import { BaseActions } from '../../../base/';
import PintuanDispatcher from '../dispatcher/PintuanDispatcher';
import PintuanConstants from '../constants/PintuanConstants';
import PintuanReq from '../reqs/PintuanReq';

/**
 * flux-action
 */
class PintuanActions extends BaseActions {
    constructor() {
        super(PintuanReq, PintuanDispatcher, PintuanConstants);
    }

    //TODO do yourself

}

export default new PintuanActions();
