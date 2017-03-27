
import BaseStore from '../../../base/stores/BaseStore';
import PintuanConstants from '../constants/PintuanConstants';
import PintuanDispatcher from '../dispatcher/PintuanDispatcher';
import PintuanColumns from '../columns/PintuanColumns';

/*
 * Store
 */
class MainStore extends BaseStore {
    constructor() {
        super(PintuanDispatcher, PintuanConstants);

        this.setColumns(new PintuanColumns().getColumns());

        // 添加自定义的事件
        // this.addAction(this._constant.GET_LOADING, (action) => {
        // });

        // 初始化dispatcher注册的事件，该方法需要在所有自定义事件的最后
        this.initDispatcherRegister();
    }
};

export default new MainStore();
