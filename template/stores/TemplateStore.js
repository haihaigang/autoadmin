import BaseStore from '../../../base/stores/BaseStore';
import [MODULE]Dispatcher from '../dispatcher/[MODULE]Dispatcher';
import [MODULE]Constants from '../constants/[MODULE]Constants';
import [MODULE]Columns from '../columns/[MODULE]Columns';

/*
 * Store
 */
class MainStore extends BaseStore {
    constructor() {
        super([MODULE]Dispatcher, [MODULE]Constants);

        this.setColumns(new [MODULE]Columns().getColumns());

        // 添加自定义的事件
        // this.addAction(this._constant.GET_LOADING, (action) => {
        // });

        // 初始化dispatcher注册的事件，该方法需要在所有自定义事件的最后
        this.initDispatcherRegister();
    }
};

export default new MainStore();
