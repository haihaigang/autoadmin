import BaseActions from '../../../base/actions/BaseActions';
import PintuanReq from '../reqs/PintuanReq';
import PintuanDispatcher from '../dispatcher/PintuanDispatcher';
import PintuanConstants from '../constants/PintuanConstants';

class ActivityActions extends BaseActions {
    constructor() {
        super(PintuanReq, PintuanDispatcher, PintuanConstants);
    }

    //TODO 自定义一些代码

}

export default new ActivityActions();
