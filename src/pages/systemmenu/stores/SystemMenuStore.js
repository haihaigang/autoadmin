import BaseStore from '../../../base/stores/BaseStore';
import SystemMenuDispatcher from '../dispatcher/SystemMenuDispatcher';
import SystemMenuConstants from '../constants/SystemMenuConstants';
import SystemMenuColumns from '../columns/SystemMenuColumns';
import SystemMenuConditions from '../conditions/SystemMenuConditions';
import SystemMenuFormFields from '../forms/SystemMenuFormFields';

/*
 * Store
 */
class MainStore extends BaseStore {
    constructor() {
        super(SystemMenuDispatcher, SystemMenuConstants);

        this.setColumns(new SystemMenuColumns().getColumns());

        this.setConditions(new SystemMenuConditions().getConditions());

        this.setFields(new SystemMenuFormFields().getFields());

        this.setTitle('系统菜单');

        // 添加自定义的事件
        // this.addAction(this._constant.GET_LOADING, (action) => {
        // });

        // 初始化dispatcher注册的事件，该方法需要在所有自定义事件的最后
        this.initDispatcherRegister();
    }
};

export default new MainStore();
