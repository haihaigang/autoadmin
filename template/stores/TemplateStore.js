import { BaseStore } from '../../../base/';
import [MODULE]Dispatcher from '../dispatcher/[MODULE]Dispatcher';
import [MODULE]Constants from '../constants/[MODULE]Constants';
import [MODULE]Columns from '../columns/[MODULE]Columns';
import [MODULE]Conditions from '../conditions/[MODULE]Conditions';
import [MODULE]FormFields from '../forms/[MODULE]FormFields';

/*
 * Store
 *
 * // 添加自定义的事件
 * // this.addAction(this._constant.GET_LOADING, (action) => {
 * // });
 */
class MainStore extends BaseStore {
    constructor() {
        super([MODULE]Dispatcher, [MODULE]Constants);

        this.setColumns(new [MODULE]Columns().getColumns());

        this.setConditions(new [MODULE]Conditions().getConditions());

        this.setFields(new [MODULE]FormFields().getFields());

        this.setTitle('[MODULENAME]');

        // TODO自定义
        
        // 初始化dispatcher注册的事件，该方法需要在所有自定义事件的最后
        this.initDispatcherRegister();
    }
};

export default new MainStore();
